import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Text, TextType } from '../base';
import { Component } from '../base/Component';
import { Icon } from '../icon';
import styles from './PanelSectionHeader.module.css';

type Props = ComponentBaseProps & {
  title: string;
  icon: React.ReactElement;
};

export function PanelSectionHeader(props: Props) {
  return (
    <Component rootClassName={styles.root} {...props}>
      <div className={styles.content}>
        <Icon className={styles.icon} icon={props.icon} />
        <Text
          className={styles.title}
          type={TextType.Title}
          text={props.title}
        />
        <div className={styles.actions}>{props.children}</div>
      </div>
    </Component>
  );
}
