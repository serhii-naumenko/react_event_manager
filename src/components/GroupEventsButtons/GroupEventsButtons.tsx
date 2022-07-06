import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import './GroupEventsButtons.scss';
import ellipsis from '../../images/points.svg';
import plus from '../../images/plus.svg';
// import { Occasion } from '../../OccasionType';
import { CorrectWindow } from '../CorrectWindow';
import { chooseIdOccasion, selectors } from '../../redux/reduser';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const GroupEventsButtons: React.FC = () => {
  const allEvents = useSelector(selectors.loadEvents);
  const chosenId = useSelector(selectors.getChosenId);
  const [isPublishedList, setIsPublishedList] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(allEvents);
  // const [idToPublishMenu, setidToPublishMenu] = useState(-1);
  const dispatch = useDispatch();
  // const [isRedactorHidden, setIsRedactorHidden] = useState(true);
  // const printDate = new Date(Date.UTC(2022, 6, 5, 23, 30));
  // const printDate = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

  // eslint-disable-next-line no-console
  // console.log(printDate);

  const handlerPrintPublish = useCallback(() => {
    const choiceOfPublic = chosenId;
    const eventsToPrint = allEvents
      .filter((visEvent) => visEvent.isPublished === !choiceOfPublic);

    setIsPublishedList(!choiceOfPublic);
    setVisibleEvents(eventsToPrint);
  }, [isPublishedList, allEvents]);

  const handlerOpenMenu = (idOfEvent: number) => {
    // setidToPublishMenu(idOfEvent);
    dispatch(chooseIdOccasion(idOfEvent));

    // eslint-disable-next-line no-console
    console.log(idOfEvent);
  };

  // const handlerChangePublishPropety = useCallback((idOfEvent) => {
  //   const bringToPublished = events.find((oneEvent) => oneEvent.id === idOfEvent);
  //   const changeMenuPublished = menuPublished;

  //   if (bringToPublished) {
  //     bringToPublished.isPublished = !bringToPublished.isPublished;

  //     const eventsToPrint = events
  //       .filter((visEvent) => visEvent.isPublished === !bringToPublished.isPublished);

  //     setVisibleEvents(eventsToPrint);
  //     setMenuPublished(!changeMenuPublished);
  //   }

  //   // eslint-disable-next-line no-console
  //   console.log(events);
  // }, [visibleEvents]);

  return (
    <div className="GroupEventsButtons">
      <div className="GroupEventsButtons__visibility">
        <div className="GroupEventsButtons__published">
          <button
            type="button"
            className={classNames(
              'GroupEventsButtons__switch-button',
              {
                'GroupEventsButtons__switch-button-isActive': isPublishedList,
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
                'GroupEventsButtons__switch-button-isActive': !isPublishedList,
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
        {visibleEvents.map((oneEvent) => (
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
            {(chosenId === oneEvent.id) && (
              <CorrectWindow />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
