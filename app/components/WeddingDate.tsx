import { HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {
  CalendarOptions,
  GoogleCalendar,
  ICalendar,
  OutlookCalendar,
} from "datebook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faApple,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ClassNames } from "@emotion/react";

const event: CalendarOptions = {
  title: "Hailey and Sam's Wedding",
  location: "Coulston House, Haddington, Scotland, UK",
  start: new Date("2023-06-18T14:00:00"),
  end: new Date("2023-06-19T00:00:00"),
};

const ical = new ICalendar(event);
const google = new GoogleCalendar(event);
const outlook = new OutlookCalendar(event);

function Icon({ icon }: { icon: IconProp }) {
  return (
    <ClassNames>
      {({ css }) => {
        const filter = css`
          @supports not (-webkit-touch-callout: none) {
            filter: url(/filters.svg#woodcut);
          }
        `;

        return (
          <FontAwesomeIcon
            className={filter}
            icon={icon}
          />
        );
      }}
    </ClassNames>
  );
}

export default function WeddingDate() {
  return (
    <HStack display="inline-flex">
      <time dateTime="2023-06-18">18th June 2023</time>
      <div>
        <Menu>
          <MenuButton maxW={21}>
            <Icon icon={faCalendarDays} />
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={
                <Icon icon={faGoogle} />
              }
            >
              <a href={google.render()} target="_blank">
                Add to Google Calendar
              </a>
            </MenuItem>
            <MenuItem
              icon={
                <Icon icon={faApple} />
              }
              onClick={() => ical.download()}
            >
              Add to Apple Calendar
            </MenuItem>
            <MenuItem
              icon={
                <Icon icon={faMicrosoft} />
              }
            >
              <a href={outlook.render()} target="_blank">
                Add to Outlook
              </a>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </HStack>
  );
}
