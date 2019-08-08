import React, { Fragment } from 'react';
import Notifier from './components/Notifier/Notifier';
import Layout from './components/Layout/Layout';
import MainView from './containers/MainView/MainView';

const App = () => {
  return (
      <Fragment>
          <Notifier />
          <Layout>
            <MainView />
          </Layout>
    </Fragment>
  );
};

export default App;
