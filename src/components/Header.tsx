import { Center } from "@chakra-ui/react";

import BezrasHashem from "./BezrasHashem";
import Logo from "./Logo";

export default function Header() {
  return (
    <Center
      bg="primary"
      py={8}
      mb={12}
      borderBottomStyle="solid"
      borderColor="highlight"
      borderBottomWidth={20}
      cursor="pointer"
    >
      <BezrasHashem />
      <Logo height={100} />
    </Center>
  );
}
