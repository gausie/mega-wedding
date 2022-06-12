import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
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
} from "@chakra-ui/react";

import mapBoxStyles from "mapbox-gl/dist/mapbox-gl.css";

import supabase from "~/lib/supabase/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";

import type { definitions } from "~/types/database";
import Header from "~/components/Header";
import RSVP from "~/components/RSVP";
import WeddingDate from "~/components/WeddingDate";
import WeddingMap from "~/components/WeddingMap";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mapBoxStyles },
];

type InternationalTokens = definitions["international_tokens"];
type International = definitions["international"];

const fullname = (i?: International | InternationalTokens) => i ? `${i.firstname} ${i.lastname}` : "Unknown";

async function getInvitees(pin?: string) {
  let primary = null;

  if (pin) {
    const { data } = await supabase
      .from<InternationalTokens>("international_tokens")
      .select()
      .eq("token", pin)
      .limit(1)
      .single();

    primary = data;
  }

  if (primary === null) return [];

  const { data: secondaries } = await supabase
    .from<International>("international")
    .select()
    .eq("represented_by", primary.id)
    .order("firstname")
    .order("lastname");

  return [primary, ...(secondaries || [])];
}

export const loader: LoaderFunction = async ({ params }) => {
  const invitees = await getInvitees(params.slug);

  if (invitees.length === 0) return redirect("/international");

  const primary = invitees[0];

  if (primary.last_visited_at === null) {
    sendTelegramMessage(`${fullname(primary)} visited the International RSVP page for the first time`);
  }

  await supabase
    .from("international")
    .update({ last_visited_at: new Date().toISOString() })
    .in(
      "id",
      invitees.map((i) => i.id)
    );

  return json(invitees);
};

export const action: ActionFunction = async ({ params, request }) => {
  const body = await request.formData();

  // Take the messy form data that comes from our RSVP form and sort it into a list of yes and no
  // responses from guests. Furthermore, validate that this invite code has the permission to
  // respond for those invitees.

  const invitees = new Map((await getInvitees(params.slug)).map((i) => [i.id || 0, i]));

  // This should never happen, should probably log this
  if (invitees.size === 0) return redirect("/");

  // This doesn't respect the beauty of FormData but nor do I. In case there are dupes
  // this will just use the last value we have
  const deduplicatedBody = Object.fromEntries(body.entries());

  let naughty = false;

  const [yes, no] = Object.entries(deduplicatedBody).reduce(
    ([yes, no], [key, value]) => {
      const [type, stringId] = key.split(".");
      const id = Number(stringId);
      if (!invitees.has(id)) {
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
    return { success: false, reason: "Don't fuck with my form" };
  }

  await Promise.all([
    supabase
      .from<International>("international")
      .update({
        attending: true,
        responded_at: new Date().toISOString(),
      })
      .in("id", yes),
    supabase
      .from<International>("international")
      .update({
        attending: false,
        responded_at: new Date().toISOString(),
      })
      .in("id", no),
  ]);


  sendTelegramMessage(`New International RSVP:${yes.length > 0 ? `\n✔️: ${yes.map(i => fullname(invitees.get(i))).join(", ")}` : ""}${no.length > 0 ? `\n❌: ${no.map(i => fullname(invitees.get(i))).join(", ")}` : ""}`);

  return { success: true };
};

type ActionData = { success: true } | { success: false; reason: string };

export default function InternationalSlug() {
  const transition = useTransition();
  const users = useLoaderData() as International[];
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

      <Container maxW="4xl" mb={16}>
        <Stack spacing={8} textAlign="center">
          <Heading>International Save the Date</Heading>

          <Text as="div">
            We would be honoured to reserve a space for you with an expression
            of your intent to attend our wedding on the <WeddingDate />
          </Text>

          <WeddingMap />

          <Text>Please indicate the intent of you and your party below</Text>

          <Form method="post">
            <fieldset>
              <Stack alignItems="center" spacing={4}>
                <CheckboxGroup>
                  <Stack>
                    {users.map((u) => (
                      <RSVP key={u.id} user={u} />
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
      </Container>
    </>
  );
}
