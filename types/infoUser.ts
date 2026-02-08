export type MongoDecimal = {
  $numberDecimal: string;
};

export type UserRole = "ownerNode" | string;

export type InfoUser = {
  _id: string;
  __v: number;

  email: string;
  username: string;
  name: string;

  invitedByUserId: string | null;

  level: number;
  xpScore: number;
  usdBalance: MongoDecimal;

  onboardingStep: "done" | string;
  roles: UserRole;

  referralCode: string;
  walletToken: string;

  passwordHash: string;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastLoginAt: string; // ISO date string
};
