import { CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import BorderCard from "./BorderCard";

export default function GiftsCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Gifts
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          Should you wish to honour us with a gift at this period in our lives
          &mdash; with our firstborn on the way and an ongoing renovation of our
          home &mdash; we would most appreciate cash gifts or gift cards for
          John Lewis and Amazon, if you prefer.
        </Text>
      </CardBody>
    </BorderCard>
  );
}
