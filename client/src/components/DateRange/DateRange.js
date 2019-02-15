import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.jsx";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import moment from 'moment';
import 'moment/locale/ru';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit * 4,
  },
});

const isDatesSelected = ({ startDate, endDate }) => {
  if(startDate !== null && endDate !== null) return true
  return false
}

class DateRange extends Component {

  state = {
    startDate: this.props.default_state !== undefined ? this.props.default_state.stdate : null,
    endDate: this.props.default_state !== undefined ? this.props.default_state.fndate : null,
    focusedInput: null,
    isDatesSelected: this.props.default_state !== undefined ? true : false
   }

  

  handleSubmit = () => {
    this.props.action({stdate: this.state.startDate.format('YYYY-MM-DD'), fndate: this.state.endDate.format('YYYY-MM-DD') });
  }

  render(){
    const { classes } = this.props;
    return(

        <form className={classes.container} noValidate>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => {
              this.setState({ startDate, endDate });
              if (isDatesSelected({ startDate, endDate })) this.setState({ isDatesSelected: !this.state.isDatesSelected })
             }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
            startDatePlaceholderText="С"
            endDatePlaceholderText="По"
            isOutsideRange={() => false}
            onClose={this.handleSubmit}
            enableOutsideDays
          />
      </form>

    )
  }
}

DateRange.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  default_state: PropTypes.shape({
    stdate: PropTypes.instanceOf(moment),
    fndate: PropTypes.instanceOf(moment)
  })
}

export default withStyles(styles)(DateRange);
