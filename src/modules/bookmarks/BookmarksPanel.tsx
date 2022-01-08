import React, { useEffect, useState } from 'react';
import { MdAccessTime, MdFavoriteBorder, MdModeEdit } from 'react-icons/md';
import { Text, TextAlign, TextType } from '../../components/base';
import { Button, IconButton } from '../../components/button';
import {
  Panel,
  PanelContent,
  PanelSection,
  PanelSectionHeader,
} from '../../components/panel';
import { PanelHeader } from '../../components/panel/PanelHeader';
import { PanelProvider, usePanelSettings } from '../../contexts/PanelProvider';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelSettings } from '../../models/PanelSettings';
import styles from './BookmarksPanel.module.css';
import { BookmarkRow } from './components/BookmarkRow';
import { ChooseFolderDialog } from './components/ChooseFolderDialog';
import { Bookmark } from './models/Bookmark';
import {
  getAllBookmarks,
  getBookmarksByFolder,
  getRecentBookmarks,
} from './service';

type BookmarksPanelSettings = PanelSettings<{
  favoritesFolderId?: string;
}>;

type Props = ComponentBaseProps & {};

function BookmarksPanel(props: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [favorites, setFavorites] = useState<Bookmark[]>([]);
  const [recents, setRecents] = useState<Bookmark[]>([]);

  const { settings, setSetting } = usePanelSettings<BookmarksPanelSettings>();

  useEffect(() => {
    getAllBookmarks().then(setBookmarks);
    getRecentBookmarks().then(setRecents);
  }, []);

  useEffect(() => {
    if (!settings.favoritesFolderId) return setFavorites([]);
    getBookmarksByFolder(settings.favoritesFolderId).then(setFavorites);
  }, [settings.favoritesFolderId]);

  return (
    <>
      <Panel>
        <PanelHeader title={settings.panelTitle}></PanelHeader>
        <PanelContent>
          <PanelSection>
            <PanelSectionHeader title="Favorites" icon={<MdFavoriteBorder />}>
              <IconButton
                icon={<MdModeEdit />}
                size={28}
                title="Change folder"
                onClick={() => setShowDialog(true)}
              />
            </PanelSectionHeader>
            {favorites.length === 0 && (
              <div className={styles.emptyMessage}>
                <Text
                  text="No folders found. Would you like to choose a new folder?"
                  align={TextAlign.Center}
                />
                <Button
                  text="Choose new folder"
                  onClick={() => setShowDialog(true)}
                />
              </div>
            )}
            {favorites.map((folder) => (
              <div key={folder.id} className={styles.folder}>
                <Text
                  className={styles.folderTitle}
                  type={TextType.Subtitle}
                  text={folder.title}
                />
                <div className={styles.bookmarks}>
                  {folder.children?.map((bookmark) => (
                    <BookmarkRow key={bookmark.id} bookmark={bookmark} />
                  ))}
                </div>
              </div>
            ))}
          </PanelSection>
          <PanelSection>
            <PanelSectionHeader
              title="Recently Added"
              icon={<MdAccessTime />}
            />
            {recents?.map((bookmark) => (
              <BookmarkRow key={bookmark.id} bookmark={bookmark} />
            ))}
          </PanelSection>
        </PanelContent>
      </Panel>
      {showDialog && (
        <ChooseFolderDialog
          bookmarks={bookmarks}
          onSelect={(id) => {
            setSetting('favoritesFolderId', id);
            setShowDialog(false);
          }}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
}

export function BookmarksPanelWrapper(props: Props) {
  const defaultSettings: BookmarksPanelSettings = {
    panelId: 'bookmarks',
    panelTitle: 'Bookmarks',
    favoritesFolderId: undefined,
  };

  return (
    <PanelProvider defaultSettings={defaultSettings}>
      <BookmarksPanel {...props} />
    </PanelProvider>
  );
}
