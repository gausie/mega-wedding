const SEGMENT_MAPS = [
  [true, true, true, false, true, true, true],
  [false, false, false, false, false, true, true],
  [false, true, true, true, true, true, false],
  [false, false, true, true, true, true, true],
  [true, false, false, true, false, true, true],
  [true, false, true, true, true, false, true],
  [true, true, true, true, true, false, true],
  [false, false, true, false, false, true, true],
  [true, true, true, true, true, true, true],
  [true, false, true, true, true, true, true],
];

function charToSSD(num: number) {
  return SEGMENT_MAPS[num] || null;
}

type Props = { value: number };

export function Digit({ value }: Props) {
  const segments = charToSSD(value);

  if (!segments) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.3 92.7"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "1em" }}
    >
      <title>{value}</title>
      {[
        segments[0] ? (
          <polygon
            key={0}
            id="v_top-left"
            points="3,4.6 0,9.6 0,39.4 3,44.4 6.1,39.4 6.1,9.6"
          />
        ) : null,
        segments[1] ? (
          <polygon
            key={1}
            id="v_bottom-left"
            points="3,48.1 0,53.1 0,82.8 3,87.8 6.1,82.8 6.1,53.1"
          />
        ) : null,
        segments[2] ? (
          <polygon
            key={2}
            id="h_top"
            points="4.8,3 9.8,6.1 39.5,6.1 44.5,3 39.5,0 9.8,0"
          />
        ) : null,
        segments[3] ? (
          <polygon
            key={3}
            id="h_middle"
            points="4.8,46.2 9.8,49.3 39.5,49.3 44.5,46.2 39.5,43.2 9.8,43.2"
          />
        ) : null,
        segments[4] ? (
          <polygon
            key={4}
            id="h_bottom"
            points="4.8,89.7 9.8,92.7 39.5,92.7 44.5,89.7 39.5,86.6 9.8,86.6"
          />
        ) : null,
        segments[5] ? (
          <polygon
            key={5}
            id="v_top-right"
            points="46.3,4.6 49.3,9.6 49.3,39.4 46.3,44.4 43.2,39.4 43.2,9.6"
          />
        ) : null,
        segments[6] ? (
          <polygon
            key={6}
            id="v_bottom-right"
            points="46.3,48.1 49.3,53.1 49.3,82.8 46.3,87.8 43.2,82.8 43.2,53.1"
          />
        ) : null,
      ]}
    </svg>
  );
}
