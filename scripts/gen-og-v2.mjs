import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = (f) => path.join(__dirname, "../src/imports", f);
const out  = path.join(__dirname, "../public/og-rodrigotur.jpg");

const W = 1200, H = 630;

/* ── 1. Background SVG ───────────────────────────────────── */
const bgSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#071226"/>
      <stop offset="55%"  stop-color="#0D1B3E"/>
      <stop offset="100%" stop-color="#162B5C"/>
    </linearGradient>
    <radialGradient id="glowR" cx="88%" cy="52%" r="42%">
      <stop offset="0%"   stop-color="#F97316" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#F97316" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowL" cx="14%" cy="48%" r="35%">
      <stop offset="0%"   stop-color="#4F8ECA" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#4F8ECA" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowR)"/>
  <rect width="${W}" height="${H}" fill="url(#glowL)"/>
  <!-- thin orange left bar -->
  <rect x="0" y="0" width="5" height="${H}" fill="#F97316" opacity="0.75"/>
  <!-- thin orange bottom strip -->
  <rect x="0" y="${H - 5}" width="${W}" height="5" fill="#F97316" opacity="0.6"/>
  <!-- faint horizontal divider -->
  <line x1="370" y1="160" x2="370" y2="470" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="830" y1="160" x2="830" y2="470" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
</svg>`);

/* ── 2. Text overlay SVG ─────────────────────────────────── */
// Text is centered in the zone between logo right edge (~340) and mascot left (~760)
// midpoint = (340+760)/2 = 550
const textSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- main tagline line 1 -->
  <text x="520" y="256"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="44" font-weight="700" font-style="italic"
    fill="white" text-anchor="middle" opacity="0.97">Viaje com confiança,</text>
  <!-- main tagline line 2 orange -->
  <text x="520" y="316"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="44" font-weight="700" font-style="italic"
    fill="#F97316" text-anchor="middle">vá de RodrigoTur!</text>
  <!-- supporting line -->
  <text x="520" y="380"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18" fill="white" text-anchor="middle"
    opacity="0.42" letter-spacing="1.5">Passagens aéreas nacionais e internacionais</text>
</svg>`);

/* ── 3. Prepare logo ─────────────────────────────────────── */
// Logo is square with navy bg — resize to 240×240, place at x=68, y=195
const LOGO_SIZE = 240;
const logoBuffer = await sharp(src("images-1.jpeg"))
  .resize(LOGO_SIZE, LOGO_SIZE, { fit: "contain", background: { r: 7, g: 18, b: 38, alpha: 1 } })
  .png()
  .toBuffer();

/* ── 4. Prepare mascot ───────────────────────────────────── */
// Mascot PNG is 1330×750 with very dark bg. We crop the mascot area (roughly centered),
// resize to 380 tall, and use screen blend so the dark bg merges with navy.
const mascotMeta = await sharp(src("ChatGPT_Image_10_de_ago._de_2026__20_48_33-2.png")).metadata();
const mW = mascotMeta.width, mH = mascotMeta.height;

// Mascot is horizontally centered; crop ~60% width, full height
const cropW = Math.round(mW * 0.52);
const cropX = Math.round((mW - cropW) / 2);

const MASCOT_H = 540;
const mascotBuffer = await sharp(src("ChatGPT_Image_10_de_ago._de_2026__20_48_33-2.png"))
  .extract({ left: cropX, top: 0, width: cropW, height: mH })
  .resize(null, MASCOT_H, { fit: "contain" })
  .png()
  .toBuffer();

const mascotResized = await sharp(mascotBuffer).metadata();
const MASCOT_W = mascotResized.width;

/* ── 5. Composite ────────────────────────────────────────── */
const logoX = 68;
const logoY = Math.round((H - LOGO_SIZE) / 2);

// Place mascot at right, leaving 24px margin, shifted down slightly for feet
const mascotX = W - MASCOT_W - 24;
const mascotY = Math.round((H - MASCOT_H) / 2) + 30;

await sharp(bgSvg)
  .composite([
    // mascot with screen blend (dark bg disappears into navy)
    { input: mascotBuffer, left: mascotX, top: mascotY, blend: "screen" },
    // logo — plain over composite (navy bg of logo matches bg)
    { input: logoBuffer, left: logoX, top: logoY, blend: "over" },
    // text on top
    { input: textSvg, left: 0, top: 0, blend: "over" },
  ])
  .jpeg({ quality: 93, mozjpeg: true })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`✅  ${meta.width}×${meta.height} ${meta.format} — ${Math.round(meta.size / 1024)} KB`);
console.log(`    → public/og-rodrigotur.jpg`);
