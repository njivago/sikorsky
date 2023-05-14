import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './services/store';
import './assets/styles/_general.scss';

type State = {
  store: Store,
}

export const store = new Store();

export const Context = React.createContext<State>({
  store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{ store }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
