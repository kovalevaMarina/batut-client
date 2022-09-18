import "./style.scss";
import bicycle from "../../assets/img/bicycle.svg";
import Wave from "../Wave";

function WhatChallenges() {
  return (
    <>
      <Wave />
      <section className="what-challenges">
        <div className="container-large">
          <div className="what-challenges__wrap">
            <div className="what-challenges__img">
              <img src={bicycle} />
            </div>
            <ul className="what-challenges__list">
              <h3 className="what-challenges__title">
                What's your challenges?
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

export default WhatChallenges;