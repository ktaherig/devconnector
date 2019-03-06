import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import {container} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldOfStudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
			/**
			 * If they click the "disabled" option, then
			 * that's going to set the "current" status
			 * to be "true", so that the "to" field
			 * is greyed out, since they're still there
			 */
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldOfStudy: this.state.fieldOfStudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addEducation(eduData, this.props.history);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onCheck(e) {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">Add any school or other institution of learning which you've attended in the past or which is in progress</p>
							<small className="d-block pb-3">* = Required</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of Study"
									name="fieldOfStudy"
									value={this.state.fieldOfStudy}
									onChange={this.onChange}
									error={errors.fieldOfStudy}
								/>
								<h6>From Date:</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>To Date:</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input 
										type="checkbox" 
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Current
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us a little bit about the program"
								/>
								<input 
									type="submit" 
									value="Submit" 
									className="btn btn-info btn-block mt-4" 
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));