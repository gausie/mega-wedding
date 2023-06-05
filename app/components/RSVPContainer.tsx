import { Grid, Text } from "@chakra-ui/react";
import React from "react";
import type { Database } from "~/types/supabase";

type Props = {
  invitee: Database["public"]["Tables"]["guests"]["Row"];
  children: React.ReactNode;
  templateColumns?: string;
};

export default function RSVPContainer({
  children,
  invitee,
  templateColumns = "2fr 1fr 2fr",
}: Props) {
  const title = invitee.responded_at
    ? `Last responded at ${invitee.responded_at}`
    : "No response yet";

  return (
    <Grid
      templateColumns={templateColumns}
      alignItems="center"
      maxWidth="80%"
      gap={4}
      title={title}
    >
      <Text>
        {invitee.firstname} {invitee.lastname}
      </Text>
      {children}
    </Grid>
  );
}
