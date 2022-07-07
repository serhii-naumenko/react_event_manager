import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import './GroupEventsButtons.scss';
import ellipsis from '../../images/points.svg';
import plus from '../../images/plus.svg';
import { CorrectWindow } from '../CorrectWindow';
import {
  chooseIdOccasion,
  choseOccasionToPublish,
  getVisibleOccasions,
  selectors,
} from '../../redux/reduser';
import { Occasion } from '../../OccasionType';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const GroupEventsButtons: React.FC = () => {
  const allEvents = useSelector(selectors.loadedOccasions);
  const chosenId = useSelector(selectors.getChosenId);
  const chosenEvent = useSelector(selectors.getChosenOccasion);
  const visibleEvents = useSelector(selectors.getVisibleOccasons);
  const isPublishList = useSelector(selectors.getChosenOccasionsPublished);
  const dispatch = useDispatch();
  const [countMenu, setCountMenu] = useState(0);
  const [prevChosenId, setPrevChosenId] = useState(-2);
  // const printDate = new Date(Date.UTC(2022, 6, 5, 23, 30));
  const printDate = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

  // eslint-disable-next-line no-console
  console.log(printDate);

  const handlerPrintPublish = useCallback(() => {
    const choiceOfPublic = isPublishList;
    const eventsToPrint = allEvents
      .filter((visEvent) => visEvent.isPublished === !choiceOfPublic);

    dispatch(choseOccasionToPublish(!choiceOfPublic));
    dispatch(getVisibleOccasions(eventsToPrint));
    setCountMenu(0);
  }, [isPublishList, allEvents, visibleEvents]);

  const handlerOpenMenu = (idOfEvent: number) => {
    const exactEvent = chosenEvent;
    const count = countMenu;
    const prevChoice = prevChosenId;

    if (count === 1 && prevChoice === idOfEvent) {
      setCountMenu(0);
    } else {
      setCountMenu(1);
    }

    if ('isPublished' in exactEvent) {
      if (exactEvent.isPublished) {
        dispatch(choseOccasionToPublish(false));
      } else {
        dispatch(choseOccasionToPublish(true));
      }
    }

    dispatch(chooseIdOccasion(idOfEvent));
    setPrevChosenId(idOfEvent);
  };

  return (
    <div className="GroupEventsButtons">
      <div className="GroupEventsButtons__visibility">
        <div className="GroupEventsButtons__published">
          <button
            type="button"
            className={classNames(
              'GroupEventsButtons__switch-button',
              {
                'GroupEventsButtons__switch-button-isActive': isPublishList,
              },
            )}
            onClick={handlerPrintPublish}
          >
            Published
          </button>
        </div>
        <div className="GroupEventsButtons__unpublished">
          <button
            type="button"
            className={classNames(
              'GroupEventsButtons__switch-button',
              {
                'GroupEventsButtons__switch-button-isActive': !isPublishList,
              },
            )}
            onClick={handlerPrintPublish}
          >
            Unpublished
          </button>
        </div>
      </div>
      <button
        className="GroupEventsButtons__add-button"
        type="button"
      >
        <img src={plus} alt="plus" className="GroupEventsButtons__plus" />
        Add Event
      </button>

      <ul className="GroupEventsButtons__list">
        {visibleEvents.map((oneEvent: Occasion) => (
          <li
            className="GroupEventsButtons__item"
            key={oneEvent.id}
          >
            <div className="GroupEventsButtons__item-main">
              <p className="GroupEventsButtons__item-text">
                {oneEvent.title}
              </p>
              <div className="GroupEventsButtons__bottomGroup">
                <button
                  className="GroupEventsButtons__points"
                  type="button"
                  title="opener dicription of event"
                  onClick={() => handlerOpenMenu(oneEvent.id)}
                >
                  <img
                    src={ellipsis}
                    alt="sign to select discription of event"
                    className="GroupEventsButtons__point"
                  />
                </button>
                <p className="GroupEventsButtons__time">
                  {`${oneEvent.time.slice(11, 16)} am - ${oneEvent.time.slice(8, 10)}
                  ${months[+oneEvent.time.slice(5, 7)]} ${oneEvent.time.slice(0, 4)}`}
                </p>
              </div>
            </div>
            {(chosenId === oneEvent.id)
              && countMenu === 1
              && (
                <CorrectWindow />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
