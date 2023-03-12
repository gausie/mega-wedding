import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ClassNames } from "@emotion/react";

type Props = { icon: IconProp };

export default function Icon({ icon }: Props) {
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
