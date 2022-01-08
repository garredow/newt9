import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import { Component } from '../base';
import styles from './PanelContent.module.css';

type PanelContentProps = ComponentBaseProps & {
  columns?: number;
};

export function PanelContent(props: PanelContentProps) {
  return (
    <Component rootClassName={joinClasses(styles.root)} {...props}>
      {props.children}
    </Component>
  );
}
