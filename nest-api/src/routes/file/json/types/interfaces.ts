export interface IUserJsonResponse {
  id: number;
  earnings: string;
  country: string;
  name: string;
}

export type ICountryEarnings = Record<string, number[]>;
export type ICountryAverageEarnings = Record<string, number>;
