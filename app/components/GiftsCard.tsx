import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

export default function GiftsCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Gifts
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          We would be honoured if you would like to give us a gift on the
          occasion of our wedding. At this period in our lives, with our first
          born on the way and an on-going rennovation of our home; we would most
          appreciate cash gifts or gift card for John Lewis and Amazon if you
          prefer.
        </Text>
      </CardBody>
    </Card>
  );
}
