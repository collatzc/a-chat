import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './custom.scss';
import App from './App';
import { store } from 'src/store';
import { name, version } from '../package.json'

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
			<App appName={name} version={version} />
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log(`v${version}`);
