import React from 'react';
import { Row, Text, TextType } from '../../../components/base';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Bookmark } from '../models/Bookmark';
import { updateBookmark } from '../service';
import styles from './BookmarkRow.module.css';

type Props = ComponentBaseProps & {
  bookmark: Bookmark;
};

export function BookmarkRow({ bookmark, ...props }: Props) {
  return (
    <Row className={styles.root}>
      <div className={styles.iconContainer}>
        <img
          className={styles.icon}
          src={`https://www.google.com/s2/favicons?sz=64&domain=${bookmark.url}`}
          alt=""
        />
      </div>
      <div className={styles.textContainer}>
        <Text
          text={bookmark.title}
          editable={true}
          onEdit={(title) => updateBookmark(bookmark.id, { title })}
        />
        <Text text={bookmark.url} type={TextType.Secondary} />
      </div>
    </Row>
  );
}
