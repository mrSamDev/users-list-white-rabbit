const getData = (state) => state?.authentication || {};

export const getCurrentUser = (state) => getData(state).userInfo;
export const currentUserLoading = (state) => getData(state).loading;
