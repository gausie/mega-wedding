import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

export default function DressCodeCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Dress Code
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>The vibes are good</Text>
      </CardBody>
    </Card>
  );
}
