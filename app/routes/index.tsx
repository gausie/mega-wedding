import type { MetaFunction } from "@remix-run/node";
import {
  Container,
  Heading,
  Link,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";

import Header from "~/components/Header";
import { useEffect, useState } from "react";
import TimeSinceLaunch from "~/components/TimeSinceLaunch";
import Timestamp from "~/components/Timestamp";
import { SpecialDate } from "~/components/SpecialDate";

export const meta: MetaFunction = () => ({
  title: "Hailey and Sam's Wedding | Zislis-Gaus Epoch",
});

const EPOCH_IN_UNIX = 1687097995;

const zgNow = () => Math.floor(Date.now() / 1000) - EPOCH_IN_UNIX;

export default function Epoch() {
  const [timestamp, setTimestamp] = useState(zgNow());

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(zgNow()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <Container maxW="6xl" mb={16}>
        <Stack
          spacing={16}
          textAlign="center"
          alignItems="center"
          maxWidth={800}
          margin="0 auto"
        >
          <Stack
            spacing={4}
            textAlign="center"
            alignItems="center"
            maxWidth={800}
            margin="0 auto"
          >
            <Heading>Zislis-Gaus Epoch</Heading>
            <Text>The current Zislis-Gaus epoch time is</Text>
            <Timestamp timestamp={timestamp} />
            <Text>
              indicated on the{" "}
              <Link
                color="primary.300"
                href="https://cwandt.com/products/time-since-launch"
              >
                international prototype
              </Link>{" "}
              as{" "}
            </Text>
            <TimeSinceLaunch timestamp={timestamp} />
          </Stack>
          <Stack
            spacing={4}
            textAlign="center"
            alignItems="center"
            maxWidth={800}
            margin="0 auto"
          >
            <Heading size="lg" as="h3">
              Special Dates
            </Heading>
            <Stack>
              <StackItem>
                <SpecialDate
                  timestamp={EPOCH_IN_UNIX + 1000000}
                  reason="Meganium (one million seconds)"
                />
              </StackItem>
              <StackItem>
                <SpecialDate
                  timestamp={EPOCH_IN_UNIX + 123456789}
                  reason="123,456,789 seconds"
                />
              </StackItem>
              <StackItem>
                <SpecialDate
                  timestamp={EPOCH_IN_UNIX + 1000000000}
                  reason="Billenium (one billion seconds)"
                />
              </StackItem>
            </Stack>
          </Stack>
          <Stack
            spacing={4}
            textAlign="center"
            alignItems="center"
            maxWidth={800}
            margin="0 auto"
          >
            <Heading size="lg" as="h3">
              What is the Zislis-Gaus time?
            </Heading>
            <Text>
              The <b>Zislis-Gaus epoch</b> (or <b>Zislis-Gaus time</b>,{" "}
              <b>ZG time</b>, or <b>ZG timestamp</b>) is the number of seconds
              that have elapsed since 18 June, 2023 (14:19:55 UTC/GMT), not
              counting leap seconds. Literally speaking the epoch is Zislis-Gaus
              time zero (when Sam gave Hailey their{" "}
              <Link
                color="primary.300"
                href="https://en.wikipedia.org/wiki/Ketubah"
              >
                ketubah
              </Link>
              ), but &#8216;epoch&#8217; is often used as a synonym for
              Zislis-Gaus time. Some systems store epoch dates as a 32-bit
              integer, which might cause problems on 6 July, 2091 (known as the
              Year 2091 problem or Y2091).
            </Text>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
