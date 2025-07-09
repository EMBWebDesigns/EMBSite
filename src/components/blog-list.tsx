"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogPostCard } from "@/components/blog-post-card";

interface BlogListProps {
  posts: Post[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  return (
    <>
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
    </>
  );
};