import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Text, TextType } from '../base';
import { Component } from '../base/Component';
import styles from './PanelHeader.module.css';

type Props = ComponentBaseProps & {
  title: string;
};

export function PanelHeader(props: Props) {
  return (
    <Component rootClassName={styles.root} {...props}>
      <Text type={TextType.Display} text={props.title} />
    </Component>
  );
}
