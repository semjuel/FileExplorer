import React, { Fragment } from 'react';
import { SnackbarProvider } from 'notistack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifier from './components/Notifier/Notifier';
import { enqueueSnackbar, closeSnackbar } from './actions';

import Layout from './components/Layout/Layout';
import MainView from './containers/MainView/MainView';

function App() {
  return (
      <Fragment>
          <Notifier />
          <Layout>
            <MainView />
          </Layout>
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
}, dispatch);


export default connect(null, mapDispatchToProps)(App);
