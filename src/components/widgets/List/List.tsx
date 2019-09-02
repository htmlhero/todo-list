import React from 'react';
import cn from 'classnames';

import { ITask } from '../../../models/task';

import Alert, { Type as AlertType } from '../Alert/Alert';
import ListItem from '../ListItem/ListItem';

import styles from './List.module.css';

interface IProps {
	tasks: ITask[];
	onItemChecked(id: string, checked: boolean): void;
	onItemInput(id: string, value: string): void;
	onItemDelete(id: string): void;
}

const List: React.FC<IProps> = ({
	tasks,
	onItemChecked,
	onItemInput,
	onItemDelete,
}) => {
	return (
		<div className={cn(styles.container)}>
			{tasks.length ? (
				<ul className={cn(styles.items)}>
					{tasks.map((task) => (
						<ListItem
							key={task.id}
							checked={task.done}
							title={task.title}
							onChecked={(checked) => onItemChecked(task.id, checked)}
							onInput={(value) => onItemInput(task.id, value)}
							onDelete={() => onItemDelete(task.id)}
						/>
					))}
				</ul>
			) : (
				<Alert type={AlertType.PRIMARY}>Not enough tasks, but you can add it!</Alert>
			)}
		</div>
	);
};

export default List;
