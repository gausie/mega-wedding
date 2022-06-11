import { Flex, Stack, Text } from "@chakra-ui/react";
import BezratHashem from "./BezratHashem";
import Logo from "./Logo";

export default function Splash() {
  // Heading container - this holds the logo and eventually(?) an engagement picture

  return (
    <Flex grow={1} bg="lightpink" alignItems="center" border="20px solid pink">
      <BezratHashem top={4} right={6} />
        <Stack alignItems="center" width="100%">
            <Text fontSize={["xs", "md", "2xl"]} textTransform="uppercase">The wedding of</Text>
            <Logo maxWidth="60%" minWidth={200} />
        </Stack>
    </Flex>
  );
}
