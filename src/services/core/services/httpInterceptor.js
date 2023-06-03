// import axios from "axios";
// import { graphConfig, msalConfig } from "../../authConfig";
// import AuthService from "./auth.service";
// import { useMsal } from "@azure/msal-react";
// import { useCallback, useState } from "react";
// import { InteractionRequiredAuthError } from "@azure/msal-browser";
// import { GetApiToken, getApiToken } from "./msaltoken";
// import { loginRequest } from "../../authConfig";
// let token = localStorage.getItem(AuthService.key);

// export class UtilSetter {
//   static createToken= null;

//   static setCreateToken(createToken) {
//     this.createToken = createToken;
//   }
// }
// export const useCustomSAML = () => {
//   const msal = useMsal();

//   const createToken = async () => {
//     try {
//       const resp = await msal.instance.acquireTokenSilent({
//         scopes: loginRequest.scopes,
//       });
//       return resp;
//     } catch (error) {
//       console.log("I AM HERRE");
//       console.log("error - ", error)
//       if (error instanceof InteractionRequiredAuthError) {
//         authenticate();
//       }
//       return null;
//     }
//   };

//   const authenticate = async () => {
//     console.log("I AM AUTHENTICATE  ")
//     const res = await msal.instance.acquireTokenPopup({
//       scopes:loginRequest.scopes,
//       prompt: "select_account",
//     });
//   };
//   return {
//     msal,
//     createToken,
//     authenticate
//   }
// };
// const MsService = axios.create({
//   baseURL: graphConfig.graphMeEndpoint,
//   headers: {
//     "Authorization":`Bearer ${token}`
//   },
// });
// MsService.interceptors.request.use(async (config) => {
//   return config;
// });
// // async function refreshAccessToken() {
// //     try {
// //       const response = await axios.post(refreshTokenEndpoint, {
// //         refresh_token: refreshToken
// //       });
// //       accessToken = response.data.access_token;
// //     } catch (err) {
// //       console.error(err);
// //       throw err;
// //     }
// //   }

// MsService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log("Intercepted");
    
   
//     const originalRequest = error.config;



//     if (error.message === "Network Error" || error.response?.status === 401) {
//       // getApiToken();
//       const tokenRes = await UtilSetter.createToken();
//       AuthService.setLogin(tokenRes.accessToken)
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
// export default MsService;
