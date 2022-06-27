import { Flex, Heading, Stack } from "@chakra-ui/react";
import BezrasHashem from "./BezrasHashem";
import Logo from "./Logo";

export default function Splash() {
  // Heading container - this holds the logo and eventually(?) an engagement picture

  return (
    <Flex
      grow={1}
      bg="primary"
      alignItems="center"
      borderColor="highlight"
      borderStyle="solid"
      borderWidth={[20, 40]}
      position="relative"
    >
      <BezrasHashem />
      <Stack alignItems="center" width="100%">
        <Heading fontSize={["xs", "lg", "4xl"]} textTransform="capitalize">
          The wedding of
        </Heading>
        <Logo maxWidth={["80%", "60%"]} minWidth={200} />
      </Stack>
    </Flex>
  );
}
