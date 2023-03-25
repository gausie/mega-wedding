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
} from "@chakra-ui/react";

import mapBoxStyles from "mapbox-gl/dist/mapbox-gl.css";

import { supabase } from "~/lib/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";

import type { definitions } from "~/types/database";
import Header from "~/components/Header";
import RSVP from "~/components/RSVP";
import WeddingDate from "~/components/WeddingDate";
import WeddingMap from "~/components/WeddingMap";
import { fullname, isNotNull } from "~/utils";
import FoodCard from "~/components/FoodCard";
import CarpoolingCard from "~/components/CarpoolingCard";
import LocationCard from "~/components/LocationCard";
import DressCodeCard from "~/components/DressCodeCard";
import GiftsCard from "~/components/GiftsCard";
import TimelineCard from "~/components/TimelineCard";

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

  const naughty = Object.keys(deduplicatedBody).some((k) => {
    const [_, stringId] = k.split(".");
    const id = Number(stringId);
    return !inviteesMap.has(id);
  });

  if (naughty) {
    sendTelegramMessage(
      `${party.generated_name!} attempted to fuck with the form`
    );
    return { success: false, reason: "Don't fuck with my form" };
  }

  const [yes, no] = Object.entries(deduplicatedBody).reduce(
    ([yes, no], [key, value]) => {
      const [type, stringId] = key.split(".");
      const id = Number(stringId);
      if (type !== "rsvp") return [yes, no];
      return value === "true" ? [[...yes, id], no] : [yes, [...no, id]];
    },
    [[], []] as [number[], number[]]
  );

  const notes = Object.entries(deduplicatedBody)
    .map(([key, value]) => {
      const [type, stringId] = key.split(".");
      const id = Number(stringId);
      if (type !== "notes" || typeof value !== "string") return null;
      return [id, value] as const;
    })
    .filter(isNotNull);

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

  for (const [id, note] of notes) {
    await supabase
      .from<Guest>("guests")
      .update({
        notes: note || undefined,
      })
      .eq("id", id);
  }

  const notesToShow = notes.filter(([_id, note]) => note);

  const tgMessage = `New RSVP:${
    yes.length > 0
      ? `\n✔️: ${yes.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
      : ""
  }${
    no.length > 0
      ? `\n❌: ${no.map((i) => fullname(inviteesMap.get(i))).join(", ")}`
      : ""
  }${
    notesToShow.length > 0
      ? `\nwith notes:\n${notesToShow
          .map(
            ([id, note]) =>
              ` - ${fullname(inviteesMap.get(id))}: ${note || "(none)"}`
          )
          .join("\n")}`
      : ""
  }`;

  console.log(tgMessage);

  sendTelegramMessage(tgMessage);

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
              <LocationCard />
              <DressCodeCard />
              <FoodCard />
              <GiftsCard />
              <TimelineCard />
              <CarpoolingCard />
            </SimpleGrid>

            <Heading as="h3" size="lg">
              RSVP
            </Heading>

            <Text>
              Please tick the box next to the name of any individual planning to
              attend. We kindly ask for your response by the{" "}
              <b>
                <time dateTime="2023-04-09">
                  9<sup>th</sup> of April 2023
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

            <Form method="post" style={{ width: "100%" }}>
              <fieldset>
                <Stack alignItems="center" spacing={8} width="100%">
                  <CheckboxGroup>
                    <Stack width="100%">
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
