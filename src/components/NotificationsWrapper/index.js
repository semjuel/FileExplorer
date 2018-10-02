import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notifications-wrapper-default.css';
import './notifications-wrapper-position.css';

import { Notification } from './Notification'; 

export class NotificationsWrapper extends Component {
  render() {

    const {align} = this.props;

    return (
      <div className={`notifications-wrapper notifications-wrapper--${align}`}>
        <Notification 
          title="You doing great!"
          text="And this is my text message"
          status="default"
        />
        <Notification 
          title="Success!"
          text="Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
          position="top-right"
          status="success"
        />
        <Notification 
          title="Warning!"
          text="And this is my text message"
          status="warning"
        />
        <Notification 
          title="Error!"
          text="And this is my text message"
          status="error"
        />
      </div>
    );
  }
}

NotificationsWrapper.propTypes = {
  align: PropTypes.string
}
NotificationsWrapper.defaultProps = {
  align: 'top-right'
}
