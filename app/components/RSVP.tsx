import { Checkbox, HStack, Input } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import type { definitions } from "~/types/database";

type Guest = definitions["guests"];

type Props = {
  invitee: Guest;
  whichKey: "considering" | "attending";
  disabled?: boolean;
};

export default function RSVP({ invitee, whichKey, disabled = false }: Props) {
  const propValue = invitee[whichKey];
  const [value, setValue] = useState(propValue);
  useEffect(() => setValue(propValue), [propValue]);

  const [note, setNote] = useState(invitee.notes);
  useEffect(() => setNote(invitee.notes), [invitee.notes]);

  const toggle = useCallback(() => setValue((v) => !v), []);

  const title = invitee.responded_at
    ? `Last responded at ${invitee.responded_at}`
    : "No response yet";

  return (
    <HStack justifyContent="center">
      <input
        type="hidden"
        name={`rsvp.${invitee.id}`}
        value={value ? "true" : "false"}
      />
      <Checkbox
        isChecked={value}
        onChange={toggle}
        title={title}
        disabled={disabled}
      >
        {invitee.firstname} {invitee.lastname}
      </Checkbox>
      <Input
        value={note || ""}
        name={`notes.${invitee.id}`}
        placeholder="Dietary requirements, etc."
        onChange={(e) => setNote(e.currentTarget.value)}
        maxWidth={200}
      />
    </HStack>
  );
}
