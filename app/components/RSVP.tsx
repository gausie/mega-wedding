import { Checkbox } from "@chakra-ui/react";
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

  const toggle = useCallback(() => setValue((v) => !v), []);

  const title = invitee.responded_at
    ? `Last responded at ${invitee.responded_at}`
    : "No response yet";

  return (
    <>
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
    </>
  );
}
