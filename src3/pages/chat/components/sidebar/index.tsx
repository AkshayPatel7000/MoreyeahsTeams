import { useNavigate } from "react-router-dom";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";

import SidebarAlert from "./alert";
import InboxContact from "./contacts";
import OptionsMenu from "../option-menu";
import SearchField from "../search-field";
import Icon from "common/components/icons";
import { useAppTheme } from "common/theme";
import { Inbox } from "common/types/common.type";
import { useChatContext } from "pages/chat/context/chat";
import {
  Actions,
  Avatar,
  ContactContainer,
  Header,
  ImageWrapper,
  SidebarContainer,
  ThemeIconContainer,
} from "./styles";
import { Auth_Store } from "store/auth.store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { handleSelectUser } from "services/Firebase/User.service";

function Sidebar() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const chatCtx = useChatContext();

  const handleChangeThemeMode = () => {
    theme.onChangeThemeMode();
  };

  const handleChangeChat = (chat: Inbox) => {
    handleSelectUser(chat);
    chatCtx.onChangeChat(chat);
    navigate("/" + chat.id);
  };

  return (
    <SidebarContainer>
      <Header>
        <ImageWrapper>
          <Avatar src={Auth_Store?.userCred?.profile?.image} />
        </ImageWrapper>
        <Actions>
          <ThemeIconContainer onClick={handleChangeThemeMode}>
            {theme.mode === "light" ? <BsMoon /> : <BsFillMoonFill />}
          </ThemeIconContainer>
          <button aria-label="Status">
            <Icon id="status" className="icon" />
          </button>
          <button aria-label="New chat">
            <Icon id="chat" className="icon" />
          </button>
          <OptionsMenu
            iconClassName="icon"
            className="icon"
            ariaLabel="Menu"
            iconId="menu"
            options={[
              "New group",
              "Create a room",
              "Profile",
              "Archived",
              "Starred",
              "Settings",
              "Log out",
            ]}
          />
        </Actions>
      </Header>
      {/* <SidebarAlert /> */}
      <SearchField />
      <ContactContainer>
        {Auth_Store?.userChatHistory?.map((inbox) => (
          <InboxContact
            key={inbox[0]}
            inbox={inbox[1].userInfo}
            isActive={inbox[1].userInfo.id === chatCtx.activeChat?.id}
            onChangeChat={handleChangeChat}
          />
        ))}
      </ContactContainer>
    </SidebarContainer>
  );
}
export default observer(Sidebar);
