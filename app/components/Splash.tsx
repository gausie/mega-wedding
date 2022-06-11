import { Flex, Stack, Text } from "@chakra-ui/react";
import BezratHashem from "./BezratHashem";
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
      <BezratHashem />
      <Stack alignItems="center" width="100%">
        <Text fontSize={["xs", "lg", "4xl"]} textTransform="capitalize">
          The wedding of
        </Text>
        <Logo maxWidth="60%" minWidth={200} />
      </Stack>
    </Flex>
  );
}
