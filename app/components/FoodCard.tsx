import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

export default function FoodCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Food
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Text>
            All food at the wedding will be vegetarian. Our caterer will be
            following{" "}
            <Link color="primary.700" href="/SAMS Wedding - Kashrut Policy.pdf">
              guidance
            </Link>{" "}
            issued by our celebrant, Rabbi Adam Zagoria-Moffet of St. Albans
            Masorti Synagogue. If you have any further dietary requirements
            (vegan, gluten free, etc) please let us know when completing your
            RSVP.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
