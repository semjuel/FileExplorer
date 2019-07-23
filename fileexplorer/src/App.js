import React from 'react';

import Layout from './components/Layout/Layout';
import MainView from './containers/MainView/MainView';

function App() {
  return (
    <div>
      <Layout>
        <MainView />
      </Layout>
    </div>
  );
}

export default App;
