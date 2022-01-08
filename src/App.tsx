import '@reach/dialog/styles.css';
import React from 'react';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { useAppSettings } from './contexts/AppSettingsProvider';
import { Dashboard } from './routes/Dashboard';

function App() {
  const { settings } = useAppSettings();
  console.log('settings', settings);

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <div className={styles.root}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="*">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
        {/* <Sidebar /> */}
      </div>
    </MemoryRouter>
  );
}

export default App;
