import { Center } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

import BezrasHashem from "./BezrasHashem";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Center
      bg="primary"
      py={8}
      mb={12}
      onClick={() => navigate("/")}
      borderBottomStyle="solid"
      borderColor="highlight"
      borderBottomWidth={20}
    >
      <BezrasHashem />
      <Logo height={100} />
    </Center>
  );
}
