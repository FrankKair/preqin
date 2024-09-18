import { Commitment } from "../types";

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(number: number): string {
  if (number <= 1000) return number.toString();

  const suffixes = ["K", "M", "B", "T"];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length) {
    number /= 1000;
    suffixIndex++;
  }

  number = Math.round(number * 10) / 10;
  const formattedNumber = number.toFixed(1);
  return formattedNumber + suffixes[suffixIndex - 1];
}

/**
 * Given a list of Commitment, an object is returned with:
 *
 * total: the sum of all commitments
 *
 * assetValueMap: { Hedge Funds: 3000, Infrastructure: 500, ... }
 *
 * classes: the list of all asset classes (Hedge Funds, Private Equity, Real State, etc.)
 */
export const getTotalsByAssetClass = (commitments: Commitment[]) => {
  const assetTotals = commitments.reduce((acc: { [key: string]: number }, commitment) => {
    const assetClass = commitment.assetClass;
    const amount = commitment.amount;
    if (!acc[assetClass]) {
      acc[assetClass] = 0;
    }
    acc[assetClass] += amount;
    return acc;
  }, {});

  const assetClasses = Object.keys(assetTotals);
  return {
    total: commitments.reduce((prev, curr) => prev + curr.amount, 0),
    assetValueMap: assetTotals,
    classes: assetClasses
  };
}
