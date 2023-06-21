import { Box, Text } from "@chakra-ui/react";

export default function BezrasHashem({ top = 2, right = 4 }) {
  return (
    <Box
      position="absolute"
      top={top}
      right={right}
      title="B'ezras Hashem"
      className="notranslate"
    >
      <Text fontSize={["sm", "xl"]} variant="hebrew">
        ב״ה
      </Text>
    </Box>
  );
}
