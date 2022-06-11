import { Link, useNavigate, useTransition } from "@remix-run/react";
import {
  Container,
  Stack,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import Header from "~/components/Header";

export default function International() {
  const navigate = useNavigate();
  const transition = useTransition();
  const [pin, setPin] = useState("");

  const go = useCallback(() => navigate(pin), [pin]);

  return (
    <main>
      <Header />

      <Container maxW="2xl">
        <Stack spacing={8} alignItems="center">
          <Text as="div">Please enter the code found in your email</Text>

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
              onClick={go}
              disabled={pin.length < 6 || transition.state === "loading"}
              isLoading={transition.state === "loading"}
            >
              Enter
            </Button>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
