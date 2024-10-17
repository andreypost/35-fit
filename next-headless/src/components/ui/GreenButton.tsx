import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IRoutePriceTitle } from "types/interface";

export const GreenButton = ({
  text = "main.register_trial",
  route = "/reserve",
}: IRoutePriceTitle) => {
  const { t } = useTranslation();
  return (
    <Link className="green_button flex_center_center b900 white" href={route}>
      {/\./g.test(text) ? t(text) : text}
    </Link>
  );
};
