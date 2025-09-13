const fs = require("fs");
const path = require("path");

// Base folders
const templatesDir = path.join(__dirname, "public", "templates");
const outputFile = path.join(__dirname, "public", "templates.json");

// Replace with your deployed Vercel domain later
const BASE_URL = "https://yourproject.vercel.app/templates";

function generateTemplates() {
  const categories = fs.readdirSync(templatesDir).filter((f) =>
    fs.statSync(path.join(templatesDir, f)).isDirectory()
  );

  const result = categories.map((category, catIndex) => {
    const files = fs.readdirSync(path.join(templatesDir, category));

    const templates = files
      .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .map((file, index) => ({
        id: `${category}_${index + 1}`,
        thumbnail: `${BASE_URL}/${category}/${file}`,
      }));

    return {
      id: String(catIndex + 1),
      category,
      templates,
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(`✅ templates.json generated at ${outputFile}`);
}

generateTemplates();
