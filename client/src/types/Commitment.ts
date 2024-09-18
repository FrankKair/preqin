import { Investor } from './Investor';

export interface Commitment {
  readonly id: number;
  readonly assetClass: string;
  readonly amount: number;
  readonly currency: string;
  readonly investor: Investor;
}
