import { DonationStatus } from "./donations";

export type RequestStatus = "Pending" | "Accepted" | "Rejected";

export interface DonationRequest {
  _id: string;
  donation_id: string;
  donation_title: string;
  donation_image: string;
  food_type: string;
  quantity: string; // Represented as a string number matching your data instance
  donation_status: DonationStatus;
  unit: string;
  preferred_pickup_date: string; // e.g., "26 July 2025"
  preferred_pickup_time: string; // e.g., "18:35"
  restaurant_name: string;
  restaurant_email: string;
  restaurant_representative_name: string;
  restaurant_representative_email: string;
  request_description: string;
  charity_name: string;
  charity_email: string;
  charity_representative_name: string;
  charity_representative_email: string;
  request_status: RequestStatus;
  created_at: string | Date; // ISO DateTime format string
  picked_up_at: string | Date; // ISO DateTime format string
  picking_status: "Not Picked Up" | "Picked Up" | string;
  charity_logo: string;
  charity_address: string;
  charity_contact: string; // Handled as string to preserve leading zeros
}
