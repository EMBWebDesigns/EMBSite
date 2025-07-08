import { LegalPageLayout } from "@/components/legal-page-layout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">1. Introduction</h2>
      <p>
        Welcome to embwebdesigns.com. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
      </p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">2. Information We Collect</h2>
      <p>
        We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
      </p>
      <p>
        The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following: names, email addresses, contact preferences, and other similar information.
      </p>
      <h2 className="text-2xl font-semibold text-foreground pt-4">3. How We Use Your Information</h2>
      <p>
        We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
      </p>
      <p>
        This is placeholder text. You should replace this with your own official Privacy Policy.
      </p>
    </LegalPageLayout>
  );
}