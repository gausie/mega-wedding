import { Box, Container, Flex, Text } from "@chakra-ui/react";

import Splash from "~/components/Splash";
import WeddingDate from "~/components/WeddingDate";

export default function Index() {
  return (
    <div>
      {/* Welcome container - this spans the whole viewport */}
      <Flex flexDirection="column" height="100vh">
        <Splash />
        {/* Bottom info container - this holds a banner of info at the bottom of the welcome container */}
        <Container maxW="8xl" py={8}>
          <Flex justifyContent="space-around">
            <Text fontSize={["xl", "2xl"]}>Near Edinburgh, Scotland</Text>
            <Text as="div" fontSize={["xl", "2xl"]} textAlign="right">
              <WeddingDate />
            </Text>
          </Flex>
        </Container>
      </Flex>
    </div>
  );
}
