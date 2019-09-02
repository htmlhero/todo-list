import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { IList } from '../models/list';

firebase.initializeApp({
	apiKey: 'AIzaSyAiWlAAdqxC-WrQ7-kwyiSNtRVrJl1DuB4',
	authDomain: 'todo-list-cfbb7.firebaseapp.com',
	databaseURL: 'https://todo-list-cfbb7.firebaseio.com',
	projectId: 'todo-list-cfbb7',
	storageBucket: '',
	messagingSenderId: '848581062022',
	appId: '1:848581062022:web:240de44539f9744f',
});

const signIn = async (): Promise<void> => {
	const auth = firebase.auth();

	if (auth.currentUser) {
		return;
	} else {
		await auth.signInAnonymously();
	}
};

export const saveList = async (list: IList): Promise<void> => {
	await signIn();

	const document = await firebase
		.firestore()
		.collection('lists')
		.doc(list.id);

	await document.set(list);
};

export const loadList = async (id: string): Promise<IList | null> => {
	await signIn();

	const document = await firebase
		.firestore()
		.collection('lists')
		.doc(id)
		.get();

	if (document.exists) {
		return document.data() as IList;
	} else {
		return null;
	}
};

export const deleteList = async (id: string): Promise<void> => {
	await signIn();

	await firebase
		.firestore()
		.collection('lists')
		.doc(id)
		.delete();
};
