import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import ContextUser from '../../components/store/context';
import Header from '../../components/Header';
import Challenges from '../../components/Challenges';
import User from '../../components/User';
import Modal from '../../components/Modal';
import Acceptances from '../../components/Acceptances';

function Profile() {
  const navigate = useNavigate();
  const [user] = useContext(ContextUser);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [acceptances, setAcceptances] = useState([]);
  const tgToken = new URLSearchParams(user).toString();
  console.log(tgToken);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/acceptances`, {
      headers: new Headers({
        'TG-AUTH': tgToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setAcceptances(json);
        if (!json.some((acceptance) => acceptance.status === 'in_progress')) {
          fetch(`${import.meta.env.VITE_API_URL}/api/challenges`, {
            headers: new Headers({
              'TG-AUTH': tgToken,
            }),
          })
            .then((response) => response.json())
            .then((res) => setChallenges(res));
        }
      });
  }, [selectedChallenge]);

  return (
    <div className="main-wrapper">
      {selectedChallenge ? (
        <Modal
          selectedChallenge={selectedChallenge}
          setSelectedChallenge={setSelectedChallenge}
        />
      ) : null}
      <Header />
      <User />
      {acceptances.some((acceptance) => acceptance.status === 'in_progress') ? (
        <Acceptances acceptances={acceptances} />
      ) : (
        <Challenges
          challenges={challenges}
          setSelectedChallenge={setSelectedChallenge}
        />
      )}
    </div>
  );
}

export default Profile;
