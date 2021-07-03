import types from "./actionTypes";
import services from "../../utils/services-layer";
import { getUsersFromStore } from "./selectors";
import { USER_COLLECTION_LOCAL_STORAGE } from "../../constants";

const log = console.log;

export const getUsers = () => async (dispatch) => {
	try {
		dispatch({ type: types.USER_LIST_REQUEST });
		const userAvailableOnLocalStorage = localStorage.getItem(USER_COLLECTION_LOCAL_STORAGE);

		let users = userAvailableOnLocalStorage !== "null" && userAvailableOnLocalStorage !== null ? JSON.parse(userAvailableOnLocalStorage) : [];
		const shouldFetchFromService = users.length < 1;
		if (shouldFetchFromService) {
			const URL = "https://randomuser.me/api/0.8/?results=20";
			const response = await services.getData(URL);
			users = response.results;
			localStorage.setItem(USER_COLLECTION_LOCAL_STORAGE, JSON.stringify(users));
		}
		dispatch({ type: types.USER_LIST_SUCCESS, data: users });
	} catch (error) {
		log("error: [getUsers]", error);
	}
};

export const addUser = (payload) => async (dispatch, getState) => {
	try {
		const state = getState();
		let users = [...getUsersFromStore(state)];
		users.unshift({ user: payload });
		localStorage.setItem(USER_COLLECTION_LOCAL_STORAGE, JSON.stringify(users));
		dispatch({ type: types.USER_LIST_SUCCESS, data: users });
	} catch (error) {
		log("error: [addUser]", error);
	}
};
