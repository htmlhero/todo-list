import React from 'react';

import { ReactComponent as Plus } from './img/plus.svg';
import { ReactComponent as Edit } from './img/edit.svg';
import { ReactComponent as Delete } from './img/delete.svg';

export enum Type {
	PLUS,
	EDIT,
	DELETE,
}

interface IProps {
	width?: number;
	height?: number;
	type: Type;
	color?: string;
}

const Icon: React.FC<IProps> = ({
	width = 50,
	height = 50,
	type,
	color = '#fff',
}) => {
	let Component;

	switch (type) {
		case Type.PLUS:
			Component = Plus;
			break;
		case Type.EDIT:
			Component = Edit;
			break;
		case Type.DELETE:
			Component = Delete;
			break;
		default:
			return null;
	}

	return (
		<Component
			width={width}
			height={height}
			color={color}
		/>
	);
};

export default Icon;
