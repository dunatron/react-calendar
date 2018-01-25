import undoable from 'redux-undo';

const tags = (state = 0, action) => {
  switch (action.type) {
    case 'CHECK':
      return state;
    case 'TOGGLE_TAG':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        checked: !state.checked
      }
    default:
      return state
  }
};

const undoableTags = undoable(tags);

export default undoableTags;