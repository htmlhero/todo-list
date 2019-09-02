import React from 'react';

import styles from './App.module.css';

import Router from '../Router/Router';

const App: React.FC = () => (
	<div className={styles.container}>
		<div className={styles.center}>
			<Router />
		</div>
	</div>
);

export default App;
