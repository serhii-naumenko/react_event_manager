import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CorrectWindow.scss';
import pencil from '../../images/pencil.svg';
import cloud from '../../images/cloud.svg';
import can from '../../images/can.svg';
import {
  changeDisabledAdd,
  changeIsCorrectForm,
  chooseIdOccasion,
  getVisibleOccasions,
  selectors,
  setInfoToForm,
  toggleIsPublishedProperty,
  updateOcasions,
} from '../../redux/reduser';

export const CorrectWindow: React.FC = () => {
  const idOfEvent = useSelector(selectors.getChosenId);
  const loadedEvents = useSelector(selectors.loadedOccasions);
  const choosenToPublish = useSelector(selectors.getModePublishMenu);
  const chosenEvent = useSelector(selectors.getChosenOccasion);
  const visibleEvents = useSelector(selectors.getVisibleOccasons);
  const dispatch = useDispatch();

  const handlerChangePublished = useCallback(() => {
    const chosenIdEvent = idOfEvent;
    const allEvents = loadedEvents;
    const newEventsToPrint = visibleEvents.filter((visEvent) => visEvent.id !== chosenIdEvent);

    dispatch(toggleIsPublishedProperty(chosenIdEvent));

    dispatch(getVisibleOccasions(newEventsToPrint));
    dispatch(updateOcasions(allEvents));
    dispatch(toggleIsPublishedProperty(chosenIdEvent));
    dispatch(chooseIdOccasion(-1));
    dispatch(changeDisabledAdd(false));
  }, [idOfEvent, loadedEvents, chosenEvent]);

  const correctEvent = useCallback(() => {
    if ('title' in chosenEvent) {
      const infoToForm = {
        title: chosenEvent.title,
        date: chosenEvent.time.slice(0, 10),
        time: chosenEvent.time.slice(11, 19),
      };

      dispatch(setInfoToForm(infoToForm));
    }

    dispatch(changeIsCorrectForm(true));
    dispatch(chooseIdOccasion(-1));
  }, [idOfEvent, loadedEvents, chosenEvent]);

  return (
    <div className="CorrectWindow__window-add">
      <button
        type="button"
        className="CorrectWindow__window-section"
        onClick={correctEvent}
      >
        <img
          src={pencil}
          alt="pencil"
          className="CorrectWindow__correct-image"
        />
        <p className="CorrectWindow__edit">
          Edit
        </p>
      </button>
      <button
        type="button"
        className="CorrectWindow__window-section
        CorrectWindow__window-section-middle"
        onClick={handlerChangePublished}
      >
        <img
          src={cloud}
          alt="cloud of download"
          className="CorrectWindow__correct-image"
        />
        <p className="CorrectWindow__edit">
          {choosenToPublish ? 'Unpublish' : 'Publish'}
        </p>
      </button>
      <button
        type="button"
        className="CorrectWindow__window-section"
      >
        <img
          src={can}
          alt="garbage can"
          className="CorrectWindow__correct-image"
        />
        <p
          className="CorrectWindow__edit
          CorrectWindow__edit-delete"
        >
          Delete
        </p>
      </button>
    </div>
  );
};
