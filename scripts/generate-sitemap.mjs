import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://asaa-soluciones.netlify.app";
const productsPath = path.join(process.cwd(), "src", "assets", "products.json");
const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

const slugify = (value) =>
	value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const today = new Date().toISOString().slice(0, 10);
const products = JSON.parse(await fs.readFile(productsPath, "utf8"));

const urls = [
	{ loc: "/", changefreq: "weekly", priority: "1.0" },
	{ loc: "/tech", changefreq: "daily", priority: "0.9" },
	{ loc: "/kawaii", changefreq: "daily", priority: "0.9" },
	...products.map((product, index) => ({
		loc: `/productos/${product.category}-${slugify(product.name)}-${index + 1}`,
		changefreq: "weekly",
		priority: product.heroSection ? "0.8" : "0.7",
	})),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>
`;

await fs.writeFile(sitemapPath, xml);
console.log(`Sitemap generado con ${urls.length} URLs.`);
