import {
  Alert as CAlert,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";

type Props = React.PropsWithChildren<{
  title: string;
}>;

export default function Alert({ title, children }: Props) {
  return (
    <CAlert colorScheme="pink" flexDirection="column">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </CAlert>
  );
}
