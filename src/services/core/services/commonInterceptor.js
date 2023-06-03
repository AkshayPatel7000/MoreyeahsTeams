import axios from "axios";
import React from 'react'
import { emossyConfig } from "../../authConfig";
import AuthService from "./auth.service";

const CommonIns = axios.create({
    baseURL: emossyConfig.emossyEndpoint,
  });
  CommonIns.interceptors.request.use((config) => {
    let access_token=localStorage.getItem(AuthService.Authkey)
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
    });
    CommonIns.interceptors.response.use(
        (response) => response,
        (error) => {
          const originalRequest = error.config;
      
        //   if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     return refreshAccessToken().then(() => {
        //       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        //       return axios(originalRequest);
        //     });
        //   }
      
          return Promise.reject(error);
        }
      );  
export default CommonIns