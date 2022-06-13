import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      "html, body": {
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
    error: {
      "50": "#FCE8EE",
      "100": "#F7C0CF",
      "200": "#F297B0",
      "300": "#EC6F90",
      "400": "#E74671",
      "500": "#E21D52",
      "600": "#B51742",
      "700": "#871231",
      "800": "#5A0C21",
      "900": "#2D0610",
    },
    success: {
      "50": "#F3F8EC",
      "100": "#DEECCB",
      "200": "#C8DFA9",
      "300": "#B3D388",
      "400": "#9DC666",
      "500": "#88BA45",
      "600": "#6D9537",
      "700": "#527029",
      "800": "#364A1C",
      "900": "#1B250E",
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
