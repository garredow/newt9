import React from 'react';
import { MdFolderOpen } from 'react-icons/md';
import { Row } from '../../../components/base';
import { Dialog } from '../../../components/dialog/Dialog';
import { Icon } from '../../../components/icon';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Bookmark } from '../models/Bookmark';
import styles from './ChooseFolderDialog.module.css';

type Props = ComponentBaseProps & {
  bookmarks: Bookmark[];
  onSelect: (folderId: string) => void;
  onClose: () => void;
};

export function ChooseFolderDialog(props: Props) {
  return (
    <Dialog title="Choose a folder" width="medium" onClose={props.onClose}>
      {props.bookmarks
        ?.filter((a) => !!a.children)
        .map((a) => (
          <FolderRow
            key={a.id}
            bookmark={a}
            level={0}
            onClick={props.onSelect}
          />
        ))}
    </Dialog>
  );
}

type FolderRowProps = {
  bookmark: Bookmark;
  level: number;
  onClick: (id: string) => void;
};
function FolderRow({ bookmark, ...props }: FolderRowProps) {
  return (
    <>
      <Row
        className={styles.rowRoot}
        style={{ marginLeft: `${props.level * 25}px` }}
        onClick={() => props.onClick(bookmark.id)}
      >
        <Icon icon={<MdFolderOpen />} /> {bookmark.title}
      </Row>
      {bookmark.children
        ?.filter((a) => !!a.children)
        .map((a) => (
          <FolderRow
            key={a.id}
            bookmark={a}
            level={props.level + 1}
            onClick={props.onClick}
          />
        ))}
    </>
  );
}
