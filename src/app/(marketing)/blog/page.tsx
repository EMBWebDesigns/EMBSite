"use client";

import { useState, useEffect } from "react";
import { BlogPostCard } from "@/components/blog-post-card";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/types/blog";
import { Search } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      setPosts(data || []);
      setFilteredPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

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

      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt || ''}
                image_url={post.image_url || ''}
                created_at={post.created_at}
                tags={post.tags || []}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search term.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}