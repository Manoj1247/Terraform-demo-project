import axios from "axios";
import { API_URL, GET, AUTH_TOKEN_NAME, HTTP_TIMEOUT } from "~config/url";

const apiService = async (
    url,
    { headers = {}, params = {}, method = GET, baseUrl = null } = {}
) => {
    const config = {
        url,
        baseURL: baseUrl ?? API_URL,
        timeout: HTTP_TIMEOUT,
        headers: {
            "Content-type": "application/json",
            ...headers,
        },
        method,
        [method === GET ? "params" : "data"]: params,
    };

    const authToken = localStorage.getItem(AUTH_TOKEN_NAME);
    // if auth then set the token
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    const onSuccess = (response) => {
        // console.log(data);
        return !("data" in response) ? {} : response.data;
    };
    const onError = (error) => {
        // console.log(error);
        return Promise.reject(error?.message ? error.message : "Network Error");
    };

    return axios(config).then(onSuccess).catch(onError);
};

export default apiService;
