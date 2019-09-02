import React, { useState } from 'react';
import cn from 'classnames';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon, { Type as IconType } from '../Icon/Icon';

import styles from './ListItem.module.css';

interface IProps {
	checked?: boolean;
	title: string;
	onChecked(checked: boolean): void;
	onInput(text: string): void;
	onDelete(): void;
}

const ListItem: React.FC<IProps> = ({
	checked: initialChecked,
	title,
	onChecked,
	onInput,
	onDelete,
}) => {
	const [checked, setChecked] = useState<boolean>(Boolean(initialChecked));

	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		onChecked(e.target.checked);
	};

	return (
		<li className={cn(styles.container, checked && styles.containerChecked)}>
			<div className={cn(styles.left)}>
				<label
					className={cn(styles.checked)}
					title="Toggle task"
				>
					<input
						className={cn(styles.checkedInput)}
						type="checkbox"
						checked={checked}
						onChange={handleChecked}
					/>
				</label>
			</div>
			<div className={cn(styles.center)}>
				<Input
					className={cn(styles.titleInput)}
					prompt="Please enter a task name"
					placeholder="Untitled task"
					value={title}
					onChange={(value) => onInput(value)}
				/>
			</div>
			<div className={cn(styles.right)}>
				<Button
					className={cn(styles.delete)}
					title="Delete task"
					onClick={onDelete}
				>
					<div className={cn(styles.deleteIcon)}>
						<Icon
							width={20}
							height={20}
							type={IconType.DELETE}
							color={'#dc3545'}
						/>
					</div>
				</Button>
			</div>
		</li>
	);
};

export default ListItem;
