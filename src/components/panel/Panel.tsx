import React, { useState } from 'react';
import { usePanelSettings } from '../../contexts/PanelProvider';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Component } from '../base/Component';
import { SettingConfigSection, SettingsDialog } from '../SettingsDialog';
import styles from './Panel.module.css';

type Props = ComponentBaseProps & {
  settings?: SettingConfigSection[];
};

export function Panel(props: Props) {
  const [showSettings, setShowSettings] = useState(false);

  const { settings, setSetting } = usePanelSettings<{ [key: string]: any }>();

  return (
    <Component rootClassName={styles.root} {...props}>
      {props.children}
      {showSettings && (
        <SettingsDialog
          title={`${settings.panelTitle} Settings`}
          width="medium"
          settings={props.settings ?? []}
          settingsValues={settings}
          onSettingChanged={setSetting}
          onClose={() => setShowSettings(false)}
          data-testid="dialog-panel-settings"
        />
      )}
    </Component>
  );
}
