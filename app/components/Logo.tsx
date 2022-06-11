type Props = {
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
};

export default function Logo({ width, height, maxWidth, minWidth }: Props) {
  let w = width === undefined && height === undefined ? "100%" : width;
  return (
    <svg viewBox="0 0 259 108" style={{ width: w, height, maxWidth, minWidth }}>
      <text
        transform="translate(1.014 -.51)"
        fontFamily="'Great Vibes', cursive"
        fontSize="46"
        fontWeight="400"
        strokeWidth="1.413"
      >
        <tspan style={{ whiteSpace: "pre" }} x="0" dy="40">
          Hailey Zislis
        </tspan>
      </text>
      <text> </text>
      <text
        transform="translate(121.929 39.754)"
        fontFamily="'Great Vibes', cursive"
        fontSize="28"
        fontWeight="400"
        strokeWidth="1.015"
      >
        <tspan style={{ whiteSpace: "pre" }} x="0" dy="24">
          and
        </tspan>
      </text>
      <text> </text>
      <text
        transform="translate(46.774 48.802)"
        fontFamily="'Great Vibes', cursive"
        fontSize="46"
        fontWeight="400"
        strokeWidth="1.413"
      >
        <tspan style={{ whiteSpace: "pre" }} x="0" dy="40">
          Samuel Gaus
        </tspan>
      </text>
    </svg>
  );
}
