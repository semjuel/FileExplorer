import React, { Fragment } from 'react';
import Notifier from './components/Notifier/Notifier';
import Layout from './components/Layout/Layout';
import MainView from './containers/MainView/MainView';
import Modal from './components/Modal/Modal';

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
