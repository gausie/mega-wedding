import type { MetaFunction } from "@remix-run/node";
import { useNavigate, useTransition } from "@remix-run/react";
import {
  Stack,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return {
    title: "Hailey and Sam's Wedding | International RSVP",
  };
};

export default function International() {
  const navigate = useNavigate();
  const transition = useTransition();
  const [pin, setPin] = useState("");

  const go = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      navigate(pin);
    },
    [pin, navigate]
  );

  return (
    <Stack minHeight="100%" spacing={0}>
      <Header />

      <Stack
        flexGrow={1}
        spacing={8}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Text as="div">Please enter the unique pin found in your email</Text>

        <form onSubmit={go}>
          <Stack spacing={4}>
            <HStack>
              <PinInput type="alphanumeric" onChange={setPin}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <input name="pin" type="hidden" value={pin} />
            <Button
              type="submit"
              disabled={pin.length < 6}
              isLoading={transition.state === "loading"}
            >
              Enter
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
