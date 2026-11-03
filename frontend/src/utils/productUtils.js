/**
 * Utility functions for clean, SEO-friendly product URLs and slugs.
 */

const BANGLA_VARIETY_MAP = {
  "হিমসাগর": "himshagar",
  "খিরসাপাত": "khirsapat",
  "আম্রপালি": "amrapali",
  "আম্রপালী": "amrapali",
  "গোপালভোগ": "gopalbhog",
  "ল্যাংড়া": "langra",
  "ল্যাংড়া": "langra",
  "ফজলি": "fazli",
  "কাটিমন": "katimon",
  "গৌরমতি": "gourmati",
  "গুটি": "guti",
  "হাড়িভাঙ্গা": "haribhanga",
  "হাড়িভাঙ্গা": "haribhanga",
  "বারি-৪": "bari-4",
  "বারি ৪": "bari-4",
  "সুরমা ফজলি": "surma-fazli",
  "আশ্বিনা": "ashwina",
  "মোহনভোগ": "mohanbhog",
  "রানীপছন্দ": "ranipasand",
};

/**
 * Returns a clean SEO-friendly slug for a product.
 * Example: "Himsagar" -> "himshagar"
 * Example: "আম্রপালি" -> "amrapali"
 */
export function getProductSlug(product) {
  if (!product) return "";

  // 1. If explicit slug exists, use it
  if (product.slug && typeof product.slug === "string" && product.slug.trim()) {
    return product.slug.trim().toLowerCase();
  }

  // 2. Derive from English name if available
  if (product.name_en && typeof product.name_en === "string" && product.name_en.trim()) {
    const enSlug = product.name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (enSlug) return enSlug;
  }

  // 3. Match from known mango names map
  const bnName = product.name_bn || product.name || "";
  for (const [bnKey, engSlug] of Object.entries(BANGLA_VARIETY_MAP)) {
    if (bnName.includes(bnKey)) {
      return engSlug;
    }
  }

  // 4. Fallback slugify
  const fallback = bnName
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return fallback || String(product._id || product.id || "product");
}

/**
 * Checks if a given URL param (slug or ID) matches a product.
 */
export function matchesProduct(product, slugOrId) {
  if (!product || !slugOrId) return false;
  const target = String(slugOrId).trim().toLowerCase();

  // Match explicit slug
  if (product.slug && product.slug.trim().toLowerCase() === target) {
    return true;
  }

  // Match generated clean slug
  if (getProductSlug(product) === target) {
    return true;
  }

  // Match Mongo _id or numeric id
  if (String(product._id) === target || String(product.id) === target) {
    return true;
  }

  // Match name_en slugified
  if (product.name_en) {
    const enSlug = product.name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (enSlug === target) return true;
  }

  // Match name_bn
  if (product.name_bn) {
    const bnSlug = product.name_bn
      .toLowerCase()
      .replace(/[^\w\u0980-\u09FF-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (bnSlug === target) return true;
  }

  return false;
}
