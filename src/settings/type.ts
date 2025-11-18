import { App, Menu, MenuItem } from 'obsidian';

export type EnhancedMenu = Menu & {
  dom: HTMLElement;
  items: EnhancedMenuItem[];
  setUseNativeMenu: (use: boolean) => void;
};

export type EnhancedMenuItem = MenuItem & {
  dom: HTMLElement;
  titleEl: HTMLDivElement;
  handleEvent(event: Event): void;
  disabled: boolean;
};

export type EnhancedApp = App & {
  customCss: {
    snippets: string[];
    getSnippetsFolder: () => string;
    getSnippetPath: (name: string) => string;
    enabledSnippets: { has: (name: string) => boolean };
    setCssEnabledStatus: (name: string, enabled: boolean) => void;
    requestLoadSnippets: () => void;
  };
  openWithDefaultApp: (path: string) => void;
};
