export interface DonationReview {
  _id: string;
  donation_id: string;
  donation_title: string;
  restaurant_name: string;
  restaurant_email: string;
  restaurant_representative_name: string;
  restaurant_representative_email: string;
  restaurant_location: string;
  donation_image: string;
  reviewer_name: string;
  reviewer_email: string;
  description: string;
  rating: number; // Stored as a raw numeric integer (e.g., 5)
  created_at: string | Date; // ISO DateTime format string from MongoDB
}

export interface ReviewData {
  donation_id: string;
  donation_title: string;
  restaurant_name: string;
  restaurant_email: string;
  restaurant_representative_name: string;
  restaurant_representative_email: string;
  restaurant_location: string;
  donation_image: string;
  reviewer_name: string;
  reviewer_email: string;
  description: string;
  rating: number;
  created_at: Date;
}