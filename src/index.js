import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './App.css';
import App from './App';
import rootReducer from './store/index';

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
