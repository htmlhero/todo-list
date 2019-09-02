import React, { useState } from 'react';
import cn from 'classnames';

import { inifinitePrompt } from '../../../utils'

import styles from './Input.module.css';

interface IProps {
	className?: string;
	prompt: string;
	placeholder: string;
	value: string;
	onChange(value: string): void;
}

const Input: React.FC<IProps> = ({
	className,
	prompt,
	placeholder,
	value: initialValue,
	onChange,
}) => {
	const [value, setValue] = useState<string>(initialValue);

	const handleClick = () => {
		const newValue = inifinitePrompt(prompt, value);
		if (newValue !== null) {
			setValue(newValue);
			onChange(newValue);
		}
	};

	return (
		<div
			className={cn(className, styles.container, !value && styles.placeholder)}
			onClick={handleClick}
		>
			{value || placeholder}
		</div>
	);
};

export default Input;
