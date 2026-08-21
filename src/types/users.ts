export type UserRole =
  | "user"
  | "charity"
  | "restaurant"
  | "admin"
  | "restaurant_role_request"
  | "charity_role_request";
export type VerificationStatus = "Pending" | "Approved" | "Rejected" | string;

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  contact_number: string;
  created_at: string | Date;
  last_login: string | Date; // Accommodates both string timestamps and Date objects
  uid: string;
}

export interface BaseOrganization {
  status?: VerificationStatus;
  organization_name?: string;
  organization_address?: string;
  organization_contact?: string;
  organization_email?: string;
  organization_logo?: string;
  organization_tagline?: string;
  mission?: string;
  assigned_admin_email?: string;
  assigned_admin_name?: string;
  assigned_at?: string | Date;
}

export interface CharityUserFields extends BaseOrganization {
  amount_paid?: number;
  charity_request_time?: string | Date;
  currency?: string;
  transaction_id?: string; // Preserves exact backend spelling variation
}

export interface RestaurantUserFields extends BaseOrganization {
  organization_location?: string;
  organization_request_time?: string | Date;
}

export interface AppUser
  extends BaseUser, CharityUserFields, RestaurantUserFields {}

export interface CharityUser extends BaseUser, CharityUserFields {}

export interface RestaurantUser extends BaseUser, RestaurantUserFields {}

export interface RestaurantRequestFormPayload {
  name: string;
  email: string;
  organization_name?: string;
  organization_email?: string;
  organization_location?: string;
  organization_address?: string;
  organization_contact?: string;
  organization_tagline?: string;
  mission?: string;
  organization_logo?: FileList;
}

export interface RestaurantRequestPatchData {
  organization_name?: string;
  organization_email?: string;
  organization_location?: string;
  organization_address?: string;
  organization_contact?: string;
  organization_tagline?: string;
  mission?: string;
  organization_logo?: string;
  role: UserRole;
  status?: VerificationStatus;
  organization_request_time?: string | Date;
}

export interface IUserInfo {
  name: string;
  email: string;
  photoURL: string;
  role: string;
  contact_number: string;
  created_at: string;
  last_login: string;
  uid: string;
}

export interface IUserInfoResponse {
  user_by_email?: AppUser;
}