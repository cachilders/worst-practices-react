import axios from 'axios'; // You know, for XHR

export const SAMPLE_ACTION = 'SAMPLE_ACTION';

function sampleAction(value) {
  return {
    type: SAMPLE_ACTION,
    value,
  };
}

export function sampleExport() {
  return (dispatch, getState) => {
    if (getState() !== { someValue: 'shrg' }) {
      return dispatch(sampleAction({ someValue: 'shrg' }));
    }
  };
}
