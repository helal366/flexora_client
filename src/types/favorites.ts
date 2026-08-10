import { DonationStatus } from "./donations";

export interface FavoriteDonation {
  _id: string;
  image: string;
  donation_title: string;
  restaurant_name: string;
  restaurant_email: string;
  restaurant_representative_name: string;
  restaurant_representative_email: string;
  location: string;
  quantity: string; // Matches your MongoDB sample representation of numbers as strings
  unit: string;
  donation_status:DonationStatus; // Type-safe string fallback
  donationId: string; // Reference link to the parent donation document
  favoriter_name: string;
  favoriter_email: string;
  favoriter_role: "charity" | "restaurant" | "admin" | string; // Strict literal for specific platform roles
}
