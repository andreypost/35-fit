import { ILinks } from "types/interface";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const NavigationLinks = ({
  links,
  bold,
  color,
}: {
  links: ILinks["links"];
  bold: string;
  color: string;
}) => {
  const { pathname } = useRouter(),
    { t } = useTranslation();
  return (
    <>
      {links.map(({ route, dictionary }) => (
        <li key={dictionary}>
          <Link
            href={route}
            className={bold}
            style={{
              color: pathname == route ? "#000044" : color,
            }}
          >
            {dictionary ? t(dictionary) : ""}
          </Link>
        </li>
      ))}
    </>
  );
};
