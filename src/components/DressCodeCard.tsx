import { CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import BorderCard from "./BorderCard";

export default function DressCodeCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Dress Code
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          <Text>Midsummer cocktail attire</Text>
          <Text>
            Bring your garden party flair &mdash; be as fabulous as you want to
            be!
          </Text>
        </Stack>
      </CardBody>
    </BorderCard>
  );
}
