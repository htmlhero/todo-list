import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { IGlobalState } from '../../../store/types';
import * as actions from '../../../store/actions';

import Main, { IRouteProps, IStateProps, IDispatchProps } from './Main';

const mapStateToProps = () => ({} as IStateProps);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
	return bindActionCreators({
		addList: actions.addList,
	}, dispatch);
};

export default withRouter(connect<IStateProps, IDispatchProps, IRouteProps, IGlobalState>(
	mapStateToProps,
	mapDispatchToProps,
)(Main));
