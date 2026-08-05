import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// ⬇️ [تعديل العنوان الأساسي للصفحة الذي يظهر في أعلى المتصفح (Tab Title)]
export const metadata: Metadata = {
  title: "For Farida 💝 | Happy Birthday Favorite",
  description: "A special animated letter and scrapbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="overflow-x-hidden bg-[#8B0A1E]">{children}</body>
    </html>
  );
}
