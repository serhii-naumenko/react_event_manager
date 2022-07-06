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
  chosenId: number,
}

const initialState: InitialState = { events, chosenId: -1 };

const occasionReducer = createSlice({
  name: 'occasion',
  initialState,
  reducers: {
    addOccasion: (state, action) => {
      state.events.push(action.payload);

      return state;
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
  },
});

export const selectors = {
  loadEvents: (state: InitialState) => state.events,
  getChosenId: (state: InitialState) => state.chosenId,
};

export const {
  addOccasion,
  removeOccasion,
  changeIsPublishedOccasion,
  chooseIdOccasion,
} = occasionReducer.actions;

export const { reducer } = occasionReducer;
