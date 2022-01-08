import React, { createContext, useContext, useEffect, useState } from 'react';
import { PanelSettings } from '../models/PanelSettings';
import { getItem, setItem } from '../utilities/storage';

type PanelContextValue<TSettings> = {
  settings: PanelSettings<TSettings>;
  setSettings: (value: Partial<PanelSettings<TSettings>>) => void;
  setSetting: (key: keyof PanelSettings<TSettings>, val: any) => void;
};

const PanelContext = createContext<PanelContextValue<any>>({
  settings: {} as any,
  setSettings: (settings) => console.log('default', settings),
  setSetting: (settingsKey) => console.log('default', settingsKey),
});

type Props<TSettings> = {
  children?: React.ReactNode;
  defaultSettings: PanelSettings<TSettings>;
};

export function PanelProvider<TSettings>(props: Props<TSettings>): JSX.Element {
  const [settings, setSettingsInternal] = useState<PanelSettings<TSettings>>(
    props.defaultSettings
  );

  useEffect(() => {
    getItem<PanelSettings<TSettings>>(
      `panel_${props.defaultSettings.panelId}`
    ).then((stored) =>
      setSettingsInternal({ ...props.defaultSettings, ...stored })
    );
  }, []);

  async function setSettings(val: Partial<TSettings>): Promise<void> {
    console.log('save to', `panel_${settings.panelId}`, {
      ...settings,
      ...val,
    });

    await setItem<TSettings>(`panel_${settings.panelId}`, {
      ...settings,
      ...val,
    });
    setSettingsInternal({ ...settings, ...val });
  }

  async function setSetting(key: keyof TSettings, val: any): Promise<void> {
    await setSettings({
      ...settings,
      [key]: val,
    });
  }

  return (
    <PanelContext.Provider
      value={{
        settings,
        setSettings,
        setSetting: setSetting as any, // TODO: What's up with this?
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}

export function usePanelSettings<TSettings>(): PanelContextValue<TSettings> {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanels must be used within a PanelSettingsProvider');
  }
  return context;
}
