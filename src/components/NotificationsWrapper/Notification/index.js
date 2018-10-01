import React, { Component } from 'react';
import './notification-default.css';
import './notification-status.css';
// import './notification-position.css';

export class Notification extends Component {

  render() {
    const {title, text, status} = this.props;

    return (
      <div className={`notification notification--${status}`}>
        <div className="notification__body">
          <h3 className="notification__title">
            {title}
          </h3>
          <p className="notification__text">
            {text}
          </p>
        </div>
        <div className="notification__controls">
          <button className="notification__button-close">
            x
          </button>
        </div>
      </div>
    );
  }
}
