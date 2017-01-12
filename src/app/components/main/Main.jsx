import React, { PropTypes } from 'react';
import { Container, Grid } from 'semantic-ui-react';

function Main({ someValue }) {
  return (
    <Container fluid>
      <Grid padded>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <Container>I'm just some text in a column. Yup, that's me.</Container>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <Container>Also a column here printing a prop: {someValue}</Container>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

Main.PropTypes = {
  someValue: PropTypes.string,
};

export default Main;
