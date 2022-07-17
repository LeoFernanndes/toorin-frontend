
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from "axios";


// const API_URL = process.env.NEXT_PUBLIC_ENDPOINT_AUTH;
const API_URL = 'http://192.168.33.10:8000/token';

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
                const rs = await axios.post(`${API_URL}/refresh/`, {
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