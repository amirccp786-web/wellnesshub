import Link from "next/link";
import Image from "next/image";
import { getSortedArticlesData } from "@/utils/markdown";

const CATEGORY_TAG_MAP: Record<string, string> = {
  "Heart Health": "tag-heart",
  "Healthy Food": "tag-food",
  "Diabetes": "tag-diabetes",
  "Fitness": "tag-fitness",
  "Weight Loss": "tag-weight",
  "Cholesterol": "tag-cholesterol",
  "General": "tag-general",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Heart Health": "♥",
  "Healthy Food": "🌿",
  "Diabetes": "⚕",
  "Fitness": "⚡",
  "Weight Loss": "⚖",
  "Cholesterol": "🩸",
  "General": "📌",
  "Eye": "👁️",
};

const CATEGORY_BANNERS: Record<string, { src: string; alt: string }> = {
  "Heart Health": {
    src: "/category-heart-health.jpg",
    alt: "Heart Health – Evidence-Based Wellness",
  },
  "Healthy Food": {
    src: "/category-healthy-food.jpg",
    alt: "Healthy Food – Mindful Nutrition",
  },
  "Diabetes": {
    src: "/category-diabetes.jpg",
    alt: "Diabetes – Blood Sugar & Metabolic Health",
  },
  "Fitness": {
    src: "/category-fitness.jpg",
    alt: "Fitness – Active Living & Movement",
  },
  "Weight Loss": {
    src: "/category-weight-loss.jpg",
    alt: "Weight Loss – Sustainable Living",
  },
  "Cholesterol": {
    src: "/category-cholesterol.jpg",
    alt: "Cholesterol – Cardiovascular Wellness",
  },
};

const DEFAULT_BANNER = {
  src: "/wellness-hero.jpg",
  alt: "Wellness – Live Better Every Day",
};

const CATEGORIES = [
  { label: "All", href: "/" },
  { label: "Heart Health", href: "/?category=Heart+Health" },
  { label: "Healthy Food", href: "/?category=Healthy+Food" },
  { label: "Diabetes", href: "/?category=Diabetes" },
  { label: "Fitness", href: "/?category=Fitness" },
  { label: "Weight Loss", href: "/?category=Weight+Loss" },
  { label: "Cholesterol", href: "/?category=Cholesterol" },
  { label: "General", href: "/?category=General" },
  { label: "Eye", href: "/?category=Eye" },
];

export default async function Home(
  props: { searchParams: Promise<{ category?: string }> }
) {
  const allArticles = getSortedArticlesData();
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;

  const filteredArticles = categoryFilter
    ? allArticles.filter((article) => article.category === categoryFilter)
    : allArticles;

  const currentBanner =
    (categoryFilter && CATEGORY_BANNERS[categoryFilter]) || DEFAULT_BANNER;

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <div
            className="animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(99,212,186,0.1)",
              border: "1px solid rgba(99,212,186,0.25)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-teal)",
              marginBottom: "24px",
            }}
          >
            <span>✦</span>
            <span>Evidence-Based Wellness</span>
          </div>

          <h1
            className="animate-fade-in animate-fade-in-delay-1"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            {categoryFilter ? (
              <>
                <span style={{ color: "var(--text-primary)" }}>{categoryFilter}</span>
                <br />
                <span className="gradient-text">Articles</span>
              </>
            ) : (
              <>
                Live Better,{" "}
                <span className="gradient-text">Every Day</span>
              </>
            )}
          </h1>

          <div
            className="animate-fade-in animate-fade-in-delay-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <Image
              key={currentBanner.src}
              src={currentBanner.src}
              alt={currentBanner.alt}
              width={900}
              height={506}
              priority
              style={{
                width: "100%",
                maxWidth: "900px",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div
          className="animate-fade-in animate-fade-in-delay-3"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "0",
          }}
        >
          {CATEGORIES.map(({ label, href }) => {
            const isActive =
              label === "All" ? !categoryFilter : categoryFilter === label;
            return (
              <Link
                key={label}
                href={href}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  border: "1px solid",
                  ...(isActive
                    ? {
                        background:
                          "linear-gradient(135deg, #63d4ba 0%, #a78bfa 100%)",
                        color: "#050b12",
                        borderColor: "transparent",
                        boxShadow: "0 0 20px rgba(99,212,186,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--text-secondary)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }),
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section style={{ paddingBottom: "80px" }}>
        {filteredArticles.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
              }}
            >
              No articles found in this category.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginTop: "20px",
                color: "var(--accent-teal)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← View all articles
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {filteredArticles.map(({ id, date, title, category }, i) => {
              const tagClass = CATEGORY_TAG_MAP[category] ?? "";
              const icon = CATEGORY_ICONS[category] ?? "◆";
              return (
                <Link
                  key={id}
                  href={`/articles/${id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <article
                    className="glass-card"
                    style={{
                      padding: "28px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    {/* Category pill */}
                    <div
                      className={`category-pill ${tagClass}`}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <span>{icon}</span>
                      <span>{category}</span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        lineHeight: 1.35,
                        color: "var(--text-primary)",
                        margin: 0,
                        flex: 1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </h2>

                    {/* Footer row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                        }}
                      >
                        {new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        style={{
                          color: "var(--accent-teal)",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
