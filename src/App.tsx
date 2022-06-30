import React from 'react';
import './App.scss';
import { EventList } from './components/EventList';

export const App: React.FC = () => {
  return (
    <div className="App">
      <EventList />

    </div>
  );
};
