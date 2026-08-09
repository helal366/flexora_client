export interface CharityPaymentRequest {
  _id: string;
  transection_id: string; // Preserves the exact backend spelling variation
  amount: number; // Raw integer representing the transaction amount (e.g., 25)
  currency: "USD" | "BDT" | string; // Strict primary option with extensible fallback
  user_name: string;
  purpose: string; // e.g., "Charity role request"
  request_time: string | Date; // Standard ISO DateTime string representation
  status: "Pending" | "Approved" | "Rejected" | string;
  organization_contact: string; // Kept as string to preserve country codes and signs like "+"
  organization_email: string;
  organization_logo: string;
  organization_name: string;
  email: string; // The applicant or user's email address
}
