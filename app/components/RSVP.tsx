import { Checkbox } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import type { definitions } from "~/types/database";

type Guest = definitions["guests"];

type Props = {
  invitee: Guest;
};

export default function RSVP({ invitee }: Props) {
  const [value, setValue] = useState(invitee.attending);
  useEffect(() => setValue(invitee.attending), [invitee.attending]);

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
      <Checkbox isChecked={value} onChange={toggle} title={title}>
        {invitee.firstname} {invitee.lastname}
      </Checkbox>
    </>
  );
}
