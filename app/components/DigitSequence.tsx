import { Box, Stack } from "@chakra-ui/react";
import { Digit } from "./Digit";

type Props = { value: number; length: number; label: string };

export function DigitSequence({ value, length, label }: Props) {
  return (
    <Stack>
      <Stack direction="row" spacing={2}>
        {[...value.toString().padStart(length, "0")]
          .map((char) => Number(char))
          .map((digit, i) => (
            <Digit key={i} value={digit} />
          ))}
      </Stack>
      <Box position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          borderWidth="0 1px 1px 1px"
          height="4px"
        >
          &nbsp;
        </Box>
        <Box position="absolute" top={-2} left={0} right={0}>
          <Box
            display="inline-block"
            backgroundColor="white"
            fontSize={8}
            padding={1}
          >
            {label}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
