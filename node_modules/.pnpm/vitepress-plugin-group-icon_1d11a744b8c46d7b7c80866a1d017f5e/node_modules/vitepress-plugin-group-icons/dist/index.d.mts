import Markdown from "markdown-it";
import { Plugin } from "vite";

//#region src/types.d.ts
interface ThemedIcon {
  dark: string;
  light: string;
}
type IconValue = string | ThemedIcon;
type Icon = Record<string, IconValue>;
interface Options {
  customIcon?: Icon;
  defaultLabels?: string[];
}
//#endregion
//#region src/builtin.d.ts
declare const builtinIcons: Icon;
//#endregion
//#region src/helper.d.ts
declare function localIconLoader(url: string, path: string): string;
//#endregion
//#region src/markdown.d.ts
interface MdPluginOptions {
  titleBar: {
    /**
     * Whether the title bar is included in the [Snippets](https://vitepress.dev/guide/markdown#import-code-snippets)
     *
     * @defaultValue false
     */
    includeSnippet?: boolean;
  };
}
declare function groupIconMdPlugin(md: Markdown, options?: MdPluginOptions): void;
//#endregion
//#region src/vite.d.ts
declare function groupIconVitePlugin(options?: Options): Plugin;
//#endregion
export { builtinIcons, groupIconMdPlugin, groupIconVitePlugin, localIconLoader };