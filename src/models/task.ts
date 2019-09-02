import { uuid } from '../utils';

export type ITask = {
	id: string;
	title: string;
	done?: boolean;
}

export const createTask = () => ({
	id: uuid(),
	title: '',
});
