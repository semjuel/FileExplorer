import React from 'react';
import { SnackbarProvider } from 'notistack';

import Layout from './components/Layout/Layout';
import MainView from './containers/MainView/MainView';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <MainView />
      </Layout>
    </SnackbarProvider>
  );
}

export default App;
