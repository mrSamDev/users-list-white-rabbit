const getData = (state) => state?.users || {};

export const getUsersFromStore = (state) => getData(state).data;
export const getUsersLoadingStateFromStore = (state) => getData(state).loading;
