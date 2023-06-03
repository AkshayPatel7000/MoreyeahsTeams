import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import ChatProvider from "pages/chat/context/chat";
import { AuthenticatedTemplate } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import { Auth_Store } from "store/auth.store";
const ChatPage = React.lazy(() => import("pages/chat/chat-room-page"));
const UnSelectedChatPage = React.lazy(() => import("pages/chat/unselected-page"));
const Signup = React.lazy(() => import("pages/signup/Signup"));
const AuthEelement = ({ children }) => {
  return <>{children}</>;
};
const Auth_router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
const App_router = createBrowserRouter([
  {
    path: "/:id",
    element: (
      <AuthEelement>
        <ChatPage />
      </AuthEelement>
    ),
  },
  {
    path: "/",
    element: (
      <AuthEelement>
        <UnSelectedChatPage />
      </AuthEelement>
    ),
  },
]);
function AppRoutes() {
  return (
    <ChatProvider>
      <RouterProvider router={Auth_Store?.isLoggedIn ? App_router : Auth_router} />
    </ChatProvider>
  );
}
export default observer(AppRoutes);
