import React, { Component } from 'react';
import './styles.scss';

export class FilelistNavbar extends Component {
  render () {
    return (
      <ul className="test-list">
        <li className="test-li-item">
          <div className="test-li-item__inner-wrapper">
            <i>i</i>
            <p>Some_long_name_3-Longfilename.pdf</p>
            <span>+</span>
          </div>

          <ul>
            <li className="test-li-item">
              <div className="test-li-item__inner-wrapper">
                <i>i</i>
                <p>Supercalifragilisticexpialidocious</p>
                <span>+</span>
              </div>

              <ul>
                <li className="test-li-item">
                  <div className="test-li-item__inner-wrapper">
                    <i>i</i>
                    <p>Supercalifragilisticexpialidocious</p>
                    <span>+</span>
                  </div>

                  <ul>
                    <li className="test-li-item">
                      <div className="test-li-item__inner-wrapper">
                        <i>i</i>
                        <p>Supercalifragilisticexpialidocious</p>
                        <span>+</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>

            </li>
          </ul>
        </li>
        <li className="test-li-item">
          <div className="test-li-item__inner-wrapper">
            <i>i</i>
            <p>Music</p>
            <span>+</span>
          </div>
        </li>
        <li className="test-li-item">
          <div className="test-li-item__inner-wrapper">
            <i>i</i>
            <p>Porno</p>
            <span>+</span>
          </div>
        </li>
        <li className="test-li-item">
          <div className="test-li-item__inner-wrapper">
            <i>i</i>
            <p>PHPvsJS</p>
            <span>+</span>
          </div>
        </li>
      </ul>
    );
  }
}