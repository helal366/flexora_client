import { UserRole, VerificationStatus } from "./users";

export interface RestaurantProfileForm {
  name: string;
  email: string;
  role: UserRole | "";
  contact_number: string;
  organization_tagline: string;
  mission: string;
  organization_contact: string;
  organization_email: string;
  organization_name: string;
  status: VerificationStatus;
  organization_address: string;
  organization_location: string;
  organization_logo?: FileList;
  photoURL?: FileList;
}
