import { Center, HStack, Text } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router";

import BezratHashem from "./BezratHashem";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Center bg="lightpink" py={4} mb={12} onClick={() => navigate("/")}>
      <BezratHashem />
      <HStack alignItems="center">
        <Text textTransform="uppercase">The wedding of</Text>
        <Logo height={60} />
      </HStack>
    </Center>
  );
}
