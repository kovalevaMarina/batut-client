import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import bicycle from '../../assets/img/bicycle.svg';
import WaveFirst from '../WaveFirst';

function WhatChallenges({ aboutRef }) {
  return (
    <>
      <WaveFirst />
      <section className="what-challenges" id="about" ref={aboutRef}>
        <div className="container-large">
          <div className="what-challenges__wrap">
            <div className="what-challenges__img" data-aos="zoom-in-right">
              <img src={bicycle} alt="bicycle" />
            </div>
            <ul className="what-challenges__list" data-aos="zoom-in-left">
              <h3 className="what-challenges__title">
                What&apos;s your challenges?
              </h3>
              <li className="what-challenges__list-item">Read it. Swim it.</li>
              <li className="what-challenges__list-item">
                Run it. Go to the gym.
              </li>
              <li className="what-challenges__list-item">
                Study it. Meditate.
              </li>
              <li className="what-challenges__list-item">
                Get up early. Walk it.
              </li>
              <li className="what-challenges__list-item">
                Limit social media. Cycle it.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

WhatChallenges.propTypes = {
  aboutRef: PropTypes.shape(
    { current: PropTypes.instanceOf(Element) },
  ),
};

WhatChallenges.defaultProps = {
  aboutRef: null,
};

export default WhatChallenges;
