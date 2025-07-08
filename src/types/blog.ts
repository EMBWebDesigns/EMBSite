export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  image_url?: string | null;
  author?: string | null;
  tags?: string[] | null;
  created_at: string;
};