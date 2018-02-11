export function startFetchTags() {
  return {
    type: "START_FETCH_TAGS",
  }
}

export function fetchTags(tags) {
  return {
    type: "FETCH_INITIAL_TAGS",
    payload: tags
  }
}

export function toggleSecondaryTag(tagTitle) {
  return {
    type: "TOGGLE_SECONDARY_TAG",
    payload: tagTitle
  }
}

export function addFilterTag(tag) {
  return {
    type: "ADD_FILTER_TAG",
    payload: tag
  }
}

export function removerFilterTag(tag) {
  return {
    type: "REMOVE_FILTER_TAG",
    payload: tag
  }
}