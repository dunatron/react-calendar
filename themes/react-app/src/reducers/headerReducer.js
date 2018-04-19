import moment from 'moment';

const initialMonth = moment().format('YYYY-MM-DD hh:mm');
const currentMonth = moment().format('MMMM');
const currentYear = moment().format('YYYY');
const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm');

const initialState = {
  currentDate: initialMonth,
  currentMonth: currentMonth,
  currentYear: currentYear,
  startOfMonth: startOfMonth,
  endOfMonth: endOfMonth
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INC_CURRENT_DATE_MONTH": {

      let Date = { ...state, currentDate: state.currentDate };

      // add in action.payload
      let newDate = moment(Date.currentDate).add(+1, 'M');

      return {
        ...state,
        currentDate: moment(newDate).format('YYYY-MM-DD hh:mm'),
        currentMonth: moment(newDate).format('MMMM'),
        currentYear: moment(newDate).format('YYYY'),
        startOfMonth: moment(newDate).startOf('month').format('YYYY-MM-DD hh:mm'),
        endOfMonth: moment(newDate).endOf('month').format('YYYY-MM-DD hh:mm')
      }
    }
    case "DEC_CURRENT_DATE_MONTH": {
      return {
        ...state,
        currentDate: moment(state.currentDate).add(-1, 'M').format('YYYY-MM-DD hh:mm'),
        currentMonth: moment(state.currentDate).add(-1, 'M').format('MMMM'),
        currentYear: moment(state.currentDate).add(-1, 'M').format('YYYY'),
        startOfMonth: moment(state.currentDate).add(-1, 'M').startOf('month').format('YYYY-MM-DD hh:mm'),
        endOfMonth: moment(state.currentDate).add(-1, 'M').endOf('month').format('YYYY-MM-DD hh:mm')
      }
    }
  }
  return state;

}