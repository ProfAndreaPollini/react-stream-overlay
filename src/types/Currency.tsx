import { Links } from "./Links";

export interface Currency {
  name: string;
  symbol: string;
  rank: number;
  age: number;
  color: string;
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number;
  markets: number;
  pairs: number;
  allTimeHighUSD: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply?: number;
  links: Links;
  code: string;
  rate: number;
  volume: number;
  cap: number;
}
