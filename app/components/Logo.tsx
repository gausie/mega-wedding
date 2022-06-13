import { Box } from "@chakra-ui/react";
import { ClassNames } from "@emotion/react";

type Props = {
  width?: (string | number)[] | string | number;
  height?: (string | number)[] | string | number;
  maxWidth?: (string | number)[] | string | number;
  minWidth?: (string | number)[] | string | number;
};

export default function Logo({ width, height, maxWidth, minWidth }: Props) {
  let w = width === undefined && height === undefined ? "100%" : width;

  return (
    <Box
      width={w}
      height={height}
      maxWidth={maxWidth}
      minWidth={minWidth}
      textShadow="1px 1px rgba(255, 255, 255, 1), 2px 2px rgba(255, 255, 255, 0.6), 3px 3px rgba(255, 255, 255, 0.3)"
    >
      <svg
        viewBox="0 0 259 108"
        width={height === undefined ? "100%" : undefined}
        height={
          width === undefined && height !== undefined ? "100%" : undefined
        }
      >
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
    </Box>
  );
}
