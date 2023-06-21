import { Suspense, useMemo } from "react";
import { DigitSequence } from "./DigitSequence";
import { Stack } from "@chakra-ui/react";

type Props = { timestamp: number };

export default function TimeSinceLaunch({ timestamp }: Props) {
  const duration = useMemo(() => {
    let seconds = timestamp;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    let days = Math.floor(hours / 24);
    hours = hours - days * 24;
    return { days, hours, minutes, seconds };
  }, [timestamp]);

  return (
    <Suspense>
      <Stack direction="row" spacing={4}>
        <DigitSequence label="Days" length={6} value={duration.days} />
        <DigitSequence label="Hours" length={2} value={duration.hours} />
        <DigitSequence label="Minutes" length={2} value={duration.minutes} />
        <DigitSequence label="Seconds" length={2} value={duration.seconds} />
      </Stack>
    </Suspense>
  );
}
