import Sidebar from "../components/sidebar";
import { App, Content, Message } from "./styles";

export default function ChatLayout(props: { children: any }) {
  var isMobile = window.innerWidth;
  return (
    <App>
      <Message>Currently Only available on desktop or large devices 😊.</Message>
      {isMobile > 500 ? (
        <Content>
          <Sidebar />
          {props.children}
        </Content>
      ) : (
        <Content>{props.children}</Content>
      )}
    </App>
  );
}
