import React, { useEffect } from "react";
import AppRoutes from "routes";
import useAppLoad from "common/hooks/useAppLoad";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "services/authConfig";
import { MsalInerceptor } from "services/core/services/MsalInterceptor";
import { MsalProvider } from "@azure/msal-react";
import { Auth_Store } from "store/auth.store";
import { observer } from "mobx-react-lite";
import { GetAllUsers, getMyChats } from "services/Firebase/User.service";
const SplashPage = React.lazy(() => import("pages/splash"));
export const msalInstance = new PublicClientApplication(msalConfig);
function App() {
  const { isLoaded, progress } = useAppLoad();
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    var userCred = await localStorage.getItem("userCred");
    let subscriber = "";
    if (userCred) {
      Auth_Store.setUserCred(JSON.parse(userCred));
      Auth_Store.setIsLoggedIn(true);
      await GetAllUsers();
      subscriber = await getMyChats();
    } else {
      Auth_Store.setUserCred({});
      Auth_Store.setIsLoggedIn(false);
    }
    return () => subscriber();
  };
  // if (!isLoaded) return <SplashPage progress={progress} />;
  return (
    <MsalInerceptor>
      <MsalProvider instance={msalInstance}>
        <AppRoutes />
      </MsalProvider>
    </MsalInerceptor>
  );
}
export default observer(App);
