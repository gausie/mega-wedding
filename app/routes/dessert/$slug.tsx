import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { Response, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import {
  Container,
  Heading,
  Stack,
  Text,
  CheckboxGroup,
  Button,
  SimpleGrid,
  Link,
  CardBody,
  RadioGroup,
  HStack,
  Radio,
  CardFooter,
} from "@chakra-ui/react";

import mapBoxStyles from "mapbox-gl/dist/mapbox-gl.css";

import { supabase } from "~/lib/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";

import Header from "~/components/Header";
import WeddingMap from "~/components/WeddingMap";
import { fullname } from "~/utils";
import type { Database } from "~/types/supabase";
import BorderCard from "~/components/BorderCard";
import RSVPContainer from "~/components/RSVPContainer";
import { faBan, faLeaf, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "~/components/Alert";

export const meta: MetaFunction = () => ({
  robots: "noindex",
  title: "Hailey and Sam's Wedding | Dessert",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mapBoxStyles },
];

const NO_CHOICE = [
  33, // Joan
  153, // Cesco
];

type Guest = Database["public"]["Tables"]["guests"]["Row"];
type Party = Database["public"]["Views"]["parties_with_names"]["Row"] & {
  guests: Guest[];
};

async function getParty(pin?: string) {
  if (pin) {
    const { data } = await supabase
      .from("parties_with_names")
      .select(`*, guests(*)`)
      .eq("pin", pin.toLowerCase())
      .limit(1)
      .order("id", { foreignTable: "guests" })
      .single();

    return data as Party;
  }

  return null;
}

export const loader = async ({ params }: LoaderArgs) => {
  const party = await getParty(params.slug);

  if (party === null) return redirect("/invite");

  await supabase
    .from("parties")
    .update({ visited_at: new Date().toISOString() })
    .eq("id", party.id);

  return json(party);
};

export const action: ActionFunction = async ({ params, request }) => {
  if (Date.now() > 1686658271) {
    throw new Response(null, {
      status: 401,
      statusText: "Deadline has passed",
    });
  }

  const body = await request.formData();

  // Take the messy form data that comes from our RSVP form and sort it into a list of yes and no
  // responses from guests. Furthermore, validate that this invite code has the permission to
  // respond for those invitees.

  const party = await getParty(params.slug);

  // This should never happen, should probably log this
  if (party === null) return redirect("/");

  const inviteesMap = new Map(party.guests.map((i) => [i.id || 0, i]));

  // This doesn't respect the beauty of FormData but nor do I. In case there are dupes
  // this will just use the last value we have
  const deduplicatedBody = Object.fromEntries(body.entries());

  const naughty = Object.keys(deduplicatedBody).some((k) => {
    const [, stringId] = k.split(".");
    const id = Number(stringId);
    return !inviteesMap.has(id);
  });

  if (naughty) {
    sendTelegramMessage(
      `${party.generated_name!} attempted to fuck with the form`
    );
    return { success: false, reason: "Don't fuck with my form" };
  }

  const [a, b] = Object.entries(deduplicatedBody).reduce(
    ([a, b], [key, value]) => {
      const [type, stringId] = key.split(".");
      const id = Number(stringId);
      if (type !== "dessert") return [a, b];
      if (value === undefined) return [a, b];
      return value === "a" ? [[...a, id], b] : [a, [...b, id]];
    },
    [[], []] as [number[], number[]]
  );

  await Promise.all([
    supabase
      .from("guests")
      .update({
        dessert: 1,
        responded_at: new Date().toISOString(),
      })
      .in("id", a),
    supabase
      .from("guests")
      .update({
        dessert: 2,
        responded_at: new Date().toISOString(),
      })
      .in("id", b),
  ]);

  const tgMessage = `**Dessert Selection**${
    a.length > 0
      ? `\nMeringue: ${a.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
      : ""
  }${
    b.length > 0
      ? `\nBrownie: ${b.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
      : ""
  }`;

  console.log(tgMessage);

  sendTelegramMessage(tgMessage);

  return { success: true };
};

type ActionData = { success: true } | { success: false; reason: string };

export default function InternationalSlug() {
  const transition = useTransition();
  const party = useLoaderData<typeof loader>();
  const actionData = useActionData() as ActionData | undefined;

  const [buttonText, buttonColourScheme] = (() => {
    if (actionData === undefined) return ["Respond", undefined];
    if (actionData.success === true)
      return ["Response received - thank you", "success"];
    return [`Response failed - ${actionData.reason}`, "error"];
  })();

  return (
    <>
      <Header />

      <Container maxW="6xl" mb={16}>
        <Stack spacing={8}>
          <Stack
            spacing={8}
            textAlign="center"
            alignItems="center"
            maxWidth={800}
            margin="0 auto"
          >
            <Heading>Dessert</Heading>

            <Alert title="We are no longer accepting dessert selections">
              If you didn't make one, yours will be randomly assigned
            </Alert>

            <Stack spacing={4}>
              <Text>
                We can't believe there are fewer than two weeks to go until we
                welcome you to Colstoun House for our wedding!
              </Text>

              <Text>
                After a family-style meal, there is a choice of dessert. Please
                use the form below to let us know your preference by a deadline
                of{" "}
                <b>
                  <time dateTime="2023-06-12">
                    12<sup>th</sup> of June 2023
                  </time>
                </b>
                .
              </Text>
            </Stack>

            <SimpleGrid
              width="100%"
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            >
              <BorderCard>
                <CardBody>
                  Rose and Pistachio Meringue with Cream and Berries
                </CardBody>
                <CardFooter>
                  <HStack justifyContent="center" width="100%">
                    <span className="fa-layers">
                      <FontAwesomeIcon icon={faBan} />
                      <FontAwesomeIcon icon={faWheatAwn} transform="shrink-6" />
                    </span>
                    <span>Gluten Free</span>
                  </HStack>
                </CardFooter>
              </BorderCard>
              <BorderCard>
                <CardBody>
                  Cardamom, Orange and Dark Chocolate Brownie with Ice Cream
                </CardBody>
                <CardFooter>
                  <HStack justifyContent="center" width="100%">
                    <FontAwesomeIcon icon={faLeaf} />
                    <span>Vegan</span>
                  </HStack>
                </CardFooter>
              </BorderCard>
            </SimpleGrid>

            <Form method="post" style={{ width: "100%" }}>
              <fieldset>
                <Stack alignItems="center" spacing={8} width="100%">
                  <CheckboxGroup>
                    <Stack width="100%" alignItems="center">
                      {party.guests.map((i) => (
                        <RSVPContainer
                          key={i.id}
                          invitee={i}
                          templateColumns="1fr 1fr"
                        >
                          {NO_CHOICE.includes(i.id) ? (
                            <>GF and Vegan Meringue</>
                          ) : (
                            <RadioGroup
                              name={`dessert.${i.id}`}
                              isDisabled
                              defaultValue={
                                i.dessert === 0
                                  ? undefined
                                  : i.dessert === 1
                                  ? "a"
                                  : "b"
                              }
                            >
                              <HStack>
                                <Radio value="a">Meringue</Radio>
                                <Radio value="b">Brownie</Radio>
                              </HStack>
                            </RadioGroup>
                          )}
                        </RSVPContainer>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                  <Button
                    colorScheme={buttonColourScheme}
                    type="submit"
                    isLoading={["loading", "submitting"].includes(
                      transition.state
                    )}
                    isDisabled
                  >
                    {buttonText}
                  </Button>
                </Stack>
              </fieldset>
            </Form>

            <Text>
              Please do not hesitate to{" "}
              <Link color="primary.300" href="mailto:hello@haileyandsam.co.uk">
                reach out to us
              </Link>{" "}
              with any queries.
            </Text>
          </Stack>
          <WeddingMap minHeight={200} />
        </Stack>
      </Container>
    </>
  );
}
