import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notification-default.scss';
import './notification-status.scss';

type Props = {
  title: string,
  text: string,
  status: string
}

export class Notification extends Component<Props> {

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

Notification.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.string
}

Notification.defaultProps = {
  title: 'Hello',
  text: 'Ops! Something happened.',
  status: 'default'
}
