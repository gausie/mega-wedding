import { Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";

import Splash from "~/components/Splash";
import WeddingDate from "~/components/WeddingDate";

export default function Index() {
  return (
    <Flex flexDirection="column" height="100%">
      <Splash />
      {/* Bottom info container - this holds a banner of info at the bottom of the welcome container */}
      <Container maxW="4xl" py={8}>
        <SimpleGrid columns={2} spacing="20px">
          <Text fontSize={["xl", "2xl"]}>Near Edinburgh, Scotland</Text>
          <Text as="div" fontSize={["xl", "2xl"]} textAlign="right">
            <WeddingDate />
          </Text>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
