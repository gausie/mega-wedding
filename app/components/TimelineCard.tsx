import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function TimelineCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Timeline
        </Heading>
      </CardHeader>
      <CardBody>
        <UnorderedList>
          <ListItem>Kaboles Ponim (Bride & Groom's Reception) </ListItem>
          <ListItem fontWeight="bold">Chuppah (Ceremony)</ListItem>
          <ListItem>Drinks Reception</ListItem>
          <ListItem>Breakfast</ListItem>
          <ListItem>Dancing</ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}
