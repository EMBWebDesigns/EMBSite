import { LegalPageLayout } from "@/components/legal-page-layout";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">1. Agreement to Terms</h2>
      <p>
        By using our services, you agree to be bound by these Terms. If you do not agree to be bound by these Terms, do not use the services.
      </p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">2. Changes to Terms or Services</h2>
      <p>
        We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the Site or through other communications. It’s important that you review the Terms whenever we modify them because if you continue to use the Services after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.
      </p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">3. Who May Use the Services</h2>
      <p>
        You may use the Services only if you are 13 years or older and are not barred from using the Services under applicable law.
      </p>
      <p>
        This is placeholder text. You should replace this with your own official Terms of Service.
      </p>
    </LegalPageLayout>
  );
}