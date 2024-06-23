import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI Resume Builder",
    template: "AI Resume Builder | %s"
  },
  description: "Build your resume with AI",
  manifest: '/manifest.json',
  icons: [{
    url: "/favicon.ico",
    href: "/favicon.ico",
    type: "icon/ico"
  }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Resume Builder",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "AI Resume Builder",
    title: {
      default: "AI Resume Builder",
      template: "AI Resume Builder | %s",
    },
    description: "Build your resume with AI",
  },
  twitter: {
    card: "summary",
    title: {
      default: "AI Resume Builder",
      template: "AI Resume Builder | %s",
    },
    description: "Build your resume with AI",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProgressProvider>
              {children}
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
