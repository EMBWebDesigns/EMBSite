export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar_url?: string | null;
  initials?: string | null;
  created_at: string;
};