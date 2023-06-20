type Props = { timestamp: number; reason: string };

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "long",
});

export function SpecialDate({ timestamp, reason }: Props) {
  return (
    <span
      style={{
        textDecoration:
          Date.now() < timestamp * 1000 ? undefined : "line-through",
      }}
    >
      <b>{FORMAT.format(new Date(timestamp * 1000))}</b> - {reason}
    </span>
  );
}
