import { Form, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
  Stack,
  Text,
  Button,
  Input,
  Heading,
  Container,
} from "@chakra-ui/react";

import Header from "~/components/Header";
import type { definitions } from "~/types/database";
import { supabase } from "~/lib/supabase.server";
import { sendTelegramMessage } from "~/lib/telegram.server";
import { fullname } from "~/utils";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return {
    robots: "noindex",
    title: "Hailey and Sam's Wedding | Details for Save the Date",
  };
};

type StdFormEntry = definitions["std_form"];

type Body = {
  firstname: string;
  lastname: string;
  email: string;
};

function validateBody(body: object): body is Body {
  return ["firstname", "lastname", "email"].every((f) => f in body);
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  // We're not really too worried about this data - I am planning on marrying it up with
  // our actual guestlist later. Just verify that it's acceptable and go.

  if (!validateBody(body)) {
    return {
      success: false,
      reason: "You must fill in all the required fields",
    };
  }

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(body.email)) {
    return { success: false, reason: "That email address doesn't look right" };
  }

  await Promise.all([supabase.from<StdFormEntry>("std_form").insert(body)]);

  sendTelegramMessage(
    `New STD details:\n✍️: *${fullname(body)}* gave the email address *${
      body.email
    }*`
  );

  return { success: true };
};

type ActionData = { success: true } | { success: false; reason: string };

export default function Details() {
  const transition = useTransition();
  const actionData = useActionData() as ActionData | undefined;
  const [valid, setValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    form.addEventListener("change", () => {
      setValid(form.checkValidity());
    });
  }, []);

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
        <Stack
          flexGrow={1}
          spacing={8}
          alignItems="center"
          justifyContent="center"
          height="100%"
          textAlign="center"
        >
          <Heading>Details</Heading>

          <Text as="div" fontSize="lg">
            Please give us an up-to-date email address along with your first
            last name so that we can send you a <i>Save the Date</i> for our
            wedding.
          </Text>

          <Form method="post" ref={formRef}>
            <Stack as="fieldset" spacing={4}>
              {!actionData?.success && (
                <>
                  <Input name="firstname" placeholder="First name" required />
                  <Input name="lastname" placeholder="Last name" required />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                  />
                </>
              )}
              <Button
                type="submit"
                isDisabled={!valid}
                isLoading={["loading", "submitting"].includes(transition.state)}
                colorScheme={buttonColourScheme}
                title={
                  valid
                    ? undefined
                    : "The form is invalid and cannot be submitted"
                }
              >
                {buttonText}
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Container>
    </>
  );
}
