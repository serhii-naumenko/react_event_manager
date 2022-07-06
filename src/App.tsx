import React, { useCallback, useState } from 'react';
import './App.scss';
import { GroupEventsButtons } from './components/GroupEventsButtons';
import picLogo from './images/logo.svg';
import picArrow from './images/arrow.svg';
import { response } from './api';

export const App: React.FC = () => {
  const [nameOfTimeZone, setNameOfTimeZone] = useState('choose a time zone');
  const [isChosen, setIsChosen] = useState(true);

  const handlerHiddenSelector = useCallback(() => {
    const openSelector = isChosen;

    setIsChosen(!openSelector);
  }, [isChosen]);

  const handlerTimeZones = useCallback((timeZone) => {
    setNameOfTimeZone(timeZone);
    setIsChosen(true);
  }, [nameOfTimeZone]);

  return (
    <div className="App">
      <div className="App__container-out">
        <h1 className="App__title">
          Event Manager
        </h1>
        <div className="App__container-in">
          <div className="App__logo">
            <img src={picLogo} alt="logo" className="App__logo-image" />
            <p className="App__logo-text">
              Select Timezone
            </p>
          </div>
          <div className="App__selector">
            <div className="App__selector-container">
              <button
                className="App__choice"
                type="button"
                onClick={handlerHiddenSelector}
              >
                <img src={picArrow} alt="pointer on select" className="App__choice-image" />
                {nameOfTimeZone}
              </button>
              {response.map((elementOfResponse) => (
                <button
                  className="App__choice"
                  type="button"
                  key={elementOfResponse.id}
                  hidden={isChosen}
                  onClick={() => handlerTimeZones(elementOfResponse.value)}
                >
                  {elementOfResponse.value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <GroupEventsButtons />
    </div>
  );
};
