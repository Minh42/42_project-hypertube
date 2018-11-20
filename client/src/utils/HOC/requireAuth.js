import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';
import { withNamespaces } from 'react-i18next';
import Aux from './Aux';

export default function(ComposedComponent) {
	class Authenticate extends Component {
		componentDidMount() {
			const { t } = this.props; 
			if (!this.props.isAuthenticated) {
				izitoast.error({
					message: t('Izitoast.access', { framework: "react-i18next" }),
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
				<Aux>
					{this.props.isAuthenticated && <ComposedComponent { ...this.props } />}
				</Aux>
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

	return withNamespaces('common')(withRouter(connect(mapStateToProps, null)(Authenticate)));
}