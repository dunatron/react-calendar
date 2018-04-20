import React, { Component } from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Steps
import DetailsStep from '../components/CreateEvent/DetailsStep';
import DateTimeStep from '../components/CreateEvent/DateTimeStep';
import MediaStep from '../components/CreateEvent/MediaStep';

const styles = theme => ({

  root: {
    //width: '100%',
    height: 'calc(100% -70px)'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    'background-color': 'transparent'
  },
  createEventContainer: {

    overflowX: 'scroll'
  },
  [theme.breakpoints.up('md')]: {
    createEventContainer: {
      overflowX: "hidden",
      height: `calc(100% - ${theme.spec.menuDesktopHeight}px)`,
    }
  },

});

function getSteps() {
  return ['Event Details', 'Date & Time', 'Event Media'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DetailsStep />;
    case 1:
      return <DateTimeStep />;
    case 2:
      return <MediaStep />;
    default:
      return 'Unknown step';
  }
}

class CreateEventContainer extends Component {

  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


  render() {

    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.createEventContainer}>
        <div className={`${classes.root} ${classes.paper}`}>
          <Stepper
            className={`${classes.root} ${classes.paper}`}
            activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          color="primary"
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

CreateEventContainer.propTypes = {
  classes: PropTypes.object,
};

export default compose(
  withApollo,
  withStyles(styles)
)(CreateEventContainer);
