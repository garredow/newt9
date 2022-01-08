import React, { useContext, useState } from 'react';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import styles from './SettingsRow.module.css';

type SettingsRowProps = ComponentBaseProps & {
  label: string;
  helpText?: string;
};

export function SettingsRow(props: SettingsRowProps) {
  const [showHelpText, setShowHelpText] = useState(false);
  const { settings } = useContext(AppSettingsContext);

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.row}>
        <div
          className={styles.label}
          onClick={() => setShowHelpText(!showHelpText)}
        >
          {props.label}
        </div>
        {props.children}
      </div>
      {(showHelpText || settings.showSettingHelpText) && props.helpText ? (
        <div className={styles.helptext}>{props.helpText}</div>
      ) : null}
    </div>
  );
}
