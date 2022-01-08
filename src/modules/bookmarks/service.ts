import { Bookmark } from './models/Bookmark';

export async function getBookmarksByFolder(
  folderId: string
): Promise<Bookmark[]> {
  const bookmarks = await chrome.bookmarks.getSubTree(folderId);
  return bookmarks[0].children || [];
}

export async function getAllBookmarks() {
  const result = await chrome.bookmarks.getTree();
  return result[0].children || [];
}

export function getRecentBookmarks(count = 20) {
  return chrome.bookmarks.getRecent(count);
}

export function updateBookmark(id: string, changes: Partial<Bookmark>) {
  return chrome.bookmarks.update(id, changes);
}

export function switchToTab(windowId: number, tabId: number) {
  chrome.windows.update(windowId, { focused: true });
  chrome.tabs.update(tabId, { active: true });
  window.close();
}

export enum OpenSiteOption {
  SameTab = 'sameTab',
  NewTab = 'newTab',
  NewBackgroundTab = 'newBackgroundTab',
}
export function openUrl(url: string, option = OpenSiteOption.SameTab) {
  switch (option) {
    case OpenSiteOption.SameTab:
      chrome.tabs.update({ url });
      break;
    case OpenSiteOption.NewTab:
      chrome.tabs.create({ url, active: true });
      break;
    case OpenSiteOption.NewBackgroundTab:
      chrome.tabs.create({ url, active: false });
      break;
  }
}
