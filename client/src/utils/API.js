import axios from 'axios';

export default {
    getUser: () => {
        return axios.get("/user/");
    },
    postUserData: (newUserData) => {
        return axios.post("/user/newUser", newUserData);
    },
    postUserLogin: (loginInput) => {
        return axios.post("/user/checkLogin", loginInput);
    },
    postLogout: (logoutUser) => {
        return axios.post("/user/logout", logoutUser); 
    },
    postBio: (userBio) => {
        return axios.post("/user/bio", userBio);
    },
    getBio: (userId) => {
        return axios.get("/user/bio", userId);
    },
};