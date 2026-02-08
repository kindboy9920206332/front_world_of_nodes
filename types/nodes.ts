import { ApiResponse } from "./basicApis";

// Mongo-like extended JSON helpers
type ObjectId = { $oid: string };
type Decimal128 = { $numberDecimal: string };
type ISODateString = string;
type MongoDate = { $date: ISODateString };

export type NodeDoc  = {
  _id: ObjectId;

  name: string;
  symbol: string;
  icon: string;
  description: string;

  type: "base" | string; 
  ownerId: ObjectId;

  basePrice: Decimal128;
  currentPrice: Decimal128;
  minPrice: Decimal128;
  maxPrice: Decimal128;

  visibilityScore: number;
  totalSupply: number;
  circulatingSupply: number;
  treasuryBalance: number;

  level: number;
  activityScore: number;
  reputation: number;

  salaryRules: {
    base: number;
    perTrade: number;
    perReferral: number;
  };

  tradeRules: {
    maxDailyTrades: number;
    minBuy: number;
    maxBuy: number;
    canPauseTrading: boolean;
    tradingPaused: boolean;
    feePercentBuy: number;
    feePercentCell: number; 
  };

  workersCount: number;
  investorsCount: number;

  createdAt: ISODateString; 
  updatedAt: MongoDate;     
}

export type listNodes = ApiResponse<NodeDoc[]>