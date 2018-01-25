let nextTagId = 0;

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTag = (id) => ({
  type: 'TOGGLE_TAG',
  id
});