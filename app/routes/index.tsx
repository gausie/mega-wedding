import {
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import Splash from "~/components/Splash";
import WeddingDate from "~/components/WeddingDate";

export default function Index() {
  return (
    <Stack mb={16} spacing={4}>
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
      <Text textAlign="center" fontSize="xl">
        Nothing to see here just yet, unless you're an{" "}
        <Link as={RemixLink} to="/international" color="primary">
          international invitee
        </Link>
        .
      </Text>
    </Stack>
  );
}
