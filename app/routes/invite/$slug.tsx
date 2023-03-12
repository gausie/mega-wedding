import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
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
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@chakra-ui/react";

import mapBoxStyles from "mapbox-gl/dist/mapbox-gl.css";

import { supabase } from "~/lib/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";

import type { definitions } from "~/types/database";
import Header from "~/components/Header";
import RSVP from "~/components/RSVP";
import WeddingDate from "~/components/WeddingDate";
import WeddingMap from "~/components/WeddingMap";
import { fullname } from "~/utils";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const meta: MetaFunction = () => ({
  robots: "noindex",
  title: "Hailey and Sam's Wedding | International RSVP",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mapBoxStyles },
];

type Party = definitions["parties_with_names"];
type Guest = definitions["guests"];

async function getParty(pin?: string) {
  if (pin) {
    const { data } = await supabase
      .from<Party & { guests: Guest[] }>("parties_with_names")
      .select(`*, guests(*)`)
      .is("international", true)
      .eq("pin", pin.toLowerCase())
      .limit(1)
      .single();

    return data;
  }

  return null;
}

export const loader: LoaderFunction = async ({ params }) => {
  const party = await getParty(params.slug);

  if (party === null) return redirect("/international");

  if (party.visited_at === null) {
    sendTelegramMessage(
      `${party.generated_name!} visited the International RSVP page for the first time`
    );
  }

  await supabase
    .from("parties")
    .update({ visited_at: new Date().toISOString() })
    .eq("id", party.id);

  return json(party);
};

export const action: ActionFunction = async ({ params, request }) => {
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

  let naughty = false;

  const [yes, no] = Object.entries(deduplicatedBody).reduce(
    ([yes, no], [key, value]) => {
      const [type, stringId] = key.split(".");
      const id = Number(stringId);
      if (!inviteesMap.has(id)) {
        // This should NEVER happen. Who is messing with my form?!?!
        naughty = true;
        return [yes, no];
      }
      if (type !== "rsvp") return [yes, no];
      return value === "true" ? [[...yes, id], no] : [yes, [...no, id]];
    },
    [[], []] as [number[], number[]]
  );

  if (naughty) {
    sendTelegramMessage(
      `${party.generated_name!} attempted to fuck with the form`
    );
    return { success: false, reason: "Don't fuck with my form" };
  }

  await Promise.all([
    supabase
      .from<Guest>("guests")
      .update({
        attending: true,
        responded_at: new Date().toISOString(),
      })
      .in("id", yes),
    supabase
      .from<Guest>("guests")
      .update({
        attending: false,
        responded_at: new Date().toISOString(),
      })
      .in("id", no),
  ]);

  sendTelegramMessage(
    `New RSVP:${
      yes.length > 0
        ? `\n✔️: ${yes.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
        : ""
    }${
      no.length > 0
        ? `\n❌: ${no.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
        : ""
    }`
  );

  return { success: true };
};

type ActionData = { success: true } | { success: false; reason: string };

export default function InternationalSlug() {
  const transition = useTransition();
  const party = useLoaderData() as Party & { guests: Guest[] };
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
            <Heading>Our Wedding</Heading>

            <Text as="div">
              It would be a sincere pleasure for you to join us on the occasion
              of our wedding. On <WeddingDate dayOfWeek />, we will be married
              in Colstoun House, Haddington &ndash; 17 miles east of our home in
              central Edinburgh.
            </Text>

            <Heading as="h3" size="lg">
              Details
            </Heading>

            <SimpleGrid
              width="100%"
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              <Card>
                <CardHeader>
                  <Heading as="h3" size="md">
                    Location
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={2}>
                    <Image src="/colstoun.webp" alt="The main house" />
                    <Text>
                      Colston House is a country home around 30 minutes' travel
                      from the centre of Edinburgh.
                    </Text>
                    <Link
                      color="primary.700"
                      href="https://goo.gl/maps/ZhfL8jpvd8HAqaGB7"
                    >
                      <FontAwesomeIcon icon={faMapPin} /> Colstoun House,
                      Haddington, EH41 4PA
                    </Link>
                  </Stack>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading as="h3" size="md">
                    Dress Code
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>The vibes are good</Text>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading as="h3" size="md">
                    Carpooling
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={2}>
                    <Text>
                      The venue is only a 30 minute journey from the centre of
                      Edinburgh. If you have space in a car, are looking for
                      space, or want to share a cab; we've set up a WhatsApp
                      group for finding other guests.
                    </Text>
                    <Link
                      color="primary.700"
                      href="https://chat.whatsapp.com/JfIoHNRm7hM9MAObljVDml"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} /> Join the group
                    </Link>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Heading as="h3" size="lg">
              RSVP
            </Heading>

            <Text>
              Please tick the box next to the name of any individual planning to
              travel to attend. We kindly ask for your response by the{" "}
              <b>
                <time dateTime="2022-08-31">
                  31<sup>st</sup> of August 2022
                </time>
              </b>
              . Responses can be amended here any time between now and the time
              limit.
            </Text>

            <Text>
              Please do not hesitate to{" "}
              <Link color="primary" href="mailto:hello@haileyandsam.co.uk">
                reach out to us
              </Link>{" "}
              with any queries.
            </Text>

            <Form method="post">
              <fieldset>
                <Stack alignItems="center" spacing={8}>
                  <CheckboxGroup>
                    <Stack>
                      {party.guests.map((i) => (
                        <RSVP key={i.id} whichKey="attending" invitee={i} />
                      ))}
                    </Stack>
                  </CheckboxGroup>
                  <Button
                    colorScheme={buttonColourScheme}
                    type="submit"
                    isLoading={["loading", "submitting"].includes(
                      transition.state
                    )}
                  >
                    {buttonText}
                  </Button>
                </Stack>
              </fieldset>
            </Form>
          </Stack>
          <WeddingMap minHeight={200} />
        </Stack>
      </Container>
    </>
  );
}
