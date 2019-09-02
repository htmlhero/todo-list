import { IRootAction } from './types';

declare module 'typesafe-actions' {
	interface Types {
		RootAction: IRootAction;
	}
}
