import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "src/content/articles/Privacy Policy.md");
  const content = await fs.promises.readFile(filePath, "utf-8");

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="prose prose-invert prose-lg">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
