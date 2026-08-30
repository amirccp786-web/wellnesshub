import os
import re

directory = r"c:\Python_Work\wellness-hub\src\content\articles"

# Pattern to match the metadata block at the top
pattern = re.compile(
    r'^\s*#+\s*\*\*Title:\s*(.*?)\*\*\s*\n+'
    r'#+\s*\*\*Date:\s*(.*?)\*\*\s*\n+'
    r'#+\s*\*\*Category:\s*(.*?)\*\*\s*\n+',
    re.MULTILINE | re.IGNORECASE
)

for filename in os.listdir(directory):
    if filename.endswith(".md") and filename not in ["sample-article.md", "About Us.md", "Privacy Policy.md", "Disclaimer.md", "Contact Us.md"]:
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        match = pattern.search(content)
        if match:
            title = match.group(1).strip()
            date = match.group(2).strip()
            category = match.group(3).strip()

            # Optional: Map some common typos to our official categories
            if category.lower() == "heart health":
                category = "Heart Health"
            elif category.lower() in ["food & health", "healthy food", "nutrition"]:
                category = "healthy Food"
            elif category.lower() == "diabetes":
                category = "Diabetes"
            elif category.lower() == "fitness":
                category = "Fitness"
            elif category.lower() == "weight loss":
                category = "Weight Loss"
            elif category.lower() == "cholesterol":
                category = "Cholesterol"
            elif category.lower() == "general":
                category = "General"
            
            # If the date is DD-MM-YYYY, convert it to YYYY-MM-DD
            if re.match(r'\d{2}-\d{2}-\d{4}', date):
                parts = date.split('-')
                date = f"{parts[2]}-{parts[1]}-{parts[0]}"
            
            frontmatter = f"---\ntitle: \"{title}\"\ndate: \"{date}\"\ncategory: \"{category}\"\n---\n\n"
            
            new_content = content[match.end():].lstrip()
            new_content = frontmatter + new_content
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"Skipped {filename} (no match)")
