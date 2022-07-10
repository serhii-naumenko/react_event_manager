import React, { useCallback, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GroupEventsButtons } from './components/GroupEventsButtons';
import { UpdaterEvents } from './components/UpdaterEvents';
import picLogo from './images/logo.svg';
import picArrow from './images/arrow.svg';
import { response } from './api';
import { selectors, setCountMenu, setTimezone } from './redux/reduser';

export const App: React.FC = () => {
  const nameTimezone = useSelector(selectors.getTimezone);
  const allEvents = useSelector(selectors.loadedOccasions);
  const openAddForm = useSelector(selectors.getIsAddForm);
  const openCorrectForm = useSelector(selectors.getIsCorrectForm);
  const [isChosen, setIsChosen] = useState(true);
  const dispatch = useDispatch();

  const handlerHiddenSelector = useCallback(() => {
    const openSelector = isChosen;

    setIsChosen(!openSelector);
    dispatch(setCountMenu(0));
  }, [isChosen, allEvents]);

  const handlerTimeZones = useCallback((timeZone) => {
    dispatch(setTimezone(timeZone));
    setIsChosen(true);
  }, [nameTimezone, allEvents]);

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
                {nameTimezone}
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
      {openAddForm && <UpdaterEvents />}
      {openCorrectForm && <UpdaterEvents />}
    </div>
  );
};
