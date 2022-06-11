import { Flex } from "@chakra-ui/react";
import BezratHashem from "./BezratHashem";

import Title from "./Title";

export default function Splash() {
  // Heading container - this holds the logo and eventually(?) an engagement picture

  return (
    <Flex grow={1} bg="lightpink" alignItems="center" justifyContent="center">
      <BezratHashem />
      <Title />
    </Flex>
  );
}
