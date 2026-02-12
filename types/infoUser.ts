import { ApiResponse } from "./basicApis";
import { NodeDoc } from "./nodes";
import { WalletTypes } from "./wallets";


export type MongoDecimal = {
  $numberDecimal: string;
};

export type UserRole = "worker" | "ownerNode" | "admin" | string;

export type EmployeeRoleInNode = "worker" | "manager" | "owner" | string;


export type UserDoc = {
  _id: string;
  __v: number;

  username: string;
  name: string;
  email: string;

  // حساس: تو UI نشون نده
  passwordHash: string;
  walletToken: string;
  referralCode: string;

  level: number;
  xpScore: number;
  usdBalance: MongoDecimal;

  invitedByUserId: string | null;
  roles: UserRole; // در دیتای تو stringه

  onboardingStep: "done" | string;

  lastLoginAt: string; // ISO
  createdAt: string; // ISO
  updatedAt: string; // ISO
};


export type EmployeeDoc = {
  _id: string;
  __v: number;

  userId: string;
  nodeId: string;

  joinedAt: string; // ISO
  leftAt: string | null; // ISO | null
  active: boolean;

  salaryBase: MongoDecimal;
  salaryPerTrade: MongoDecimal;
  salaryPerReferral: MongoDecimal;

  countTrades: number;

  referredUsers: string[] | null; // تو نمونه‌ت nullه، ممکنه بعداً آرایه باشه
  countReferrals: number;

  earnedTotal: MongoDecimal;

  roleInNode: EmployeeRoleInNode;

  lastSalaryCalcAt: string | null; // ISO | null

  createdAt: string; // ISO
  updatedAt: string; // ISO
};




export type GetUserInfoPayload = {
  user: UserDoc;
  employee: EmployeeDoc;
  wallet: WalletTypes;
  nodes?:NodeDoc[];
  nodeEmployeeInfo?: NodeDoc; 
};

export type GetUserInfoResponse = ApiResponse<GetUserInfoPayload>;






