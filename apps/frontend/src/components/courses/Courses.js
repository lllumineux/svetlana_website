import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourses } from '../../actions/courses';

export class Courses extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    return (
      <Fragment>
        <h2>Courses</h2>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
});

export default connect(mapStateToProps, { getCourses })(Courses);