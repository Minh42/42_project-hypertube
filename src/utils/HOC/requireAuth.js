import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { addFlashMessage } from '../src/actions/actionMessages';

export default function(ComposedComponent) {
	class Authenticate extends Component {
		componentDidMount() {
			if(!this.props.isAuthenticated) {
				this.props.addFlashMessage({
					type: '',
					text: 'You need to login to access this page'
				});
				this.props.history.push('/');
			}
		}

		componentDidUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.history.push('/');
			}
		}

		render () {
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	Authenticate.propTypes = {
		isAuthenticated: PropTypes.bool,
		addFlashMessage: PropTypes.func.isRequired
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.auth.authenticated
		};
	}

	function mapDispatchToProps(dispatch) {
		return bindActionCreators({ addFlashMessage: addFlashMessage}, dispatch);
	}

	return withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticate));
}