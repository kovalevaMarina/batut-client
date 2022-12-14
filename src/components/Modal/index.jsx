import './style.scss';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextUser from '../store/context';

function Modal({ selectedChallenge, setSelectedChallenge }) {
  const [user] = useContext(ContextUser);
  const tgToken = new URLSearchParams(user).toString();

  const handleCancel = () => {
    setSelectedChallenge(null);
  };

  const handleAccept = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/challenges/${
        selectedChallenge.id
      }/acceptances`,
      {
        method: 'POST',
        headers: new Headers({
          'TG-AUTH': tgToken,
        }),
      },
    )
      .then((res) => res.json())
      .then(() => {
        setSelectedChallenge(null);
      });
  };

  return (
    <div className="fixed-overlay fixed-overlay__modal">
      <section className="modal">
        <div className="modal_container">
          <h3 className="title-h3 modal-title">Confirmation</h3>
          <p className="modal-txt">
            Are you sure you want to accept
            {' '}
            <span style={{ fontWeight: '700' }}>
              {selectedChallenge.name.toLowerCase()}
            </span>
            {' '}
            challenge?
          </p>
          <p className="modal-txt">
            You will receive notifications for
            {' '}
            {selectedChallenge.days}
            {' '}
            days at
            {' '}
            {selectedChallenge.notify_at}
            .
          </p>
        </div>
        <div className="modal-buttons">
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-accept" onClick={handleAccept}>
            Yes, I accept it!
          </button>
        </div>
      </section>
    </div>
  );
}

Modal.propTypes = {
  selectedChallenge: PropTypes.shape({
    id: PropTypes.number,
    days: PropTypes.number,
    notify_at: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setSelectedChallenge: PropTypes.func.isRequired,
};

export default Modal;
