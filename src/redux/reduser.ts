import { createSlice } from '@reduxjs/toolkit';
import { Occasion } from '../OccasionType';

const eventsFromStorage = localStorage.getItem('events');
let eventsStart: Occasion[] = [
  {
    id: 0,
    title: 'Lorem ipsum dolor sit amet asdfafd',
    time: '2022-04-27T07:07:08.+0000Z',
    isPublished: false,
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet 2222',
    time: '2022-06-27T10:07:09.+0000Z',
    isPublished: false,
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet 3333',
    time: '2022-08-27T23:07:10.+0000Z',
    isPublished: false,
  },
];

if (eventsFromStorage !== null) {
  eventsStart = JSON.parse(eventsFromStorage);
}

interface InitialState {
  events: Occasion[],
  visibleEvents: Occasion[] | [],
  chosenEvent: Occasion | {},
  chosenId: number,
  isChosenModePublish: boolean,
  nameOfTimezone: string,
  isAddDisabled: boolean,
  isAddForm: boolean,
  isCorrectForm: boolean,
  infoToCorrectForm: {
    title: string,
    date: string,
    time: string,
  },
  countMenu: number,
}

const initialState: InitialState = {
  events: [...eventsStart],
  visibleEvents: [],
  chosenEvent: {},
  chosenId: -1,
  isChosenModePublish: false,
  nameOfTimezone: 'UTC',
  isAddDisabled: false,
  isAddForm: false,
  isCorrectForm: false,
  infoToCorrectForm: {
    title: '',
    date: '2022-01-01',
    time: '00:00:00',
  },
  countMenu: 0,
};

const occasionReducer = createSlice({
  name: 'occasion',
  initialState,
  reducers: {
    getVisibleOccasions: (state, action) => {
      return {
        ...state,
        visibleEvents: action.payload,
      };
    },

    setchosenOccasion: (state, action) => {
      return {
        ...state,
        chosenEvent: action.payload,
      };
    },

    updateOcasions: (state, action) => {
      return {
        ...state,
        events: action.payload,
      };
    },

    removeOccasion: (state, action) => {
      return {
        ...state,
        events: state.events.filter((occasion) => occasion.id !== action.payload),
      };
    },

    toggleIsPublishedProperty: (state, action) => {
      const exactEvent = state.events.find((occasion) => {
        return occasion.id === action.payload;
      });

      if (exactEvent) {
        exactEvent.isPublished = !exactEvent.isPublished;
      }

      return state;
    },

    chooseIdOccasion: (state, action) => {
      return {
        ...state,
        chosenId: action.payload,
      };
    },

    changeModePublishMenu: (state, action) => {
      return {
        ...state,
        isChosenModePublish: action.payload,
      };
    },

    setTimezone: (state, action) => {
      return {
        ...state,
        nameOfTimezone: action.payload,
      };
    },

    changeDisabledAdd: (state, action) => {
      return {
        ...state,
        isAddDisabled: action.payload,
      };
    },

    changeIsAddForm: (state, action) => {
      return {
        ...state,
        isAddForm: action.payload,
      };
    },

    changeIsCorrectForm: (state, action) => {
      return {
        ...state,
        isCorrectForm: action.payload,
      };
    },

    setInfoToForm: (state, action) => {
      return {
        ...state,
        infoToCorrectForm: action.payload,
      };
    },

    setCountMenu: (state, action) => {
      return {
        ...state,
        countMenu: action.payload,
      };
    },
  },
});

export const selectors = {
  loadedOccasions: (state: InitialState) => state.events,
  getVisibleOccasons: (state: InitialState) => state.visibleEvents,
  getChosenOccasion: (state: InitialState) => state.chosenEvent,
  getChosenId: (state: InitialState) => state.chosenId,
  getModePublishMenu: (state: InitialState) => state.isChosenModePublish,
  getTimezone: (state: InitialState) => state.nameOfTimezone,
  getIsDisabledAdd: (state: InitialState) => state.isAddDisabled,
  getIsAddForm: (state: InitialState) => state.isAddForm,
  getIsCorrectForm: (state: InitialState) => state.isCorrectForm,
  getInfoToCorrect: (state: InitialState) => state.infoToCorrectForm,
  getCountMenu: (state: InitialState) => state.countMenu,
};

export const {
  getVisibleOccasions,
  setchosenOccasion,
  updateOcasions,
  removeOccasion,
  chooseIdOccasion,
  toggleIsPublishedProperty,
  changeModePublishMenu,
  setTimezone,
  changeDisabledAdd,
  changeIsAddForm,
  changeIsCorrectForm,
  setInfoToForm,
  setCountMenu,
} = occasionReducer.actions;

export const { reducer } = occasionReducer;
