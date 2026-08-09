export interface PickedUpBy {
  charity_name: string;
  charity_email: string;
  charity_representative_name: string;
  charity_representative_email: string;
}

export interface FoodDonation {
  _id: string;
  donation_title: string;
  food_type: string;
  quantity: string; // Stored as a string representing a number (e.g., "12")
  unit: string;
  pickup_time_window: string;
  restaurant_name: string;
  restaurant_email: string;
  location: string;
  image: string;
  status: "Verified" | "Unverified" | string; // Strict literal with string fallback
  posted_at: string | Date;
  donation_status: "Picked Up" | "Pending" | string; // Strict literal with string fallback
  restaurant_representative_email: string;
  restaurant_representative_name: string;
  is_featured: boolean;
  favoriters_email_list: string[];
  picked_up_by: PickedUpBy;
  updated_at: string | Date;
  is_locked: boolean;
}
