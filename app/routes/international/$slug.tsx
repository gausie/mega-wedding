import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
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
  Button,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";

import mapBoxStyles from "mapbox-gl/dist/mapbox-gl.css";

import { supabase } from "~/lib/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";

import Alert from "~/components/Alert";
import Header from "~/components/Header";
import RSVP from "~/components/RSVP";
import WeddingDate from "~/components/WeddingDate";
import WeddingMap from "~/components/WeddingMap";
import { fullname } from "~/utils";
import type { Database } from "~/types/supabase";

export const meta: MetaFunction = () => ({
  robots: "noindex",
  title: "Hailey and Sam's Wedding | International RSVP",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mapBoxStyles },
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
      .is("international", true)
      .eq("pin", pin.toLowerCase())
      .limit(1)
      .order("id")
      .single();

    return data as Party;
  }

  return null;
}

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;
  const party = await getParty(slug);

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

  return json({ party, slug });
};

export const action: ActionFunction = async ({ params, request }) => {
  const body = await request.formData();

  // Take the messy form data that comes from our RSVP form and sort it into a list of yes and no
  // responses from guests. Furthermore, validate that this invite code has the permission to
  // respond for those invitees.

  const party = await getParty(params.slug);

  // This should never happen, should probably log this
  if (party === null) return redirect("/");

  if (!party.guests) return;

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
      .from("guests")
      .update({
        considering: true,
        responded_at: new Date().toISOString(),
      })
      .in("id", yes),
    supabase
      .from("guests")
      .update({
        considering: false,
        responded_at: new Date().toISOString(),
      })
      .in("id", no),
  ]);

  sendTelegramMessage(
    `New International RSVP:${
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
  const { party, slug } = useLoaderData<typeof loader>();
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
        <SimpleGrid columns={[1, 2]} spacing={[10, 8]}>
          <Stack spacing={8} textAlign="center">
            <Alert title="We are no longer accepting international responses">
              If you have not already done so, please provide your full RSVP{" "}
              <Link color="primary.300" href={`/invite/${slug}`}>
                at the appropriate page
              </Link>
              , which contains more details.{" "}
              <Link href={`/invite/${slug}`}>➺</Link>
            </Alert>

            <Heading>Our Wedding</Heading>

            <Text as="div">
              It would be a sincere pleasure to welcome you to Scotland on the
              occasion of our wedding. On <WeddingDate dayOfWeek />, we will be
              married in Haddington – 17 miles east of our home in central
              Edinburgh.
            </Text>

            <Text>
              We would be honoured to reserve a space for you with an expression
              of your intent to make the journey. We kindly ask for your
              response by the{" "}
              <b>
                <time dateTime="2022-08-31">
                  31<sup>st</sup> of August 2022
                </time>
              </b>
              .
            </Text>

            <Text>
              Please tick the box next to the name of any individual planning to
              travel to Scotland for the wedding. Responses can be amended here
              any time between now and the time limit.
            </Text>

            <Form method="post">
              <fieldset>
                <Stack alignItems="center" spacing={8}>
                  <Stack width="100%" alignItems="center">
                    {party.guests.map((i) => (
                      <RSVP
                        key={i.id}
                        whichKey="considering"
                        invitee={i}
                        disabled
                      />
                    ))}
                  </Stack>
                  <Button
                    colorScheme={buttonColourScheme}
                    type="submit"
                    isLoading={["loading", "submitting"].includes(
                      transition.state
                    )}
                    disabled
                  >
                    {buttonText}
                  </Button>
                </Stack>
              </fieldset>
            </Form>

            <Text>
              Further details of the event will be made available in late
              summer, but in the meantime please do not hesitate to{" "}
              <Link color="primary.300" href="mailto:hello@haileyandsam.co.uk">
                reach out to us
              </Link>{" "}
              with any queries.
            </Text>
          </Stack>
          <WeddingMap />
        </SimpleGrid>
      </Container>
    </>
  );
}
