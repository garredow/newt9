import React, { useRef, useState } from 'react';
import { Component } from '.';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './Text.module.css';

export enum TextType {
  Display = 'display',
  Title = 'title',
  Subtitle = 'subtitle',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Caption = 'caption',
}

export enum TextColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Warning = 'warning',
  Danger = 'danger',
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

type Props = ComponentBaseProps & {
  text?: string;
  type?: TextType;
  color?: TextColor;
  align?: TextAlign;
  wrap?: boolean;
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (newText: string) => void;
  onClick?: () => void;
};

export function Text({ type = TextType.Primary, ...props }: Props) {
  const [editing, setEditing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Component
      ref={ref}
      rootClassName={joinClasses(
        styles.root,
        styles[`type-${type}`],
        ifClass(!!props.color, styles[`color-${props.color}`]),
        ifClass(!!props.align, styles[`align-${props.align}`]),
        ifClass(!!props.editable, styles.editable),
        ifClass(!!props.wrap, styles.wrap)
      )}
      contentEditable={props.editable && editing}
      suppressContentEditableWarning={true}
      spellCheck={false}
      onClick={(ev) => {
        if (editing) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          props.onClick?.();
        }
      }}
      onContextMenu={(ev) => {
        if (!props.editable) return;
        ev.preventDefault();
        setEditing(true);
        setTimeout(() => {
          ref.current?.focus();
        }, 100);
      }}
      onKeyDown={(ev) => {
        switch (ev.key) {
          case 'Enter':
            props.onEdit?.((ev.target as HTMLDivElement).textContent || '');
            setEditing(false);
            break;
          case 'Escape':
            ref.current!.textContent = props.text || '';
            setEditing(false);
        }
      }}
      onBlur={(ev) => {
        props.onEdit?.((ev.target as HTMLDivElement).textContent || '');
        setEditing(false);
      }}
      {...props}
    >
      {props.text}
    </Component>
  );
}
