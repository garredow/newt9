import React from 'react';
import { BookmarksPanelWrapper } from '../modules/bookmarks/BookmarksPanel';
import styles from './Dashboard.module.css';

type Props = {};

export function Dashboard(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <BookmarksPanelWrapper />
      </div>
    </div>
  );
}
