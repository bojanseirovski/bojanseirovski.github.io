import axios from 'axios';
import configData from "../config/config.json"

const api = axios.create({
    baseURL: configData.apiUrl,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const { accessToken } = rs.data;
                    window.localStorage.setItem("accessToken", accessToken);
                    api.defaults.headers.common["x-access-token"] = accessToken;

                    return api(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export default api;

function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
}

function refreshToken() {
    return api.post("/token/refresh", {
        refreshToken: getLocalRefreshToken(),
    });
}

export const getLocalAccessToken = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    return accessToken;
}

export const getUid = () => {
    return window.localStorage.getItem("uid");;
}

export const loginReq = (username: string, password: string, done:any, err:any) => {
    api.post("/token", {
        username: username,
        password: password
    })
    .then(response => {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const uid = response.data.uid;

        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("uid", uid);

        if (done) {
            done();
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const registerReq = (username: string, password: string, done:any, err:any) => {
    api.post("/register", {
        username: username,
        password: password
    })
    .then(response => {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const uid = response.data.uid;

        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("uid", uid);

        if (done) {
            done();
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const getColoringsReq = (done:any, err:any) => {
    api.get("/data")
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const getOneColoringReq = (id:number, done:any, err:any) => {
    api.get("/data?coloring="+id)
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const saveColoringsReq = (image: string) => {
    return api.post("/data", {
        "coloring": image,
        "uid":getUid()
    });
}