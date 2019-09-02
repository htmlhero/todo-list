import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { IGlobalState, IRootAction } from './types';
import { createTask } from '../models/task';

const initialState: IGlobalState = {
	lists: {},
};

export default createReducer<IGlobalState, IRootAction>(initialState)
	.handleAction(actions.addList, (state, { payload: { list } } ) => {
		const { lists } = state;

		return {
			...state,
			lists: {
				...lists,
				[list.id]: {
					...list
				},
			}
		};
	})
	.handleAction(actions.editList, (state, { payload: { id, title } }) => {
		const { lists } = state;
		const list = lists[id];

		if (!list) {
			return state;
		}

		return {
			...state,
			lists: {
				...lists,
				[id]: {
					...list,
					title,
				}
			}
		};
	})
	.handleAction(actions.deleteList, (state, { payload: { id } }) => {
		const { lists } = state;
		const { [id]: list, ...restLists } = lists;

		if (!list) {
			return state;
		}

		return {
			...state,
			lists: restLists,
		};
	})
	.handleAction(actions.addTask, (state, { payload: { listId } }) => {
		const { lists } = state;
		const list = lists[listId];

		if (!list) {
			return state;
		}

		const task = createTask();

		return {
			...state,
			lists: {
				...lists,
				[listId]: {
					...list,
					tasks: [task, ...list.tasks],
				}
			}
		};
	})
	.handleAction(actions.editTask, (state, { payload: { listId, taskId, taskTitle } }) => {
		const { lists } = state;
		const list = lists[listId];

		if (!list) {
			return state;
		}

		const task = list.tasks.find((item) => item.id === taskId);

		if (!task) {
			return state;
		}

		const taskIndex = list.tasks.indexOf(task);

		return {
			...state,
			lists: {
				...lists,
				[listId]: {
					...list,
					tasks: [
						...list.tasks.slice(0, taskIndex),
						{
							...task,
							title: taskTitle,
						},
						...list.tasks.slice(taskIndex + 1),
					],
				}
			}
		};
	})
	.handleAction(actions.toggleTask, (state, { payload: { listId, taskId, taskChecked } }) => {
		const { lists } = state;
		const list = lists[listId];

		if (!list) {
			return state;
		}

		const task = list.tasks.find((item) => item.id === taskId);

		if (!task) {
			return state;
		}

		const taskIndex = list.tasks.indexOf(task);

		return {
			...state,
			lists: {
				...lists,
				[listId]: {
					...list,
					tasks: [
						...list.tasks.slice(0, taskIndex),
						{
							...task,
							done: taskChecked,
						},
						...list.tasks.slice(taskIndex + 1),
					],
				}
			}
		};
	})
	.handleAction(actions.deleteTask, (state, { payload: { listId, taskId } }) => {
		const { lists } = state;
		const list = lists[listId];

		if (!list) {
			return state;
		}

		const task = list.tasks.find((item) => item.id === taskId);

		if (!task) {
			return state;
		}

		const taskIndex = list.tasks.indexOf(task);

		return {
			...state,
			lists: {
				...lists,
				[listId]: {
					...list,
					tasks: [
						...list.tasks.slice(0, taskIndex),
						...list.tasks.slice(taskIndex + 1),
					],
				}
			}
		};
	});
