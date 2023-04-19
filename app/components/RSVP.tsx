import { Grid, HStack, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Database } from "~/types/supabase";

type Props = {
  invitee: Database["public"]["Tables"]["guests"]["Row"];
  whichKey: "considering" | "attending";
  disabled?: boolean;
};

export default function RSVP({ invitee, whichKey, disabled = false }: Props) {
  const propValue = invitee[whichKey];

  const title = invitee.responded_at
    ? `Last responded at ${invitee.responded_at}`
    : "No response yet";

  return (
    <Grid templateColumns="1fr 2fr 2fr" maxWidth="80%">
      <RadioGroup
        name={`rsvp.${invitee.id}`}
        title={title}
        isDisabled={disabled}
        defaultValue={
          propValue === null ? undefined : propValue === true ? "true" : "false"
        }
      >
        <HStack>
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
        </HStack>
      </RadioGroup>
      <Text>
        {invitee.firstname} {invitee.lastname}
      </Text>
      <Input
        name={`notes.${invitee.id}`}
        placeholder="Dietary requirements, etc."
        maxWidth={300}
      />
    </Grid>
  );
}
