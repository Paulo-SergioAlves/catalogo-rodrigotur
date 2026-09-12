import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, "../public/og-image.svg");
const outPath = path.join(__dirname, "../public/og-rodrigotur.jpg");

const svg = readFileSync(svgPath);

await sharp(svg)
  .resize(1200, 630)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath);

console.log("✅ og-rodrigotur.jpg criada em public/");
