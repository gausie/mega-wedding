import { CardBody, CardHeader, Heading, Link } from "@chakra-ui/react";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderCard from "./BorderCard";

export default function LocationCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Location
        </Heading>
      </CardHeader>
      <CardBody>
        <Link color="primary.300" href="https://goo.gl/maps/ZhfL8jpvd8HAqaGB7">
          <FontAwesomeIcon icon={faMapPin} /> Colstoun House,
          <br />
          Haddington,
          <br />
          EH41 4PA
        </Link>
      </CardBody>
    </BorderCard>
  );
}
