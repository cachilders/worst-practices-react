import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { sampleExport } from '../actions/index';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(sampleExport());
  }

  render() {
    return (
      <Container fluid>
        {React.cloneElement(this.props.children, { ...this.props })}
      </Container>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object,
  someValue: PropTypes.string,
  dispatch: PropTypes.function,
};

function mapStateToProps(state) {
  const { someValue } = state.shrg;
  return {
    someValue,
  };
}

export default connect(mapStateToProps)(App);
