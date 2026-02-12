import { ApiResponse } from "./basicApis";

// Mongo-like extended JSON helpers
type ObjectId = { $oid: string };
type Decimal128 = { $numberDecimal: string };
type ISODateString = string;
type MongoDate = { $date: ISODateString };

export type TradeDoc = {
  _id: ObjectId;

  amount: number;

  price: Decimal128;
  pricePaying: Decimal128;

  userId: ObjectId;
  ownerNode: ObjectId;
  nodeId: ObjectId;

  fee: number;

  type: "buy" | "sell"; // اگر حالت‌های دیگه هم داری اضافه کن

  createdAt: MongoDate;
  updatedAt: MongoDate;

  __v: number;
};

export type ListTrades = ApiResponse<TradeDoc[]>;
export type GetTrade = ApiResponse<TradeDoc>;
