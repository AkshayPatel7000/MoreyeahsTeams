import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { useEffect } from "react";
import { msalInstance } from "../../../App";
import { graphConfig, loginRequest } from "../../authConfig";
import AuthService from "./auth.service";

const instance = axios.create({
  baseURL: graphConfig.graphMeEndpoint,
});

const MsalInerceptor = ({ children }) => {
  const msal = useMsal();

  const createToken = async () => {
    try {
      const resp = await msalInstance.acquireTokenSilent({
        scopes: loginRequest.scopes,
        account: msalInstance.getActiveAccount(),
      });
      console.log("RESP_TOKEN_new - ", resp);
      localStorage.setItem(AuthService.key, resp.accessToken);
      return resp;
    } catch (error) {
      console.log("I AM HERRE");
      console.log("error - ", error);

      if (error instanceof InteractionRequiredAuthError) {
        console.log("first");
        authenticate();
      }
      return null;
    }
  };
  const authenticate = async () => {
    console.log("I AM AUTHENTICATE  ");
    const res = await msalInstance.acquireTokenPopup({
      scopes: loginRequest.scopes,
      account: msalInstance.getActiveAccount(),
      prompt: "select_account",
    });
  };

  useEffect(() => {
    const reqInterceptorFN = (request) => {
      let token = localStorage.getItem(AuthService.key);
      request.headers.Authorization = `Bearer ${token}`;
      return request;
    };
    const reqErrorInterceptorFN = (err) => {
      console.log("ERROR_REQUEST_ ", err);
    };

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = async (error) => {
      //  const getApiToken = () => {
      //     msal.instance
      //       .acquireTokenSilent({
      //         scopes: loginRequest.scopes,
      //       })
      //       .then((response) => {
      //          AuthService.setLogin(response.accessToken)
      //       })
      //       .catch((error) => {
      //         console.log("error=>>>>>>",error)
      //         if (error instanceof InteractionRequiredAuthError) {
      //           console.log("error=>>>>>>",error)
      //           msal.instance
      //             .acquireTokenPopup({
      //               scopes: loginRequest.scopes,
      //               prompt: 'select_account',
      //             })
      //             .then(function (response) {
      //                 AuthService.setLogin(response.accessToken)
      //             })
      //             .catch(function (error) {
      //               console.log(error);
      //             });
      //         }
      //       });

      // }
      if (error.message === "Network Error" || error.response?.status === 401) {
        const originalRequest = error.config;

        //  getApiToken()
        const tokenRes = await createToken();
        // if all work correctly

        console.log("res=>>>", tokenRes);
        return instance(originalRequest);
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);
    const reqInterceptor = instance.interceptors.request.use(
      reqInterceptorFN,
      reqErrorInterceptorFN
    );
    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { MsalInerceptor };
