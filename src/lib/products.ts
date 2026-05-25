import products from "../assets/products.json";

export type Product = {
	name: string;
	description: string;
	category: "tech" | "kawaii";
	image?: string;
	images?: string[];
	badge?: "nuevo" | "popular" | "destacado";
	heroSection?: boolean;
	price?: number | string;
	oldPrice?: number | string;
	features?: string[];
	variants?: string[];
	idealFor?: string[];
	availabilityText?: string;
};

export type ProductWithSlug = Product & {
	slug: string;
	imagesList: string[];
};

const slugify = (value: string) =>
	value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

export const formatPrice = (price?: number | string) => {
	if (price === undefined || price === null || price === "") {
		return "Consultar precio";
	}

	if (typeof price === "number") {
		return `$${price.toFixed(2)}`;
	}

	const trimmedPrice = price.trim();
	return trimmedPrice.startsWith("$") ? trimmedPrice : `$${trimmedPrice}`;
};

export const getProductImages = (product: Product) => {
	const images = product.images ? product.images : product.image ? [product.image] : [];
	return images.map((image) => `/img/products/${image}`);
};

export const allProducts = (products as Product[]).map((product, index) => ({
	...product,
	slug: `${product.category}-${slugify(product.name)}-${index + 1}`,
	imagesList: getProductImages(product),
}));

export const getProductsByCategory = (category: Product["category"]) => allProducts.filter((product) => product.category === category);
