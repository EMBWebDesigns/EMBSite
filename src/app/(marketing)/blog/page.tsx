"use client";

import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/blog";
import { BlogList } from "@/components/blog-list";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

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

      {loading ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Skeleton className='h-96 w-full' />
          <Skeleton className='h-96 w-full' />
        </div>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}