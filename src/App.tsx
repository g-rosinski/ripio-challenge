import React from 'react';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import appRouter from './routers/app.router';
import { UserContext } from './contexts/UserContext';

type AppParams = {
  user: string
}

const App: React.FC<AppParams> = ({user = ""}) => {
  return (
    <Provider store={store}>
      <UserContext.Provider value={{user}}>
        <RouterProvider router={appRouter} />
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
