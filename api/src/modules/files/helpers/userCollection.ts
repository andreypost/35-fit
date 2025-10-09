import { IFileUserDetails } from "../file.types";

type CountryEarnings = Record<string, number[]>;
type CountryAverageEarnings = Record<string, number>;

export const countCountryEarnings = async (
  userCollection: IFileUserDetails[]
) => {
  const countryEarnings: CountryEarnings = userCollection.reduce(
    (acc, { country, earnings }) => {
      const formattedEarnings = parseInt(earnings.replace(/[$]/, ""));
      !acc[country]
        ? (acc[country] = [formattedEarnings])
        : acc[country].push(formattedEarnings);
      return acc;
    },
    {} as CountryEarnings
  );

  return Object.entries(countryEarnings).reduce((acc, [country, earnings]) => {
    const topEarnings = earnings
      .sort((a: number, b: number) => b - a)
      .slice(0, 10);
    acc[country] = Math.round(
      topEarnings.reduce((c: number, n: number) => c + n, 0) /
      topEarnings.length
    );
    return acc;
  }, {} as CountryAverageEarnings);
};
