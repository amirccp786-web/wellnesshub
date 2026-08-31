import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Wellness Hub",
    default: "Wellness Hub – Live Better Every Day",
  },
  description:
    "Expert-curated articles on holistic health, longevity, mindful nutrition, fitness, and preventative care. Your daily guide to biohacking a healthier life.",
  keywords: [
    "holistic health",
    "longevity",
    "biohacking",
    "mindful nutrition",
    "preventative care",
    "sustainable weight loss",
    "natural cholesterol reduction",
    "gut health",
    "metabolic wellness",
    "immune system optimization",
    "wellness",
    "fitness",
    "heart health",
  ],
  openGraph: {
    title: "Wellness Hub – Live Better Every Day",
    description: "Expert-curated articles on holistic health, longevity, mindful nutrition, and preventative care.",
    url: "https://wellness-hub.example.com",
    siteName: "Wellness Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Hub",
    description: "Your daily guide to biohacking a healthier life.",
  },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/?category=Heart Health", label: "Heart Health" },
  { href: "/?category=Healthy Food", label: "Healthy Food" },
  { href: "/?category=Diabetes", label: "Diabetes" },
  { href: "/?category=Fitness", label: "Fitness" },
  { href: "/?category=Weight Loss", label: "Weight Loss" },
  { href: "/?category=Cholesterol", label: "Cholesterol" },
  { href: "/?category=General", label: "General" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GD6G6ZF4KK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GD6G6ZF4KK');
            `,
          }}
        />
      </head>
      <body className={inter.className} style={{ position: "relative" }}>
        {/* ── Header ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(5, 11, 18, 0.85)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 24px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #63d4ba 0%, #a78bfa 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  ✦
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    background: "linear-gradient(135deg, #63d4ba 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Wellness Hub
                </span>
              </div>
            </Link>

            {/* Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className="nav-link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            minHeight: "calc(100vh - 64px - 80px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </main>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(5,11,18,0.9)",
            marginTop: "80px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #63d4ba 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Wellness Hub
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              © {new Date().getFullYear()} Wellness Hub. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "20px" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="footer-link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
