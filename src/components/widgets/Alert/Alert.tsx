import React from 'react';
import cn from 'classnames';

import styles from './Alert.module.css';

export enum Type {
	PRIMARY,
	DANGER,
}

interface IProps {
	className?: string;
	type: Type;
}

const Alert: React.FC<IProps> = ({
	className,
	type,
	children,
}) => {
	let modifier;

	switch (type) {
		case Type.PRIMARY:
			modifier = styles.primary;
			break;
		case Type.DANGER:
			modifier = styles.danger;
			break;
		default:
			return null;
	}

	return (
		<div
			className={cn(className, styles.container, modifier)}
		>
			{children}
		</div>
	);
};

export default Alert;
