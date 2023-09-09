import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from "axios";


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/token`;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const authApiResponse = JSON.parse(localStorage.getItem("authApiResponse") || '{"access": "", "refresh": ""}');
    config.headers!["Authorization"] = `Bearer ${authApiResponse.access}`;
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError | any> => { // dar uma olhada nesse tipo any da resposta com token expirado
    if (error.response) {
        console.log(JSON.stringify(localStorage))
        // Access Token was expired
        if (
        error.response.status === 401 &&
        error.response.data.messages[0].message === "Token is invalid or expired"
        ) {      
            const authApiResponse = JSON.parse(localStorage.getItem("authApiResponse") || '{"access": "", "refresh": ""}');
           
            try {
                const rs = await axios.post(`${API_BASE_URL}/refresh/`, {
                refresh: authApiResponse.refresh,
                });
                const tokenResponse = rs.data;
                authApiResponse['access'] = tokenResponse['access']                
                localStorage.setItem("authApiResponse", JSON.stringify(authApiResponse));
                error.config.headers!['Authorization'] = `Bearer ${authApiResponse.access}`
                return axios.request(error.config);
            } catch (_error) {
                return Promise.reject(_error);
            }
        }
    }
    return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};