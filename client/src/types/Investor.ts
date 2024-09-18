import { Commitment } from './Commitment';

export interface Investor {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly country: string;
  readonly dateAdded: string;
  readonly lastUpdated: string;
  readonly commitments: Commitment[];
}