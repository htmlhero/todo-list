import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import {
	saveList as remoteSaveList,
} from '../../../store/remote';
import { inifinitePrompt } from '../../../utils';

import { createList } from '../../../models/list';

import Alert, { Type as AlertType } from '../../widgets/Alert/Alert';

export interface IRouteProps extends RouteComponentProps {}

export interface IStateProps {}

export interface IDispatchProps {}

export interface IProps extends IRouteProps, IStateProps, IDispatchProps {}

const Main: React.FC<IProps> = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [path, setPath] = useState<string|null>(null);

	useEffect(() => {
		const newTitle = inifinitePrompt('Please enter a list name');
		if (!newTitle) {
			return;
		}
		(async () => {
			setIsLoading(true);

			const list = createList();
			list.title = newTitle;

			try {
				await remoteSaveList(list);
			} catch (error) {
				alert(error.message);
			}

			setPath(`/${list.id}/`);
		})();
	},[]);

	if (path) {
		return <Redirect to={path} />;
	} else if (isLoading) {
		return <Alert type={AlertType.PRIMARY}>Loading&hellip;</Alert>;
	} else {
		return <Alert type={AlertType.PRIMARY}>Please enter a list name!</Alert>;
	}
};

export default Main;
