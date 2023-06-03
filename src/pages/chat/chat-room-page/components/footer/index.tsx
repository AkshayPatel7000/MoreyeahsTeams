import { useState } from "react";
import Icon from "common/components/icons";
import {
  AttachButton,
  Button,
  ButtonsContainer,
  IconsWrapper,
  Input,
  SendMessageButton,
  Wrapper,
} from "./styles";
import { arrayspliter, messageSend } from "services/Firebase/User.service";
import { useParams } from "react-router-dom";

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];

export default function Footer() {
  const [showIcons, setShowIcons] = useState(false);
  const [input, setInput] = useState("");
  const params = useParams();

  const onMessageSent = () => {
    messageSend({
      message: input,
      reciverId: params?.id,
    });
    setInput("");
  };
  return (
    <Wrapper>
      <IconsWrapper>
        <AttachButton onClick={() => setShowIcons(!showIcons)}>
          <Icon id="attach" className="icon" />
        </AttachButton>
        <ButtonsContainer>
          {attachButtons.map((btn) => (
            <Button showIcon={showIcons} key={btn.label}>
              <Icon id={btn.icon} />
            </Button>
          ))}
        </ButtonsContainer>
      </IconsWrapper>
      <Input
        placeholder="Type a message here .."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && onMessageSent()}
      />
      <SendMessageButton onClick={onMessageSent}>
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
