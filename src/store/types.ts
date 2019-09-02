import { ActionType } from 'typesafe-actions';
import { IList } from '../models/list';

export interface IGlobalState {
	lists: { [id: string]: IList };
}

export type IRootAction = ActionType<typeof import('./actions')>;
