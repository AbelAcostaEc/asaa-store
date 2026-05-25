import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "public", "img", "products", "originals");
const outputDir = path.join(root, "public", "img", "products", "optimized");
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const slugifyFileName = (fileName) => {
	const parsed = path.parse(fileName);
	const slug = parsed.name
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "_")
		.replace(/^_+|_+$/g, "");

	return `${slug || "producto"}.webp`;
};

const formatKb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function ensureFolders() {
	await fs.mkdir(inputDir, { recursive: true });
	await fs.mkdir(outputDir, { recursive: true });
}

async function getImages() {
	const entries = await fs.readdir(inputDir, { withFileTypes: true });
	return entries.filter((entry) => entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase()));
}

async function optimizeImage(entry) {
	const inputPath = path.join(inputDir, entry.name);
	const outputName = slugifyFileName(entry.name);
	const outputPath = path.join(outputDir, outputName);

	await sharp(inputPath)
		.rotate()
		.resize({
			width: 1200,
			height: 1200,
			fit: "inside",
			withoutEnlargement: true,
		})
		.webp({
			quality: 78,
			effort: 6,
		})
		.toFile(outputPath);

	const [inputStats, outputStats] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);
	return {
		inputName: entry.name,
		outputName,
		before: inputStats.size,
		after: outputStats.size,
	};
}

await ensureFolders();
const images = await getImages();

if (images.length === 0) {
	console.log("No encontre imagenes para optimizar.");
	console.log("Pon tus fotos en public/img/products/originals/ y ejecuta: npm run optimize-images");
	process.exit(0);
}

console.log(`Optimizando ${images.length} imagen(es)...`);

for (const image of images) {
	const result = await optimizeImage(image);
	console.log(`${result.inputName} -> optimized/${result.outputName} (${formatKb(result.before)} -> ${formatKb(result.after)})`);
}

console.log("Listo. Usa esos nombres en src/assets/products.json.");
