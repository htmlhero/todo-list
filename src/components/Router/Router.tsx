import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from '../scenes/Main';
import List from '../scenes/List';

const Router: React.FC = () => (
	<BrowserRouter>
		<Route path="/" exact component={Main} />
		<Route path="/:listId" exact component={List} />
	</BrowserRouter>
);

export default Router;
