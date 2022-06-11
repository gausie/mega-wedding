import { Stack, StackDirection, Text } from "@chakra-ui/react";

import Logo from "./Logo";

type Props = {
  direction?: StackDirection;
  logoHeight?: number;
};

export default function Title({ direction, logoHeight }: Props) {
  return (
    <Stack direction={direction} alignItems="center">
      <Text textTransform="uppercase">The wedding of</Text>
      <Logo height={logoHeight} />
    </Stack>
  );
}
