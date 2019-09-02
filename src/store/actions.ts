import { createAction } from 'typesafe-actions';

import { IList } from '../models/list';

export const addList = createAction(
	'ADD_LIST',
	action => (
		list: IList,
	) => action({
		list,
	})
);

export const editList = createAction(
	'EDIT_LIST',
	action => (
		id: string,
		title: string,
	) => action({
		id,
		title,
	})
);

export const deleteList = createAction(
	'DELETE_LIST',
	action => (
		id: string,
	) => action({
		id,
	})
);

export const addTask = createAction(
	'ADD_TASK',
	action => (
		listId: string,
	) => action({
		listId,
	})
);

export const editTask = createAction(
	'EDIT_TASK',
	action => (
		listId: string,
		taskId: string,
		taskTitle: string,
	) => action({
		listId,
		taskId,
		taskTitle,
	})
);

export const toggleTask = createAction(
	'TOGGLE_TASK',
	action => (
		listId: string,
		taskId: string,
		taskChecked: boolean,
	) => action({
		listId,
		taskId,
		taskChecked,
	})
);

export const deleteTask = createAction(
	'DELETE_TASK',
	action => (
		listId: string,
		taskId: string,
	) => action({
		listId,
		taskId,
	})
);
