import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames';

import * as actions from '../../../store/actions';
import {
	loadList as remoteLoadList,
	saveList as remoteSaveList,
	deleteList as remoteDeleteList,
} from '../../../store/remote';
import { IList } from '../../../models/list';

import Alert, { Type as AlertType } from '../../widgets/Alert/Alert';
import Input from '../../widgets/Input/Input';
import ListWidget from '../../widgets/List/List';
import Button from '../../widgets/Button/Button';
import Icon, { Type as IconType } from '../../widgets/Icon/Icon';

import styles from './List.module.css';

export interface IRouteProps extends RouteComponentProps<{
	listId: string
}> {}

export interface IStateProps {
	listId?: string;
	list?: IList;
}

export interface IDispatchProps {
	addList: typeof actions.addList;
	editList: typeof actions.editList;
	deleteList: typeof actions.deleteList;
	addTask: typeof actions.addTask;
	editTask: typeof actions.editTask;
	toggleTask: typeof actions.toggleTask;
	deleteTask: typeof actions.deleteTask;
}

export interface IProps extends IRouteProps, IStateProps, IDispatchProps {}

const List: React.FC<IProps> = ({
	listId,
	list,
	addList,
	editList,
	deleteList,
	addTask,
	editTask,
	toggleTask,
	deleteTask,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!listId) {
			setIsLoading(false);
		} else {
			(async () => {
				try {
					const list = await remoteLoadList(listId);
					list && addList(list);
				} catch (error) {
					alert(error.message);
				}

				setIsLoading(false);
			})();
		}
	}, [listId, addList]);

	useEffect(() => {
		if (list) {
			try {
				remoteSaveList(list);
			} catch (error) {
				alert(error.message);
			}
		}
	}, [list]);

	const handleListEdit = (listId: string, value: string) => {
		editList(listId, value);
	};

	const handleListDelete = (listId: string) => {
		if (window.confirm('Are you shure want to delete this list?')) {
			deleteList(listId);
			try {
				remoteDeleteList(listId);
			} catch (error) {
				alert(error.message);
			}
		}
	};

	const handleTaskToggle = (listId: string, taskId: string, checked: boolean) => {
		toggleTask(listId, taskId, checked);
	};

	const handleTaskEdit = (listId: string, taskId: string, value: string) => {
		editTask(listId, taskId, value);
	};

	const handleTaskDelete = (listId: string, taskId: string) => {
		if (window.confirm('Are you shure want to delete this task?')) {
			deleteTask(listId, taskId);
		}
	};

	if (isLoading) {
		return <Alert type={AlertType.PRIMARY}>Loading&hellip;</Alert>;
	} else if (!list) {
		return <Alert type={AlertType.DANGER}>Sorry, list does not found!</Alert>;
	} else {
		return (
			<div className={cn(styles.container)}>
				<div className={cn(styles.header)}>
					<h1 className={cn(styles.title)}>
						<Input
							className={cn(styles.titleInput)}
							prompt="Please enter a list name"
							placeholder="Untitled list"
							value={list.title}
							onChange={(value) => handleListEdit(list.id, value)}
						/>
					</h1>
					<div className={cn(styles.actionList)}>
						<Button
							className={cn(styles.action)}
							title="Add task"
							onClick={() => addTask(list.id)}
						>
							<div className={cn(styles.actionIcon)}>
								<Icon
									width={20}
									height={20}
									type={IconType.PLUS}
									color={'#28a745'}
								/>
							</div>
						</Button>
						<Button
							className={cn(styles.action)}
							title="Delete list"
							onClick={() => handleListDelete(list.id)}
						>
							<div className={cn(styles.actionIcon)}>
								<Icon
									width={20}
									height={20}
									type={IconType.DELETE}
									color={'#dc3545'}
								/>
							</div>
						</Button>
					</div>
				</div>
				<div className={cn(styles.list)}>
					<ListWidget
						tasks={list.tasks}
						onItemChecked={(taskId, checked) => handleTaskToggle(list.id, taskId, checked)}
						onItemInput={(taskId, value) => handleTaskEdit(list.id, taskId, value)}
						onItemDelete={(taskId) => handleTaskDelete(list.id, taskId)}
					/>
				</div>
			</div>
		);
	}
};

export default List;
