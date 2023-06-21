import { Card } from "@chakra-ui/react";

type Props = React.PropsWithChildren<{}>;

export default function BorderCard({ children }: Props) {
  return (
    <Card
      borderRadius={0}
      sx={{
        borderRadius: 0,
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: "highlight",
        ":before": {
          content: '" "',
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderColor: "primary",
          borderWidth: 4,
          borderStyle: "solid",
        },
      }}
    >
      {children}
    </Card>
  );
}
