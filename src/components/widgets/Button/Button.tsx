import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

interface IProps {
	className?: string;
	title?: string;
	onClick(): void;
	children: React.ReactNode;
}

const Button: React.FC<IProps> = ({
	className,
	title,
	onClick,
	children,
}) => (
	<button
		className={cn(className, styles.container)}
		title={title}
		onMouseDown={(event) => event.preventDefault()}
		onClick={() => onClick()}
	>
		{children}
	</button>
);

export default Button;
