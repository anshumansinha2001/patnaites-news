import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Patnaites News",
  description: "Stay updated with the latest news from Patnaites News.",
  alternates: {
    canonical: "https://patnaitesnews.vercel.app",
  },
  openGraph: {
    type: "website",
    title: "Patnaites News",
    description: "Stay updated with the latest news from Patnaites News.",
    images: ["/path-to-your-default-image.jpg"],
    url: "https://patnaitesnews.vercel.app", // Your site's URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Patnaites News",
    description: "Stay updated with the latest news from Patnaites News.",
    images: ["/path-to-your-default-image.jpg"], // Default Twitter image
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
