import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CorrectWindow.scss';
import pencil from '../../images/pencil.svg';
import cloud from '../../images/cloud.svg';
import can from '../../images/can.svg';
import {
  changeIsPublishedOccasion,
  chooseIdOccasion,
  getVisibleOccasions,
  selectors,
  updateOcasions,
} from '../../redux/reduser';

export const CorrectWindow: React.FC = () => {
  const idOfEvent = useSelector(selectors.getChosenId);
  const loadedEvents = useSelector(selectors.loadedOccasions);
  const choosenToPublish = useSelector(selectors.getChosenOccasionsPublished);
  const chosenEvent = useSelector(selectors.getChosenOccasion);
  const visibleEvents = useSelector(selectors.getVisibleOccasons);
  const dispatch = useDispatch();

  const handlerChangePublished = useCallback(() => {
    const chosenIdEvent = idOfEvent;
    const allEvents = loadedEvents;
    const exactEvent = chosenEvent;
    const newEventsToPrint = visibleEvents.filter((visEvent) => visEvent.id !== chosenIdEvent);

    if ('isPublished' in exactEvent) {
      if (exactEvent.isPublished) {
        allEvents[chosenIdEvent].isPublished = false;
      } else {
        allEvents[chosenIdEvent].isPublished = true;
      }
    }

    dispatch(getVisibleOccasions(newEventsToPrint));
    dispatch(updateOcasions(allEvents));
    dispatch(changeIsPublishedOccasion(chosenIdEvent));
    dispatch(chooseIdOccasion(-1));
  }, [idOfEvent, loadedEvents, chosenEvent]);

  return (
    <div className="CorrectWindow__window-add">
      <button
        type="button"
        className="CorrectWindow__window-section"
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
