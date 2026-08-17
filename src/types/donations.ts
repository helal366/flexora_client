import { RestaurantUser } from "./users";

export interface PickedUpBy {
  charity_name: string;
  charity_email: string;
  charity_representative_name: string;
  charity_representative_email: string;
}

export type DonationStatus = "Available" | "Requested" | "Picked Up" | string;

export interface FoodDonation {
  _id: string;

  donation_title: string;
  food_type: string;

  quantity: string;
  unit: string;

  pickup_time_window: string;
  pickup_date: string | Date;

  restaurant_name: string;
  restaurant_email: string;

  location: string;

  image: string;
  status: "Verified" | "Unverified" | string;
  donation_status: DonationStatus;

  restaurant_representative_email: string;
  restaurant_representative_name: string;

  is_featured: boolean;
  is_locked: boolean;

  favoriters_email_list: string[];
  picked_up_by?: PickedUpBy;

  posted_at: string | Date;
  updated_at?: string | Date;
}

export interface DonationData {
  donation_title: string;
  food_type: string;
  quantity: string;
  unit: string;
  pickup_time_window: string;
  pickup_date: string;
  restaurant_name: string;
  restaurant_email: string;
  location: string;
  image: string;
  status: string;
  posted_at: string | Date;
  restaurant_representative_email: string;
  restaurant_representative_name: string;
}
export type MealTime = "breakfast" | "lunch" | "dinner";

export interface AddDonationFormData {
  donation_title: string;
  food_type: string;
  quantity: string;
  unit: string;
  meal_time: MealTime;
  pickup_time_window: string;
  image: FileList;
}

export interface PickupTimeWindows {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface TopDonatedRestaurantResponse {
  restaurant: RestaurantUser;
  totalDonations: number;
  donations: FoodDonation[];
}