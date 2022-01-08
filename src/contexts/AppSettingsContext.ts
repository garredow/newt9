import React from 'react';
import { Settings } from '../models/Settings';

type AppSettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => Promise<void>;
};

export const defaultSettings: Settings = {
  showSettingHelpText: true,
};

const defaultValue: AppSettingsContextValue = {
  settings: defaultSettings,
  setSettings: () => Promise.resolve(),
};

export const AppSettingsContext =
  React.createContext<AppSettingsContextValue>(defaultValue);
