import { Stack, Text, Image, Box } from "@chakra-ui/react";

const jokes = [
  {
    image: "/possibli.gif",
    explainer: "https://www.youtube.com/watch?v=CwPWmEzoVbw",
  },
  {
    image: "/troubleinparadise.gif",
    explainer: "https://y.yarn.co/db13532f-0a69-477a-8a78-ebafb5d177b2.mp4",
  },
  {
    image: "/whoops.gif",
    explainer: "https://www.youtube.com/watch?v=3iiz5kiePuI",
  },
] as const;

export default function NotFound() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];

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
        <a href={joke.explainer} target="_blank" rel="noreferrer">
          <Image
            borderStyle="solid"
            borderColor="primary"
            borderWidth="20px"
            src={joke.image}
          />
        </a>
      </Box>
    </Stack>
  );
}
