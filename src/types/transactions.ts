export type TransactionStatus = "Pending" | "Approved" | "Rejected";
export interface CharityPaymentRequest {
  _id: string;
  transaction_id: string; // Preserves the exact backend spelling variation
  amount: number; // Raw integer representing the transaction amount (e.g., 25)
  currency: "USD"; // Strict primary option with extensible fallback
  user_name: string;
  purpose: string; // e.g., "Charity role request"
  request_time: string | Date; // Standard ISO DateTime string representation
  status: TransactionStatus;
  organization_contact: string; // Kept as string to preserve country codes and signs like "+"
  organization_email: string;
  organization_logo: string;
  organization_name: string;
  email: string; // The applicant or user's email address
}

export interface RequestCharityRoleForm {
  organization_name: string;
  organization_email: string;
  organization_contact: string;
  organization_address: string;
  organization_logo: FileList;
  organization_tagline: string;
  mission: string;
}

export interface CharityRolePatchPayload {
  organization_name: string;
  organization_email: string;
  organization_contact: string;
  organization_address: string;
  organization_logo: string;
  organization_tagline: string;
  mission: string;
  transaction_id: string;
  amount_paid: number;
  currency: "USD";
  status: TransactionStatus;
  role: "charity_role_request";
  charity_request_time: Date;
}

export interface UpdateResult {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedId: string | null;
}

export interface CharityRolePatchResponse {
  message: string;
  userUpdate: UpdateResult;
  transactionUpdate: UpdateResult;
}

export interface RestaurantRolePatchResponse {
  message: string;
  userUpdate: UpdateResult;
  transactionUpdate: UpdateResult;
}

export interface CharityPaymentGetRequestResponse {
  message: string;
  transactions: CharityPaymentRequest[];
}