import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Chart from '../../components/Chart';
import formatTime from '../../components/helper/moment';

import ContextUser from '../../components/store/context';

function Webapp() {
  const [acceptances, setAcceptances] = useState([]);

  const [user] = useContext(ContextUser);
  const tgToken = new URLSearchParams(user).toString();
  // console.log(tgToken);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/acceptances`, {
      headers: new Headers({
        // 'init-data': window.Telegram.WebApp.initData,
        'TG-AUTH': tgToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAcceptances(json);
      });
  }, []);

  const renderAcceptancesItem = (acceptance) => (
    <div key={acceptance.id} className="acceptances-item" style={{ borderRadius: '0' }}>
      <div className="acceptances-item__img">
        <span style={{ fontSize: '30px', lineHeight: '32px' }}>{acceptance.emoji}</span>
      </div>
      <h4 className="title-h4 acceptances-item__title" style={{ fontSize: '30px' }}>{acceptance.name}</h4>
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
    <div className="bg-midnight" style={{ height: '100vh' }}>
      {acceptances
        .filter((acceptance) => acceptance.status === 'in_progress')
        .map(renderAcceptancesItem)}
    </div>
  );
}

export default Webapp;
