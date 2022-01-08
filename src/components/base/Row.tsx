import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Component } from './Component';
import styles from './Row.module.css';

type Props = ComponentBaseProps & {
  onClick?: () => void;
};

export function Row(props: Props) {
  return (
    <Component rootClassName={styles.root} {...props}>
      {props.children}
    </Component>
  );
}
