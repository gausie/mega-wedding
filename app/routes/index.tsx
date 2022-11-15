import { Container, Flex, SimpleGrid, Stack, Heading } from "@chakra-ui/react";

import Splash from "~/components/Splash";
import WeddingDate from "~/components/WeddingDate";

export default function Index() {
  return (
    <Stack spacing={4}>
      <Flex flexDirection="column" height="100vh">
        <Splash />
        {/* Bottom info container - this holds a banner of info at the bottom of the welcome container */}
        <Container maxW="4xl" py={8}>
          <SimpleGrid columns={2} spacing="20px">
            <Heading fontSize={["xl", "2xl"]}>Near Edinburgh, Scotland</Heading>
            <Heading as="div" fontSize={["xl", "2xl"]} textAlign="right">
              <WeddingDate />
            </Heading>
          </SimpleGrid>
        </Container>
      </Flex>
    </Stack>
  );
}
