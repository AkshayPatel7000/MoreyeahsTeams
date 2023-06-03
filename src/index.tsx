import App from "App";
import { MainPageLoader } from "common/components/loader";
import AppThemeProvider from "common/theme";
import GlobalStyle from "global-styles";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppThemeProvider>
    <GlobalStyle />
    <Suspense fallback={<MainPageLoader />}>

        <App />
      
    </Suspense>
  </AppThemeProvider>
);
