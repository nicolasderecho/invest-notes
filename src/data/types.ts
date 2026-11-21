export interface Source {
  label: string;
  url: string;
}
export interface Review {
  lastReviewed: string;
  sources: Source[];
}
export interface Definition {
  id: string;
  term: string;
  description: string;
  detail?: string;
  href?: string;
}
export interface Instrument extends Review {
  symbol: string;
  name: string;
  isin: string;
  domicile: string;
  income: string;
  ucits: boolean;
  exposure: string;
  role: string;
  listing: string;
  currency: string;
  replication?: string;
  ter?: string;
  notes: string[];
  taxReporting: { directUsIncomeProfile: string; reviewNote: string };
}
export interface BuyStep {
  id: string;
  title: string;
  summary: string;
  details: string[];
  setting?: string;
  terms?: string[];
}
