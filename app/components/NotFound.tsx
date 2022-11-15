import { Stack, Text, Image, Box } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      spacing={10}
      mx={4}
    >
      <Box textAlign="center">
        <Text fontSize="6xl">404</Text>
        <Text fontSize="2xl">Page Not Found</Text>
      </Box>
      <Box borderStyle="solid" borderColor="highlight" borderWidth="20px">
        <a
          href="https://www.youtube.com/watch?v=CwPWmEzoVbw"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            borderStyle="solid"
            borderColor="primary"
            borderWidth="20px"
            src="/possibli.gif"
          />
        </a>
      </Box>
    </Stack>
  );
}
