import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from './slices/settingsSlice';
import SEO from './components/SEO';

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        dispatch(fetchSettings());

        return () => {
            document.head.removeChild(link);
        };
    }, [dispatch]);

    return (
        <>
            <SEO />
            <App />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
