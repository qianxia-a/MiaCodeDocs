import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { encodeSvgForCss, getIconData, iconToHTML, iconToSVG } from "@iconify/utils";

//#region src/builtin.ts
const builtinIcons = {
	"pnpm": {
		dark: "vscode-icons:file-type-pnpm",
		light: "vscode-icons:file-type-light-pnpm"
	},
	"npm": "vscode-icons:file-type-npm",
	"yarn": "vscode-icons:file-type-yarn",
	"bun": "vscode-icons:file-type-bun",
	"deno": "vscode-icons:file-type-deno",
	"vue": "vscode-icons:file-type-vue",
	"svelte": "vscode-icons:file-type-svelte",
	"angular": "vscode-icons:file-type-angular",
	"react": "vscode-icons:file-type-reactjs",
	"solid": "logos:solidjs-icon",
	"marko": "vscode-icons:file-type-marko",
	"next": {
		dark: "vscode-icons:file-type-next",
		light: "vscode-icons:file-type-light-next"
	},
	"nuxt": "vscode-icons:file-type-nuxt",
	"astro": {
		dark: "vscode-icons:file-type-astro",
		light: "vscode-icons:file-type-light-astro"
	},
	"qwik": "logos:qwik-icon",
	"ember": "vscode-icons:file-type-ember",
	"vitest": {
		dark: "vscode-icons:file-type-vitest",
		light: "vscode-icons:file-type-light-vitest"
	},
	"rollup": "vscode-icons:file-type-rollup",
	"webpack": "vscode-icons:file-type-webpack",
	"vite": {
		dark: "vscode-icons:file-type-vite",
		light: "vscode-icons:file-type-light-vite"
	},
	"esbuild": "vscode-icons:file-type-esbuild",
	"rolldown": {
		dark: "vscode-icons:file-type-rolldown",
		light: "vscode-icons:file-type-light-rolldown"
	},
	"package.json": "vscode-icons:file-type-node",
	"tsconfig.json": "vscode-icons:file-type-tsconfig",
	".npmrc": "vscode-icons:file-type-npm",
	".editorconfig": "vscode-icons:file-type-editorconfig",
	".eslintrc": "vscode-icons:file-type-eslint",
	".eslintignore": "vscode-icons:file-type-eslint",
	"eslint.config": "vscode-icons:file-type-eslint",
	".gitignore": "vscode-icons:file-type-git",
	".gitattributes": "vscode-icons:file-type-git",
	".env": "vscode-icons:file-type-dotenv",
	".env.example": "vscode-icons:file-type-dotenv",
	".vscode": "vscode-icons:file-type-vscode",
	"tailwind.config": "vscode-icons:file-type-tailwind",
	"uno.config": "vscode-icons:file-type-unocss",
	"unocss.config": "vscode-icons:file-type-unocss",
	"vue.config": "vscode-icons:file-type-vueconfig",
	".mts": "vscode-icons:file-type-typescript",
	".cts": "vscode-icons:file-type-typescript",
	".ts": "vscode-icons:file-type-typescript",
	".tsx": "vscode-icons:file-type-typescript",
	".mjs": "vscode-icons:file-type-js",
	".cjs": "vscode-icons:file-type-js",
	".json": "vscode-icons:file-type-json",
	".js": "vscode-icons:file-type-js",
	".jsx": "vscode-icons:file-type-js",
	".md": "vscode-icons:file-type-markdown",
	".py": "vscode-icons:file-type-python",
	".ico": "vscode-icons:file-type-favicon",
	".html": "vscode-icons:file-type-html",
	".css": "vscode-icons:file-type-css",
	".scss": "vscode-icons:file-type-scss",
	".yml": {
		dark: "vscode-icons:file-type-yaml",
		light: "vscode-icons:file-type-light-yaml"
	},
	".yaml": {
		dark: "vscode-icons:file-type-yaml",
		light: "vscode-icons:file-type-light-yaml"
	},
	".php": "vscode-icons:file-type-php",
	".gjs": "vscode-icons:file-type-glimmer",
	".gts": "vscode-icons:file-type-glimmer",
	"oxlint": {
		dark: "vscode-icons:file-type-oxc",
		light: "vscode-icons:file-type-light-oxc"
	},
	"oxc": {
		dark: "vscode-icons:file-type-oxc",
		light: "vscode-icons:file-type-light-oxc"
	},
	"oxfmt": {
		dark: "vscode-icons:file-type-oxc",
		light: "vscode-icons:file-type-light-oxc"
	}
};

//#endregion
//#region src/helper.ts
function localIconLoader(url, path) {
	return readFileSync(resolve(dirname(fileURLToPath(url)), path), "utf-8");
}

//#endregion
//#region src/utils.ts
function isSetEqual(set1, set2) {
	try {
		if (set1.size !== set2.size) return false;
		for (const item of set1) if (!set2.has(item)) return false;
		return true;
	} catch {
		return false;
	}
}
const namedIconMatchRegex = /\s~([^~]+)~/;

//#endregion
//#region src/markdown.ts
function groupIconMdPlugin(md, options) {
	const _options = options || { titleBar: { includeSnippet: false } };
	const labelRE = /<label\b(?![^>]+\bdata-title\b)[^>]*>(.*?)<\/label>/g;
	const codeGroupOpenRule = md.renderer.rules["container_code-group_open"];
	if (codeGroupOpenRule) md.renderer.rules["container_code-group_open"] = (...args) => {
		return codeGroupOpenRule(...args).replace(labelRE, (match, label) => `<label data-title="${md.utils.escapeHtml(label)}"${match.slice(6)}`);
	};
	const namedIconLabelMatchRegex = /(<label[^>]*>)(.*?)(~[^~]+~)(.*?)(<\/label>)/g;
	md.renderer.rules["container_code-group_open"] = (...args) => {
		return codeGroupOpenRule(...args).replace(namedIconLabelMatchRegex, (_, labelStart, beforeIcon, _icon, afterIcon, labelEnd) => {
			return `${labelStart}${beforeIcon.trim()}${afterIcon}${labelEnd}`;
		});
	};
	const fenceRule = md.renderer.rules.fence;
	if (fenceRule) md.renderer.rules.fence = (...args) => {
		const [tokens, idx] = args;
		const token = tokens[idx];
		let isOnCodeGroup = false;
		for (let i = idx - 1; i >= 0; i--) {
			if (tokens[i].type === "container_code-group_open") {
				isOnCodeGroup = true;
				break;
			}
			if (tokens[i].type === "container_code-group_close") break;
		}
		const title = token.info.match(/\[((?:[^[\]]|\[[^[\]]*\])*)\]/);
		const isIncludedSnippet = _options.titleBar.includeSnippet;
		if (!isOnCodeGroup && title && (!token.src || isIncludedSnippet)) {
			const namedIconMatch = title[1].match(namedIconMatchRegex);
			return `<div class="vp-code-block-title">
      <div class="vp-code-block-title-bar">
          <span class="vp-code-block-title-text" data-title="${md.utils.escapeHtml(title[1])}">${namedIconMatch ? title[1].replace(namedIconMatch[0], "") : title[1]}</span>
      </div>
        ${fenceRule(...args)}
      </div>
      `;
		}
		return fenceRule(...args);
	};
}

//#endregion
//#region src/codegen.ts
async function generateCSS(labels, options) {
	const baseCSS = `
.vp-code-block-title [data-title]::before,
.vp-code-group [data-title]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  margin-bottom: -0.2em;
  background: var(--icon) no-repeat center / contain;
}

.vp-code-block-title-bar {
  position: relative;
  margin: 16px -24px 0 -24px;
  background-color: var(--vp-code-block-bg);
  overflow-x: auto;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-code-tab-text-color);
  white-space: nowrap;
  transition: background-color 0.5s;
  border-radius: 8px 8px 0 0;
  padding:0 12px;
  box-shadow: inset 0 -1px var(--vp-code-tab-divider);
}

.custom-block .vp-code-block-title-bar {
  margin: 16px 0 0 0;
}

@media (min-width: 640px) {
  .vp-code-block-title-bar {
    margin: 16px 0 0 0;
  }
}

.vp-code-block-title-text {
  padding: 0 12px;
  line-height: 48px;
}


.vp-code-block-title div[class*=language-] {
  margin-top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
`;
	const mergedIcons = {
		...builtinIcons,
		...options.customIcon
	};
	return { css: baseCSS + await generateIconCSS(getMatchedLabels(new Set([...labels, ...options.defaultLabels || []]), mergedIcons)) };
}
function iconKey(icon) {
	return typeof icon === "string" ? `s:${icon}` : `o:${JSON.stringify(icon)}`;
}
function getMatchedLabels(labels, icons) {
	const matched = /* @__PURE__ */ new Map();
	const sortedKeys = Object.keys(icons).sort((a, b) => b.length - a.length);
	const add = (icon, label) => {
		const key = iconKey(icon);
		const current = matched.get(key);
		if (current) current.labels.push(label);
		else matched.set(key, {
			icon,
			labels: [label]
		});
	};
	for (const label of labels) {
		const namedIconMatch = label.match(namedIconMatchRegex);
		if (namedIconMatch) {
			const [_, namedIcon] = namedIconMatch;
			add(namedIcon, label);
		} else {
			const key = sortedKeys.find((k) => label?.toLowerCase().includes(k));
			if (key) add(icons[key], label);
		}
	}
	return Array.from(matched.values());
}
function prefixSelectors(prefix, selectors) {
	return selectors.map((s) => `${prefix} ${s}`).join(",");
}
async function generateIconCSS(matched) {
	return (await Promise.all(matched.map(async ({ icon, labels }) => {
		const selectors = labels.map((label) => `[data-title='${label}']::before`);
		if (typeof icon === "string") {
			if (!icon) return "";
			const svg = await getSVG(icon);
			return `
${selectors.join(",")} {
  content: '';
  --icon: url("data:image/svg+xml,${svg}");
}`;
		}
		const output = [];
		if (icon.light) {
			const svg = await getSVG(icon.light);
			const selector = prefixSelectors("", selectors);
			output.push(`
${selector} {
  content: '';
  --icon: url("data:image/svg+xml,${svg}");
}`);
		}
		if (icon.dark) {
			const svg = await getSVG(icon.dark);
			const selector = prefixSelectors("html.dark", selectors);
			output.push(`
${selector} {
  content: '';
  --icon: url("data:image/svg+xml,${svg}");
}`);
		}
		return output.join("");
	}))).sort().join("");
}
async function getSVG(icon) {
	if (!icon) return "";
	if (icon.startsWith("<svg")) return encodeSvgForCss(icon);
	if (/^https?:\/\//.test(icon)) try {
		return encodeSvgForCss(await (await fetch(icon)).text());
	} catch {
		console.warn(`[vitepress-plugin-group-icons]: Failed to fetch icon: ${icon}`);
		return "";
	}
	const [collection, iconName] = icon.split(":");
	try {
		const { icons } = createRequire(import.meta.url)(`@iconify-json/${collection}`);
		const iconData = getIconData(icons, iconName);
		if (iconData) {
			const { attributes, body } = iconToSVG(iconData);
			return encodeSvgForCss(iconToHTML(body, attributes));
		}
		return "";
	} catch {
		console.warn(`[vitepress-plugin-group-icons]: Icon set \`${collection}\` not found. Please install \`@iconify-json/${collection}\` first`);
		return "";
	}
}

//#endregion
//#region src/vite.ts
function groupIconVitePlugin(options) {
	const virtualCssId = "virtual:group-icons.css";
	const resolvedVirtualCssId = `\0${virtualCssId}`;
	const combinedRegex = /\bdata-title=\\"([^"]*)\\"|\bdata-title="([^"]*)"|"data-title":\s*"([^"]*)"/g;
	const matches = /* @__PURE__ */ new Set();
	let oldMatches;
	let server;
	options = options || { customIcon: {} };
	function handleUpdateModule() {
		const mod = server?.moduleGraph.getModuleById(resolvedVirtualCssId);
		if (mod) {
			server.moduleGraph.invalidateModule(mod);
			server.reloadModule(mod);
		}
	}
	return {
		name: "vitepress-plugin-group-icons",
		enforce: "post",
		resolveId(id) {
			if (id === virtualCssId) return resolvedVirtualCssId;
		},
		configureServer(_server) {
			server = _server;
		},
		async load(id) {
			if (id === resolvedVirtualCssId) {
				const { css } = await generateCSS(matches, options);
				oldMatches = new Set(matches);
				return css;
			}
		},
		transform: {
			filter: { id: /\.(md|md\?vue|md\?v=)$/ },
			handler(code) {
				while (true) {
					const match = combinedRegex.exec(code);
					if (!match) break;
					matches.add(match[1] || match[2] || match[3]);
				}
				if (!isSetEqual(matches, oldMatches)) handleUpdateModule();
			}
		}
	};
}

//#endregion
export { builtinIcons, groupIconMdPlugin, groupIconVitePlugin, localIconLoader };