import { CreateUserJsonDto } from '../json/dto/json.dto';
import {
  ICountryAverageEarnings,
  ICountryEarnings,
} from '../json/types/interfaces';

export const countCountryEarnings = async (
  userCollection: CreateUserJsonDto[],
) => {
  const countryEarnings: ICountryEarnings = userCollection.reduce(
    (acc, { country, earnings }) => {
      const formattedEarnings = parseInt(earnings.replace(/[$]/, ''));
      !acc[country]
        ? (acc[country] = [formattedEarnings])
        : acc[country].push(formattedEarnings);
      return acc;
    },
    {} as ICountryEarnings,
  );

  return Object.entries(countryEarnings).reduce((acc, [country, earnings]) => {
    const topEarnings = earnings
      .sort((a: number, b: number) => b - a)
      .slice(0, 10);

    acc[country] = +(
      topEarnings.reduce((c: number, n: number) => c + n, 0) /
      topEarnings.length
    ).toFixed(2);
    return acc;
  }, {} as ICountryAverageEarnings);
};
