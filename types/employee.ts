import type { ApiResponse } from "./basicApis";

export type RequestSelectNode = {
  nodeId: string;
};

export type JoinSource = "user_apply" | "node_invite" | "employee_invite";
export type JoinStatus = "pending" | "accepted" | "rejected" | "expired";

export type NodeJoinRequest = {
  _id: string;

  userId: string;
  nodeId: string;

  source: JoinSource;

  inviteeId: string | null;     
  createdBy?: string | null;    

  status: JoinStatus;

  message?: string | null;

  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type NodeJoinListResponse = ApiResponse<NodeJoinRequest[]>;

export type CreateNodeJoinRequestBody = {
  nodeId: string;
  inviteeId?: string | null;
  source: JoinSource;
  message?: string | null;
};


export type UpdateNodeJoinStatusBody = {
  requestId: string;
  status: JoinStatus;
};
