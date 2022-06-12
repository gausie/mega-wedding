import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      'html, body': {
        height: "100%",
      },
    },
  },
  semanticTokens: {
    colors: {
      primary: "#F7C2D0",
      highlight: "#f5cec8",
    },
  },
  colors: {
    success: {
      50: "#FFF5F7",
      100: "#FED7E2",
      200: "#FBB6CE",
      300: "#F687B3",
      400: "#ED64A6",
      500: "#D53F8C",
      600: "#B83280",
      700: "#97266D",
      800: "#702459",
      900: "#521B41",
    },
    error: {
      50: "#FFF5F5",
      100: "#FED7D7",
      200: "#FEB2B2",
      300: "#FC8181",
      400: "#F56565",
      500: "#E53E3E",
      600: "#C53030",
      700: "#9B2C2C",
      800: "#822727",
      900: "#63171B",
    },
  },
  fonts: {
    heading: `'Great Vibes', cursive`,
    body: `'IM Fell English SC', serif`,
    hebrew: `'Bona Nova', serif`,
  },
  components: {
    Text: {
      variants: {
        hebrew: {
          fontFamily: "'Bona Nova', serif",
        },
      },
    },
  },
});
