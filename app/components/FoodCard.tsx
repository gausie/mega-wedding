import { CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import BorderCard from "./BorderCard";

export default function FoodCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Food
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Text>
            All food at the wedding will be strictly vegetarian. Kosher wine
            will be used for ritual purposes and is additionally available upon
            request.
          </Text>
          <Text>
            Our caterer will be unsupervised, following guidance issued by our
            Messader Kiddushin, Rabbi Adam Zagoria-Moffet of St Albans Masorti
            Synagogue.
          </Text>
          <Text>
            If you have any further dietary requirements or questions about
            kashrut, please let us know when completing your RSVP.
          </Text>
        </Stack>
      </CardBody>
    </BorderCard>
  );
}
