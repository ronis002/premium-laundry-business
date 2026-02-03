import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "FreshWash Laundry | Professional Laundry & Dry Cleaning Services",
  description: "Professional laundry services with pickup & delivery. Wash & fold, dry cleaning, express service, and more. Eco-friendly, reliable, and affordable. Serving the community for 15+ years.",
  keywords: "laundry service, dry cleaning, wash and fold, pickup delivery, express laundry, eco-friendly cleaning, professional laundry",
  authors: [{ name: "FreshWash Laundry" }],
  openGraph: {
    title: "FreshWash Laundry | Professional Laundry Services",
    description: "Professional laundry services with pickup & delivery. Eco-friendly and reliable.",
    type: "website",
    locale: "en_US",
    siteName: "FreshWash Laundry",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshWash Laundry | Professional Laundry Services",
    description: "Professional laundry services with pickup & delivery. Eco-friendly and reliable.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="9e2b333b-2cc0-4c40-bcbf-43edc3e75725"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}