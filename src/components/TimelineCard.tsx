import {
  CardBody,
  CardHeader,
  Heading,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";
import BorderCard from "./BorderCard";

export default function TimelineCard() {
  return (
    <BorderCard>
      <CardHeader paddingBottom={0}>
        <Heading as="h3" size="md">
          Timeline
        </Heading>
      </CardHeader>
      <CardBody>
        <UnorderedList listStyleType="none" spacing={4}>
          <ListItem>
            <Heading as="h4" size="sm" fontWeight="bold">
              Colstoun House
            </Heading>
            <Text>Kabbalat Panim &mdash; 1:30pm</Text>
            <Text>Bedeken &mdash; 2:30pm</Text>
          </ListItem>
          <ListItem>
            <Heading as="h4" size="sm" fontWeight="bold">
              The West Lawn
            </Heading>
            <Text>Chuppah &mdash; 2:45pm</Text>
          </ListItem>
          <ListItem>
            <Heading as="h4" size="sm" fontWeight="bold">
              The Walled Garden
            </Heading>
            <Text>Drinks Reception &mdash; 3:30pm</Text>
          </ListItem>
          <ListItem>
            <Heading as="h4" size="sm" fontWeight="bold">
              The Coach House
            </Heading>
            <Text>Wedding Breakfast &mdash; 5:00pm</Text>
            <Text>Dancing &mdash; 7:45pm</Text>
            <Text>Carriages &mdash; 12:00am</Text>
          </ListItem>
        </UnorderedList>
      </CardBody>
    </BorderCard>
  );
}
