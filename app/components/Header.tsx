import { Center, HStack, Text } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router";

import BezratHashem from "./BezratHashem";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Center bg="primary" py={8} mb={12} onClick={() => navigate("/")} borderBottomStyle="solid" borderColor="highlight" borderBottomWidth={20}>
      <BezratHashem />
      <Logo height={100} />
    </Center>
  );
}
