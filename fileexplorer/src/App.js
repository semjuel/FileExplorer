import React, { Fragment } from 'react';

import Layout from './containers/Layout/Layout';
import MainView from './components/MainView/MainView';
import Modal from './components/Modal/Modal';
import Notifier from './components/Notifier/Notifier';

const App = () => {
  return (
      <Fragment>
          <Notifier />

          <Modal />

          <Layout>
            <MainView />
          </Layout>
    </Fragment>
  );
};

export default App;
