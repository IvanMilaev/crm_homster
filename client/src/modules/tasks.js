import { TASK_GRAPH_NODE_DETAIL } from "./types";

const initialState = {
  nodeDetail: "Detailisation here"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TASK_GRAPH_NODE_DETAIL:
      return {
        ...state,
        nodeDetail: "update information " + action.payload
      };

    default:
      return state;
  }
};

export const selectNode = node => {
  console.log("выбрали ноду");
  return dispatch => {
    dispatch({
      type: TASK_GRAPH_NODE_DETAIL,
      payload: node
    });
  };
};
