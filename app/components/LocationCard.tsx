import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  Link,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LocationCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Location
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Image src="/colstoun.webp" alt="The main house" />
          <Text>
            Colston House is a country home around 30 minutes' travel from the
            centre of Edinburgh.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Link color="primary.700" href="https://goo.gl/maps/ZhfL8jpvd8HAqaGB7">
          <FontAwesomeIcon icon={faMapPin} /> Colstoun House, Haddington, EH41
          4PA
        </Link>
      </CardFooter>
    </Card>
  );
}
