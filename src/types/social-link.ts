export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon_name: string; // Name of the Lucide React icon (e.g., 'Github', 'Twitter')
  display_order: number;
  created_at: string;
};