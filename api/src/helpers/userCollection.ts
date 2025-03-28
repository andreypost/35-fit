import { IFileUserDetails } from "../types/interface";

export const countCountryEarnings = async (
  userCollection: IFileUserDetails[]
) => {
  let averageEarnings: any = {};
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

  for (const country in countryEarnings) {
    const topEarnings = countryEarnings[country]
      .sort((a: number, b: number) => b - a)
      .slice(0, 10);
    const total = topEarnings.reduce(
      (acc: number, sum: number) => acc + sum,
      0
    );
    averageEarnings[country] = Math.round(total / topEarnings.length);
  }
  return averageEarnings;
};
