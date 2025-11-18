import type MySnippetsPlugin from 'src/main';
import { Menu, ToggleComponent, ButtonComponent, Notice } from 'obsidian';
import { setAttributes } from 'src/util/setAttributes';
import { MySnippetsSettings } from 'src/settings/settingsData';
import CreateSnippetModal from 'src/modal/createSnippetModal';
import { EnhancedApp, EnhancedMenu, EnhancedMenuItem } from 'src/settings/type';

export default function snippetsMenu(
  app: EnhancedApp,
  plugin: MySnippetsPlugin,
  settings: MySnippetsSettings
) {
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;
  const menuExists = document.querySelector('.menu.MySnippets-statusbar-menu');

  if (!menuExists) {
    const menu = new Menu() as unknown as EnhancedMenu;

    const menuDom = (menu as EnhancedMenu).dom as HTMLElement;
    menuDom.addClass('MySnippets-statusbar-menu');

    if (settings.aestheticStyle) {
      menuDom.setAttribute(
        'style',
        'background-color: transparent; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);'
      );
    }
    const customCss = app.customCss;
    const currentSnippets = customCss.snippets;
    const snippetsFolder = customCss.getSnippetsFolder();

    currentSnippets.forEach((snippet: string) => {
      const snippetPath = customCss.getSnippetPath(snippet);
      menu.addItem((snippetElement: EnhancedMenuItem) => {
        snippetElement.setTitle(snippet);

        const snippetElementDom = (snippetElement as EnhancedMenuItem).dom as HTMLElement;
        const toggleComponent = new ToggleComponent(snippetElementDom);
        const buttonComponent = new ButtonComponent(snippetElementDom);

        function changeSnippetStatus() {
          const isEnabled = customCss.enabledSnippets.has(snippet);
          customCss.setCssEnabledStatus(snippet, !isEnabled);
        }

        toggleComponent
          .setValue(customCss.enabledSnippets.has(snippet))
          .onChange(changeSnippetStatus);

        buttonComponent
          .setIcon('ms-snippet')
          .setClass('MS-OpenSnippet')
          .setTooltip(`Open snippet`)

          .onClick((e: MouseEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.openWithDefaultApp(snippetPath);
          });

        snippetElement.onClick((e: MouseEvent) => {
          e.preventDefault();
          e.stopImmediatePropagation();
        });
      });
    });

    menu.addSeparator();

    menu.addItem((actions: EnhancedMenuItem) => {
      actions.setIcon(null);
      actions.setTitle('Actions');
      const actionsDom = (actions as EnhancedMenuItem).dom as HTMLElement;
      setAttributes(actions.titleEl, { style: 'font-weight: 700' });

      const reloadButton = new ButtonComponent(actionsDom);
      const folderButton = new ButtonComponent(actionsDom);
      const addButton = new ButtonComponent(actionsDom);

      setAttributes(reloadButton.buttonEl, { style: 'margin-right: 3px' });
      setAttributes(addButton.buttonEl, { style: 'margin-left: 3px' });

      reloadButton
        .setIcon('ms-reload')
        .setClass('MySnippetsButton')
        .setClass('MS-Reload')
        .setTooltip('Reload snippets')
        .onClick(() => {
          customCss.requestLoadSnippets();
          new Notice('Snippets reloaded');
        });
      folderButton
        .setIcon('ms-folder')
        .setClass('MySnippetsButton')
        .setClass('MS-Folder')
        .setTooltip('Open snippets folder')
        .onClick(() => {
          app.openWithDefaultApp(snippetsFolder);
        });
      addButton
        .setIcon('ms-add')
        .setClass('MySnippetsButton')
        .setClass('MS-Folder')
        .setTooltip('Create new snippet')
        .onClick(() => {
          new CreateSnippetModal(app, plugin).open();
        });
    });

    menu.showAtPosition({
      x: windowX - 15,
      y: windowY - 37,
    });
  }
}
