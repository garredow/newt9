export type PanelSettings<TCustomSettings = {}> = {
  panelId: string;
  panelTitle: string;
} & TCustomSettings;
