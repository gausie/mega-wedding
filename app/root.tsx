import { ChakraProvider } from "@chakra-ui/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import fontAwesomeStyles from "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import theme from "./theme";
import NotFound from "./components/NotFound";

// Configure FontAwesome to work in an SRR environment
fontAwesomeConfig.autoAddCss = false;

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hailey and Sam's Wedding",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bona+Nova&family=Great+Vibes&family=IM+Fell+English+SC&family=IM+Fell+English&display=swap",
  },
  { rel: "stylesheet", href: fontAwesomeStyles },
];

const Document = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <Meta />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <Links />
      {typeof document === "undefined" ? "__STYLES__" : null}
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <Document>
        <ChakraProvider theme={theme}>
          <NotFound />
        </ChakraProvider>
      </Document>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
