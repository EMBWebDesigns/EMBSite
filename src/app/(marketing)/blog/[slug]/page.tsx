import { supabase } from "@/integrations/supabase/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: posts } = await supabase.from("posts").select("slug");
  return posts?.map(({ slug }) => ({ slug })) || [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <article className='container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24'>
      <header className='mb-12 text-center'>
        <div className='flex flex-wrap gap-2 justify-center mb-4'>
          {(post.tags || []).map((tag: string) => (
            <Badge key={tag} variant='secondary'>
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>
          {post.title}
        </h1>
        <p className='mt-4 text-muted-foreground'>
          Posted by {post.author} on{" "}
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {post.image_url && (
        <div className='relative w-full h-96 mb-12'>
            <Image
            src={post.image_url}
            alt={post.title}
            fill
            className='object-cover rounded-lg'
            />
        </div>
      )}

      <div className='prose prose-lg dark:prose-invert max-w-none mx-auto'>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {post.content || ""}
        </ReactMarkdown>
      </div>
    </article>
  );
}