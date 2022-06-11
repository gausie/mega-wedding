import { Center } from "@chakra-ui/react";

import BezratHashem from "./BezratHashem";

import Title from "./Title";

export default function Header() {
  return (
    <Center bg="lightpink" py={4} mb={12}>
      <BezratHashem />
      <Title direction="row" logoHeight={60} />
    </Center>
  );
}
