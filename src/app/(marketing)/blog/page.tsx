import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/blog";
import { BlogList } from "@/components/blog-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Posts = async () => {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogList posts={posts || []} />;
};

export default function BlogPage() {
  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          The EMB Web Blog
        </h1>
        <p className='mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl'>
          News, tutorials, and insights from the team building the future of web
          development.
        </p>
      </div>

      <Suspense
        fallback={
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <Skeleton className='h-96 w-full' />
            <Skeleton className='h-96 w-full' />
          </div>
        }
      >
        <Posts />
      </Suspense>
    </div>
  );
}
