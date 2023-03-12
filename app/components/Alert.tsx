import {
  Alert as CAlert,
  AlertDescription,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

type Props = React.PropsWithChildren<{
  title: string;
}>;

export default function Alert({ title, children }: Props) {
  return (
    <CAlert colorScheme="pink">
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Box>
    </CAlert>
  );
}
