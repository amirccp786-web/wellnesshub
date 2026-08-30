import { getArticleData, getSortedArticlesData } from "@/utils/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata, ResolvingMetadata } from "next";

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
};

export async function generateStaticParams() {
  const articles = getSortedArticlesData();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedId = decodeURIComponent(resolvedParams.id);
  const articleData = getArticleData(decodedId);

  if (!articleData) {
    return { title: "Article Not Found" };
  }

  return {
    title: articleData.title,
    description: articleData.excerpt || `Read about ${articleData.title} on Wellness Hub.`,
    openGraph: {
      title: articleData.title,
      description: articleData.excerpt,
      type: "article",
      publishedTime: articleData.date,
      authors: ["Wellness Hub Expert"],
    },
    twitter: {
      card: "summary_large_image",
      title: articleData.title,
      description: articleData.excerpt,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const decodedId = decodeURIComponent(resolvedParams.id);
  const articleData = getArticleData(decodedId);

  if (!articleData) {
    notFound();
  }

  const tagClass = CATEGORY_TAG_MAP[articleData.category] ?? "";
  const icon = CATEGORY_ICONS[articleData.category] ?? "◆";

  return (
    <div style={{ paddingTop: "48px", paddingBottom: "80px" }}>
      {/* ── Back button ── */}
      <div style={{ marginBottom: "40px" }}>
        <Link href="/" className="back-btn">
          ← Back to Articles
        </Link>
      </div>

      {/* ── Article card ── */}
      <article
        className="glass-card"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "clamp(32px, 5vw, 64px)",
          borderRadius: "28px",
        }}
      >
        {/* ── Meta row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div
            className={`category-pill ${tagClass}`}
            style={{ cursor: "default" }}
          >
            <span>{icon}</span>
            <Link
              href={`/?category=${articleData.category}`}
              style={{
                color: "inherit",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {articleData.category}
            </Link>
          </div>

          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            {new Date(articleData.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* ── Title ── */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "40px",
          }}
        >
          {articleData.title}
        </h1>

        {/* ── Divider ── */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(99,212,186,0.4), transparent)",
            marginBottom: "40px",
          }}
        />

        {/* ── Content ── */}
        <div className="prose prose-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{articleData.content}</ReactMarkdown>
        </div>

        {/* ── Footer divider ── */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "48px 0 32px",
          }}
        />

        {/* ── Back link ── */}
        <Link href="/" className="back-btn">
          ← Back to Articles
        </Link>
      </article>
    </div>
  );
}
