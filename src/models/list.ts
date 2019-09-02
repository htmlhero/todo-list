import { uuid } from '../utils';

import { ITask } from './task';

export type IList = {
	id: string;
	title: string;
	tasks: ITask[];
}

export const createList = (): IList => ({
	id: uuid(),
	title: '',
	tasks: [],
});
