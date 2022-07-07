import { createSlice } from '@reduxjs/toolkit';
import { Occasion } from '../OccasionType';

const events: Occasion[] = [
  {
    id: 0,
    title: 'Lorem ipsum dolor sit amet asdfafd',
    time: '2022-04-27T07:07:08.350Z',
    isPublished: false,
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet 2222',
    time: '2022-06-27T07:07:09.350Z',
    isPublished: false,
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet 3333',
    time: '2022-08-27T07:07:10.350Z',
    isPublished: false,
  },
];

interface InitialState {
  events: Occasion[],
  visibleEvents: Occasion[] | [],
  chosenEvent: Occasion | {},
  chosenId: number,
  isChosenPublished: boolean,
}

const initialState: InitialState = {
  events,
  visibleEvents: events,
  chosenEvent: {},
  chosenId: -1,
  isChosenPublished: false,
};

const occasionReducer = createSlice({
  name: 'occasion',
  initialState,
  reducers: {
    addOccasion: (state, action) => {
      state.events.push(action.payload);

      return state;
    },

    getVisibleOccasions: (state, action) => {
      return {
        ...state,
        visibleEvents: action.payload,
      };
    },

    getchosenOccasion: (state, action) => {
      const exactEvent = state.events
        .find((occasion) => occasion.id === action.payload);

      if (exactEvent) {
        return {
          ...state,
          chosenEvent: exactEvent,
        };
      }

      return state;
    },

    updateOcasions: (state, action) => {
      return {
        ...state,
        event: action.payload,
      };
    },

    // removeOccasion: (state, action) => {
    //   return {
    //     ...state,
    //     events: state.events.filter((occasion) => occasion.id !== action.payload),
    //   };
    // },
    removeOccasion: (state, action) => {
      state.events.filter((occasion) => occasion.id !== action.payload);

      return state;
    },

    changeIsPublishedOccasion: (state, action) => {
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

    choseOccasionToPublish: (state, action) => {
      return {
        ...state,
        isChosenPublished: action.payload,
      };
    },
  },
});

export const selectors = {
  loadedOccasions: (state: InitialState) => state.events,
  getVisibleOccasons: (state: InitialState) => state.visibleEvents,
  getChosenOccasion: (state: InitialState) => state.chosenEvent,
  getChosenId: (state: InitialState) => state.chosenId,
  getChosenOccasionsPublished: (state: InitialState) => state.isChosenPublished,
};

export const {
  addOccasion,
  getVisibleOccasions,
  getchosenOccasion,
  updateOcasions,
  removeOccasion,
  chooseIdOccasion,
  choseOccasionToPublish,
  changeIsPublishedOccasion,
} = occasionReducer.actions;

export const { reducer } = occasionReducer;
