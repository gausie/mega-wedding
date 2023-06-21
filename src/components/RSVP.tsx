import { HStack, Input, Radio, RadioGroup } from "@chakra-ui/react";
import RSVPContainer from "./RSVPContainer";
import { Invitee } from "../types";

type Props = {
  invitee: Invitee;
  whichKey: "considering" | "attending";
  disabled?: boolean;
};

export default function RSVP({ invitee, whichKey, disabled = false }: Props) {
  const propValue = invitee[whichKey];

  return (
    <RSVPContainer invitee={invitee}>
      <RadioGroup
        name={`rsvp.${invitee.id}`}
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
      <Input
        name={`notes.${invitee.id}`}
        placeholder="Dietary requirements, etc."
        maxWidth={300}
        defaultValue={invitee.notes || ""}
      />
    </RSVPContainer>
  );
}
