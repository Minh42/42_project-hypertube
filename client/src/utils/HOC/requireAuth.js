import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

export default function(ComposedComponent) {
	class Authenticate extends Component {
		componentDidMount() {
			if(!this.props.isAuthenticated) {
				izitoast.error({
					message: 'You need to login to access this page',
					position: 'topRight'
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
		isAuthenticated: PropTypes.bool
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.auth.authenticated
		};
	}

	return withRouter(connect(mapStateToProps, null)(Authenticate));
}