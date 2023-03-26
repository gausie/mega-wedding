import {
  CardBody,
  CardHeader,
  Heading,
  Text,
  Link,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderCard from "./BorderCard";

export default function TravelCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Travel
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          <Text>
            The venue is a 40-minute journey by car from Edinburgh Waverley Rail
            Station and Edinburgh Airport.
          </Text>
          <Text>
            We've created a WhatsApp group for guests looking to share a car or
            taxi.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="center">
        <Link
          color="primary.300"
          href="https://chat.whatsapp.com/JfIoHNRm7hM9MAObljVDml"
        >
          <FontAwesomeIcon icon={faWhatsapp} /> Join the group
        </Link>
      </CardFooter>
    </BorderCard>
  );
}
