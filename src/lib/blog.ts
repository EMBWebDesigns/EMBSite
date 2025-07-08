export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "announcing-our-new-ai-code-generator",
    title: "Announcing Our New AI Code Generator: Build Faster Than Ever",
    excerpt: "We're thrilled to introduce the centerpiece of our platform: the AI Code Generator. Learn how it can transform your development workflow.",
    content: `
<p>Today marks a significant milestone for emb.web. We're officially launching our new AI Code Generator, a tool designed to revolutionize the way you build websites and applications.</p>
<h3 class="text-xl font-semibold mt-6 mb-3">What is the AI Code Generator?</h3>
<p>At its core, the generator is a sophisticated tool that translates your natural language prompts into clean, production-ready code. Simply describe the component you need—whether it's a "login form with email and password fields" or a "responsive hero section with a call-to-action button"—and our AI will generate the corresponding React and Tailwind CSS code in seconds.</p>
<h3 class="text-xl font-semibold mt-6 mb-3">How It Works</h3>
<p>Our system leverages state-of-the-art language models that have been fine-tuned on a massive dataset of high-quality code. This ensures that the output isn't just functional, but also adheres to modern best practices, including accessibility and responsiveness.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2340&auto=format&fit=crop",
    date: "July 15, 2024",
    author: "The emb.web Team",
    tags: ["New Feature", "AI"],
  },
  {
    slug: "5-tips-for-effective-ui-design",
    title: "5 Tips for More Effective UI Design",
    excerpt: "Good design is about more than just aesthetics. Here are five practical tips to help you create user interfaces that are both beautiful and functional.",
    content: `
<p>Creating a user interface that is intuitive and enjoyable to use is one of the most challenging aspects of web development. Here are five tips to keep in mind for your next project.</p>
<h3 class="text-xl font-semibold mt-6 mb-3">1. Prioritize Clarity and Simplicity</h3>
<p>A user should never have to wonder what to do next. Use clear labels, intuitive navigation, and a consistent visual hierarchy to guide them through your application.</p>
<h3 class="text-xl font-semibold mt-6 mb-3">2. Consistency is Key</h3>
<p>Use consistent colors, fonts, and component styles throughout your application. This not only creates a more professional look but also reduces the cognitive load on your users.</p>
<h3 class="text-xl font-semibold mt-6 mb-3">3. Provide Feedback</h3>
<p>Inform users about what's happening. Use loading spinners, success messages, and error notifications to communicate the system's status clearly.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1559028006-44a3a4f3658b?q=80&w=2187&auto=format&fit=crop",
    date: "July 1, 2024",
    author: "Jane Doe, UI/UX Lead",
    tags: ["Design", "Best Practices"],
  },
];