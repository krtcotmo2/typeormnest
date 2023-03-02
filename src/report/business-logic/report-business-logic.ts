import { Report } from "../report.entity";

export const getAveragePrice = ( prices: Report[]) => {
  return prices.reduce( (starting, car) => starting + car.price, 0) / prices.length;
}