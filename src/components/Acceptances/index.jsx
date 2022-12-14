import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import formatTime from '../helper/moment';
import Chart from '../Chart';

function Acceptances({ acceptances }) {
  const renderAcceptancesItem = (acceptance) => (
    <div key={acceptance.id} className="acceptances-item">
      <div className="acceptances-item__img">
        <span>{acceptance.emoji}</span>
      </div>
      <h4 className="title-h4 acceptances-item__title">{acceptance.name}</h4>
      <Chart notifications={acceptance.notifications} days={acceptance.days} />
      <p className="acceptances-item__txt">{acceptance.description}</p>
      <p className="acceptances-item__time">
        <FontAwesomeIcon
          className="acceptances-item__time-icon"
          icon={faBell}
        />
        {' '}
        at
        {' '}
        {formatTime(acceptance.notify_at)}
      </p>
    </div>
  );

  return (
    <section className="acceptances">
      <div className="container">
        <div className="acceptances-wrap">
          <h3 className="title-h3 acceptances-title">Active challenges</h3>
          <div className="acceptances-list">
            {acceptances
              .filter((acceptance) => acceptance.status === 'in_progress')
              .map(renderAcceptancesItem)}
          </div>
        </div>
      </div>
    </section>
  );
}

Acceptances.propTypes = {
  acceptances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    name: PropTypes.string,
    notify_at: PropTypes.string,
    description: PropTypes.string,
    emoji: PropTypes.string,
    days: PropTypes.number,
    notifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
    })),
  })).isRequired,
};

export default Acceptances;
