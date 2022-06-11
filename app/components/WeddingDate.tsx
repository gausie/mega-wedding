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

const event: CalendarOptions = {
  title: "Hailey and Sam's Wedding",
  location: "Coulston House, Haddington, Scotland, UK",
  start: new Date("2023-06-18T14:00:00"),
  end: new Date("2023-06-19T00:00:00"),
};

const ical = new ICalendar(event);
const google = new GoogleCalendar(event);
const outlook = new OutlookCalendar(event);

export default function WeddingDate() {
  return (
    <HStack display="inline-flex">
      <time dateTime="2023-06-18">18th June 2023</time>
      <div>
        <Menu>
          <MenuButton maxW={21}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ filter: "url(/filters.svg#woodcut)" }}
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{ filter: "url(/filters.svg#woodcut)" }}
                />
              }
            >
              <a href={google.render()} target="_blank">
                Add to Google Calendar
              </a>
            </MenuItem>
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faApple}
                  style={{ filter: "url(/filters.svg#woodcut)" }}
                />
              }
              onClick={() => ical.download()}
            >
              Add to Apple Calendar
            </MenuItem>
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faMicrosoft}
                  style={{ filter: "url(/filters.svg#woodcut)" }}
                />
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
