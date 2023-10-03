const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Normalize characters to decomposed form (remove accents)
    .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export default {
  slugify,
};
