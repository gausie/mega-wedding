import { Checkbox } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { definitions } from "~/types/database";

type International = definitions["international"];

type Props = {
  user: International;
};

export default function RSVP({ user }: Props) {
  const [value, setValue] = useState(user.attending);
  useEffect(() => setValue(user.attending), [user.attending]);

  const toggle = useCallback(() => setValue((v) => !v), []);

  const title = user.responded_at
    ? `Responded at ${user.responded_at}`
    : "No response yet";

  return (
    <>
      <input
        type="hidden"
        name={`rsvp.${user.id}`}
        value={value ? "true" : "false"}
      />
      <Checkbox isChecked={value} onChange={toggle} title={title}>
        {user.firstname} {user.lastname}
      </Checkbox>
    </>
  );
}
