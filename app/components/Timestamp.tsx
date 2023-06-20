import Alert from "~/components/Alert";
import { Suspense } from "react";

type Props = { timestamp: number };

export default function Timestamp({ timestamp }: Props) {
  return (
    <Suspense>
      <Alert title="">{timestamp}</Alert>
    </Suspense>
  );
}
