import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { IGlobalState } from '../../../store/types';
import * as actions from '../../../store/actions';

import List, { IRouteProps, IStateProps, IDispatchProps } from './List';

const mapStateToProps = (
	{ lists }: IGlobalState,
	{ match: { params: { listId } } }: IRouteProps
): IStateProps => ({
	listId,
	list: lists[listId],
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
	return bindActionCreators({
		addList: actions.addList,
		editList: actions.editList,
		deleteList: actions.deleteList,
		addTask: actions.addTask,
		editTask: actions.editTask,
		toggleTask: actions.toggleTask,
		deleteTask: actions.deleteTask,
	}, dispatch);
};

export default withRouter(connect<IStateProps, IDispatchProps, IRouteProps, IGlobalState>(
	mapStateToProps,
	mapDispatchToProps,
)(List));
