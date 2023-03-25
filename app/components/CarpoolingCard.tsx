import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function CarpoolingCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Travel
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack>
          <Text>
            The venue is only a 30 minute journey from the centre of Edinburgh,
            and less than 40 from the airport. It's also possible to take two
            well-timed buses.
          </Text>
          <Text>
            Depending on numbers once we know them, we may hire a coach to and
            from Edinburgh. We will be in contact nearer the time with more
            information.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
