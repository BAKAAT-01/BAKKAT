const page = location.pathname.split("/").pop() || "index.html";
const isIndex = page === "index.html";

export const basePath = isIndex ? "pages/" : "";
export const homePath = isIndex ? "index.html" : "../index.html";
export const assetsPath = isIndex ? "./" : "../";
export { page };
