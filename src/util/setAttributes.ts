export function setAttributes(element: HTMLElement, attributes: Record<string, string>) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
