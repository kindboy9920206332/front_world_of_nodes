
export type MongoDecimal = {
  $numberDecimal: string;
};

export type WalletTypes = {
  walletToken: string;
  userId: string;
  usBalance: MongoDecimal;
  blocked: MongoDecimal;
  createdAt: Date;
  updatedAt: Date;
};

