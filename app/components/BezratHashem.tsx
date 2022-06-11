import { Box, Text } from "@chakra-ui/react";

export default function BezratHashem({ top = 2, right = 4}) {
  return (
    <Box position="absolute" top={top} right={right}>
      <Text fontSize={["sm", "xl"]} variant="hebrew">
        ב״ה
      </Text>
    </Box>
  );
}
