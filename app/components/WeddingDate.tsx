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
  location: "Colstoun House, Haddington, Scotland, UK",
  start: new Date("2023-06-18T13:30:00"),
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

        return <FontAwesomeIcon className={filter} icon={icon} />;
      }}
    </ClassNames>
  );
}

type Props = {
  dayOfWeek?: boolean;
};

function openInBlank(url: string) {
  window.open(url);
}

export default function WeddingDate({ dayOfWeek }: Props) {
  return (
    <HStack display="inline-flex" mr={1}>
      <time dateTime="2023-06-18">
        {dayOfWeek && "Sunday the "}18<sup>th</sup> of June 2023
      </time>
      <div>
        <Menu>
          <MenuButton maxW={21} aria-label="Add to calendar">
            <Icon icon={faCalendarDays} />
          </MenuButton>
          <MenuList fontFamily="body">
            <MenuItem
              icon={<Icon icon={faGoogle} />}
              onClick={() => openInBlank(google.render())}
            >
              Add to Google Calendar
            </MenuItem>
            <MenuItem
              icon={<Icon icon={faApple} />}
              onClick={() => ical.download()}
            >
              Add to Apple Calendar
            </MenuItem>
            <MenuItem
              icon={<Icon icon={faMicrosoft} />}
              onClick={() => openInBlank(outlook.render())}
            >
              Add to Outlook
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </HStack>
  );
}
