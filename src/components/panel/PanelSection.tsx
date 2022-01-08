import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Component } from '../base/Component';
import styles from './PanelSection.module.css';

type Props = ComponentBaseProps & {};

export function PanelSection(props: Props) {
  return (
    <Component rootClassName={styles.root} {...props}>
      {props.children}
    </Component>
  );
}
