import fs from "fs";
import path from "path";

const sourceDir = path.join(process.cwd(), "content");
const targetDir = path.join(process.cwd(), "public", "content");

// ensure target exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// copy folder recursively
function copyFolder(src, dest) {
  ensureDir(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function run() {
  if (!fs.existsSync(sourceDir)) {
    console.log("No content folder found");
    return;
  }

  copyFolder(sourceDir, targetDir);

  console.log("✅ content/ copied to public/content/");
}

run();