import AdminCollection from '../constants/adminCollection.json';

const errorMessage = {error: true, message: 'Username / Password is incorrect '};

const signInWithUsernameAndPassword = (payload) => {
  return new Promise((resolve, reject) => {
    const adminUsers = AdminCollection.results;
    const userDetail = adminUsers.find((user) => user.username === payload.username);
    if (userDetail) {
      const passwordMatched = userDetail.password === payload.password;
      if (passwordMatched) resolve({success: true, data: payload});
      else reject(errorMessage);
    } else reject(errorMessage);
  });
};

const getData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const services = {signInWithUsernameAndPassword, getData};

export default services;
