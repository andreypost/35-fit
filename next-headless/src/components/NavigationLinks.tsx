import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ILinks } from "types/interface";
import Link from "next/link";

export const NavigationLinks = ({
  links,
  bold,
  color,
}: {
  links: ILinks["links"];
  bold: string;
  color: string;
}) => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");
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
