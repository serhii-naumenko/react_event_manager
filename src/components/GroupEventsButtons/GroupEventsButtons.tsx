import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment-timezone';
import './GroupEventsButtons.scss';
import ellipsis from '../../images/points.svg';
import plus from '../../images/plus.svg';
import { CorrectWindow } from '../CorrectWindow';
import {
  changeDisabledAdd,
  changeIsAddForm,
  changeModePublishMenu,
  chooseIdOccasion,
  getVisibleOccasions,
  selectors,
  setchosenOccasion,
  setCountMenu,
} from '../../redux/reduser';
import { Occasion } from '../../OccasionType';

export const GroupEventsButtons: React.FC = () => {
  const allEvents = useSelector(selectors.loadedOccasions);
  const chosenId = useSelector(selectors.getChosenId);
  const chosenEvent = useSelector(selectors.getChosenOccasion);
  const visibleEvents = useSelector(selectors.getVisibleOccasons);
  const isPublishList = useSelector(selectors.getModePublishMenu);
  const nameTimezone = useSelector(selectors.getTimezone);
  const isAddDisabled = useSelector(selectors.getIsDisabledAdd);
  const countUseMenu = useSelector(selectors.getCountMenu);
  const dispatch = useDispatch();
  const [prevChosenId, setPrevChosenId] = useState(-2);
  const format = 'hh:mm a - DD MMM YYYY';

  useEffect(() => {
    const eventsToPrint = allEvents
      .filter((visEvent) => visEvent.isPublished === isPublishList);

    dispatch(getVisibleOccasions(eventsToPrint));
  }, [allEvents]);

  const handlerPrintPublish = useCallback(() => {
    const choiceOfPublic = isPublishList;
    const eventsToPublic = allEvents
      .filter((visEvent) => visEvent.isPublished === !choiceOfPublic);

    dispatch(changeModePublishMenu(!choiceOfPublic));
    dispatch(getVisibleOccasions(eventsToPublic));
    dispatch(changeDisabledAdd(false));
    dispatch(setCountMenu(0));
  }, [isPublishList, allEvents]);

  const handlerOpenMenu = useCallback((idOfEvent: number) => {
    const loadedEvents = allEvents;
    const count = countUseMenu;
    const prevChoice = prevChosenId;

    const exactEvent = loadedEvents
      .find((oneEvent) => oneEvent.id === idOfEvent);

    if (count === 1 && prevChoice === idOfEvent) {
      dispatch(setCountMenu(0));
      dispatch(changeDisabledAdd(false));
    } else {
      dispatch(setCountMenu(1));
      dispatch(changeDisabledAdd(true));
    }

    if (exactEvent) {
      if (exactEvent.isPublished) {
        dispatch(changeModePublishMenu(true));
      } else {
        dispatch(changeModePublishMenu(false));
      }
    }

    dispatch(chooseIdOccasion(idOfEvent));
    dispatch(setchosenOccasion(exactEvent));
    setPrevChosenId(idOfEvent);
  }, [chosenEvent, countUseMenu, prevChosenId, allEvents]);

  const openForm = useCallback(() => {
    dispatch(changeIsAddForm(true));
    dispatch(changeDisabledAdd(true));
  }, [isAddDisabled]);

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
        className={classNames(
          'GroupEventsButtons__add-button',
          {
            'GroupEventsButtons__add-button--disabled': isAddDisabled,
          },
        )}
        type="button"
        disabled={isAddDisabled}
        onClick={openForm}
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
                  {moment.utc(`${oneEvent.time}`, 'YYYY-MM-DDTHH:mm:ss')
                    .tz(`${nameTimezone}`).format(`${format}`)}
                </p>
              </div>
            </div>
            {(chosenId === oneEvent.id)
              && countUseMenu === 1
              && (
                <CorrectWindow />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
