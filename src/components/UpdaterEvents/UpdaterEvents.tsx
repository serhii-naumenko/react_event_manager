import classNames from 'classnames';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import {
  changeDisabledAdd,
  changeIsAddForm,
  changeIsCorrectForm,
  changeModePublishMenu,
  getVisibleOccasions,
  selectors,
  setCountMenu,
  setInfoToForm,
  updateOcasions,
} from '../../redux/reduser';
import './UpdaterEvents.scss';
import { Occasion } from '../../OccasionType';

export const UpdaterEvents: React.FC = () => {
  const allEvents = useSelector(selectors.loadedOccasions);
  const infoToCorrectForm = useSelector(selectors.getInfoToCorrect);
  const [descriptionEvent, setDescriptionEvent] = useState(infoToCorrectForm.title);
  const [dateEvent, setDateEvent] = useState(infoToCorrectForm.date);
  const [timeEvent, setTimeEvent] = useState(infoToCorrectForm.time);
  const openCorrectForm = useSelector(selectors.getIsCorrectForm);
  const openAddForm = useSelector(selectors.getIsAddForm);
  const chosenEvent = useSelector(selectors.getChosenOccasion);
  const nameTimezone = useSelector(selectors.getTimezone);
  const dispatch = useDispatch();

  const handlerSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    const eventToCorrect = chosenEvent;
    let upgradedEvents: Occasion[] = [];

    if (openCorrectForm
      && 'title' in eventToCorrect
    ) {
      upgradedEvents = [
        {
          id: eventToCorrect.id,
          title: descriptionEvent,
          time: moment.tz(`${dateEvent} ${timeEvent}`, 'YYYY-MM-DDTHH:mm.ss.Z', `${nameTimezone}`)
            .utc().format('YYYY-MM-DDTHH:mm:ss.ZZ'),
          isPublished: false,
        },
        ...allEvents.filter((oneEvent) => oneEvent.id !== eventToCorrect.id),
      ];
    }

    if (openAddForm) {
      const date = moment.tz(`${dateEvent} ${timeEvent}`, 'YYYY-MM-DDTHH:mm.ss.Z', `${nameTimezone}`)
        .utc().format('YYYY-MM-DDTHH:mm:ss.ZZ');

      upgradedEvents = [
        {
          id: new Date().valueOf(),
          title: descriptionEvent,
          time: `${date}Z`,
          isPublished: false,
        },
        ...allEvents,
      ];
    }

    const visibleEvents = upgradedEvents.filter((upEvent) => upEvent.isPublished === false);

    dispatch(updateOcasions(upgradedEvents));
    localStorage.setItem('events', JSON.stringify(upgradedEvents));
    dispatch(changeModePublishMenu(false));
    dispatch(getVisibleOccasions(visibleEvents));

    dispatch(changeIsAddForm(false));
    dispatch(changeIsCorrectForm(false));
    dispatch(changeDisabledAdd(false));
    dispatch(setInfoToForm({
      title: '',
      date: '2022-01-01',
      time: '00:00:00',
    }));
  }, [descriptionEvent, dateEvent, timeEvent, allEvents]);

  const closeForm = useCallback(() => {
    dispatch(changeIsAddForm(false));
    dispatch(changeIsCorrectForm(false));
    dispatch(changeDisabledAdd(false));
    dispatch(changeModePublishMenu(false));
    dispatch(setCountMenu(0));
    dispatch(setInfoToForm({
      title: '',
      date: '2022-01-01',
      time: '00:00:00',
    }));
  }, []);

  return (
    <div className="UpdaterEvents">
      <div className="UpdaterEvents__container">
        <button
          className="UpdaterEvents__close-form"
          type="button"
          onClick={closeForm}
        >
          X
        </button>
        <h1 className="UpdaterEvents__title">
          Fill the form
        </h1>
        <form
          method="POST"
          className="UpdaterEvents__form"
          onSubmit={(event) => handlerSubmit(event)}
        >
          <div className="UpdaterEvents__groupe-fields">
            <div className="UpdaterEvents__field">
              <p className="UpdaterEvents__name-title">
                Input description:
              </p>
              <textarea
                className="UpdaterEvents__discription"
                cols={30}
                rows={2}
                minLength={3}
                maxLength={80}
                name="desc"
                placeholder="max 80 symbols"
                value={descriptionEvent}
                onChange={(event) => setDescriptionEvent(event.target.value)}
              />
            </div>
            <div className="UpdaterEvents__field">
              <p className="UpdaterEvents__name-title">
                Choose a date:
              </p>
              <input
                type="date"
                className="UpdaterEvents__date"
                min="2022-01-01"
                value={dateEvent}
                onChange={(event) => setDateEvent(event.target.value)}
              />
            </div>

            <div className="UpdaterEvents__field">
              <p className="UpdaterEvents__name-title">
                Choose time:
              </p>
              <input
                type="time"
                className="UpdaterEvents__time"
                value={timeEvent}
                onChange={(event) => setTimeEvent(event.target.value)}
              />
            </div>

          </div>
          <button
            type="submit"
            className={classNames(
              'UpdaterEvents__button-add',
              {
                'UpdaterEvents__button-add--passive': false,
              },
            )}
          >
            {openCorrectForm ? 'Correct the event' : 'Add a new event'}
          </button>
        </form>
      </div>
    </div>
  );
};
