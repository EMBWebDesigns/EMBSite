import { BlogPostCard } from "@/components/blog-post-card";
import { supabase } from "@/integrations/supabase/client";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          The emb.web Blog
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          News, tutorials, and insights from the team building the future of web development.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts?.map((post) => (
          <BlogPostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt || ''}
            image_url={post.image_url || ''}
            created_at={post.created_at}
            tags={post.tags || []}
          />
        ))}
      </div>
    </div>
  );
}