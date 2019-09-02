import uuid4 from 'uuid/v4';

export const uuid = () => uuid4();

export const inifinitePrompt = (message: string, value?: string): string | null => {
	const newValue = window.prompt(message, value);
	if (newValue === '') {
		return inifinitePrompt(message, newValue);
	} else {
		return newValue;
	}
};
