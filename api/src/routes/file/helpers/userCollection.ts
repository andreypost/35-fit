import { IFileUserDetails } from "../../../types/interface";

export const countCountryEarnings = async (
  userCollection: IFileUserDetails[]
) => {
  const countryEarnings = userCollection.reduce(
    (acc, { country, earnings }) => {
      const formattedEarnings = parseInt(earnings.replace(/[$]/, ""));
      !acc[country]
        ? (acc[country] = [formattedEarnings])
        : acc[country].push(formattedEarnings);
      return acc;
    },
    {} as Record<string, number[]>
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
  }, {} as Record<string, number>);
};
