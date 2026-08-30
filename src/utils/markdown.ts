import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleData {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  excerpt?: string;
}

export function getSortedArticlesData(): ArticleData[] {
  // Ensure the directory exists
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.txt'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '').replace(/\.txt$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        id,
        content: matterResult.content,
        ...(matterResult.data as { title: string; date: string; category: string }),
      };
    })
    .filter((article) => article.title && article.date && article.category);

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleData(id: string): ArticleData | null {
  const mdPath = path.join(articlesDirectory, `${id}.md`);
  const txtPath = path.join(articlesDirectory, `${id}.txt`);
  
  let fullPath = '';
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else if (fs.existsSync(txtPath)) {
    fullPath = txtPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Generate an excerpt from the content (strip markdown tags and take first 150 chars)
  const plainText = matterResult.content
    .replace(/#+\s/g, '') // Remove headings
    .replace(/\!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Simplify links
    .replace(/[*_~`]/g, '') // Remove formatting marks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');

  return {
    id,
    content: matterResult.content,
    excerpt,
    ...(matterResult.data as { title: string; date: string; category: string }),
  };
}
