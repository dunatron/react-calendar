import React, { Component } from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import HelperAlert from '../components/HelperAlert'

// Steps
import DetailsStep from '../components/CreateEvent/DetailsStep';
import DateTimeStep from '../components/CreateEvent/DateTimeStep';
import MediaStep from '../components/CreateEvent/MediaStep';
import ReviewStep from '../components/CreateEvent/ReviewStep';

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
  return ['Event Details', 'Date & Time', 'Event Media', 'Review Event'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DetailsStep />;
    case 1:
      return <DateTimeStep />;
    case 2:
      return <MediaStep />;
    case 3:
      return <ReviewStep />;
    default:
      return 'Unknown step';
  }
}

function getStepHelp(step) {
  switch (step) {
    case 0:
      return <HelperAlert header="Event Details" message="Please enter 
      the event Title, Description and also please pick a category" />;
    case 1:
      return <HelperAlert header="Date & Times" message="Please select the event Date, Start time, and Finish time.
       You can add multiple rows of event date times" />;
    case 2:
      return <HelperAlert header="Event Image" message="Please upload your event image by dragging it into the draggable area
       or by clicking the draggable area and choosing your image" />;
    case 3:
      return <HelperAlert header="Review Event" message="Please Review your event Details are correct before submitting your event" />;
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

  processEvent = async () => {
    // 1. finish the Steps with handleNext action
    this.handleNext()
    // 2. prepare the data to be uploaded as single events
    // 3. perform a graphQL Mutation
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
                  <StepLabel>{label}{getStepHelp(index)}</StepLabel>
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
                          {/*{activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                        </Button>

                        {activeStep === steps.length - 1
                          ?
                          <Button
                          variant="raised"
                          color="primary"
                          onClick={() => this.processEvent()}
                          className={classes.button}>Finish</Button>
                          :
                          <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}>Next</Button>
                        }
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
