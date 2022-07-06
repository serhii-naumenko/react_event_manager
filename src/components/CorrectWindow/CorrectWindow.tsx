import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CorrectWindow.scss';
import pencil from '../../images/pencil.svg';
import cloud from '../../images/cloud.svg';
import can from '../../images/can.svg';
import { changeIsPublishedOccasion, selectors } from '../../redux/reduser';

export const CorrectWindow: React.FC = () => {
  const idOfEvent = useSelector(selectors.getChosenId);
  const loadedEvents = useSelector(selectors.loadEvents);
  const dispatch = useDispatch();
  const [eventPublished, setEventPublished] = useState(false);

  const handlerChangePublished = useCallback(() => {
    const chosenIdEvent = idOfEvent;
    const allEvents = loadedEvents;
    const chosenEvent = allEvents.find((oneEvent) => {
      return oneEvent.id === chosenIdEvent;
    });

    if (chosenEvent?.isPublished) {
      setEventPublished(true);
    } else {
      setEventPublished(false);
    }

    // eslint-disable-next-line no-console
    console.log(eventPublished, chosenIdEvent);

    dispatch(changeIsPublishedOccasion(chosenIdEvent));
  }, [idOfEvent, loadedEvents, eventPublished]);

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
        onClick={() => handlerChangePublished()}
      >
        <img
          src={cloud}
          alt="cloud of download"
          className="CorrectWindow__correct-image"
        />
        <p className="CorrectWindow__edit">
          {eventPublished ? 'Publish' : 'Unpublish'}
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
