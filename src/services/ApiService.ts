import axios, { AxiosResponse } from 'axios';


// Axios instance with base configuration (you can configure this as needed)
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5036/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const fetchData = async <T>(endpoint: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


export const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
    } else {
        console.error('Unexpected error:', error);
    }
};
