import Sidebar from "../components/sidebar";
import { App, Content } from "./styles";

export default function ChatLayout(props: { children: any }) {
  return (
    <App>
      {/* <Message>Currently Only available on desktop or large devices 😊.</Message> */}
      <Content>
        <Sidebar />
        {props.children}
      </Content>
    </App>
  );
}
