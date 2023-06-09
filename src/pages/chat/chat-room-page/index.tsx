import ChatLayout from "../layouts";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Icon from "common/components/icons";
import useChatRoom from "./hooks/useChatRoom";
import ProfileSection from "./components/profile";
import MessagesList from "./components/messages-list";
import SearchSection from "./components/search-section";
import useNavigateToChat from "./hooks/useNavigateToChat";
import { Container, Body, Background, FooterContainer, ScrollButton } from "./styles";
import { Auth_Store } from "store/auth.store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Users } from "services/Firebase/Collection";

function ChatRoomPage() {
  const {
    activeInbox,
    handleMenuOpen,
    handleShowIcon,
    isProfileOpen,
    isSearchOpen,
    isShowIcon,
    setIsProfileOpen,
    setIsSearchOpen,
    setShouldScrollToBottom,
    shouldScrollToBottom,
  } = useChatRoom();
  const [isOnline, setisOnline] = useState(false);
  useNavigateToChat(activeInbox);
  const { profile } = Auth_Store.userCred;
  var socket = null;
  socket = io(Auth_Store.url);
  const socketConnection = () => {
    socket.on("connect", () => {
      console.log("successfully connected with socket io server");
      console.log(socket.id);
    });
  };
  let sub = null;
  useEffect(() => {
    sub = isUserOnline();
    socketConnection();
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    window.addEventListener("beforeunload", onBlur);
    // Specify how to clean up after this effect:
    return () => {
      sub();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("beforeunload", onBlur);
    };
  }, []);
  const onFocus = () => {
    console.log(profile?.id, "profile?.id");
    socket.emit("online", profile?.id);
  };
  const onBlur = () => {
    socket.emit("offline", profile?.id);
  };
  const isUserOnline = () => {
    try {
      Users?.doc(activeInbox.id).onSnapshot((snap) => {
        //snap.data()
        setisOnline(snap?.data()?.isOnline);
        console.log("🚀 ~ file: index.tsx:67 ~ Users.doc ~ snap.data():", snap.data());
      });
    } catch (error) {
      setisOnline(false);
      console.log("🚀 ~ file: index.tsx:66 ~ isUserOnline ~ error:", error);
    }
  };
  return (
    <ChatLayout>
      <Container>
        <Body>
          <Background />
          <Header
            title={activeInbox?.name ?? ""}
            image={activeInbox?.image ?? ""}
            subTitle={isOnline ? "Online" : "Offline"}
            onSearchClick={() => handleMenuOpen("search")}
            onProfileClick={() => handleMenuOpen("profile")}
          />
          <MessagesList
            onShowBottomIcon={handleShowIcon}
            shouldScrollToBottom={shouldScrollToBottom}
          />
          <FooterContainer>
            {isShowIcon && (
              <ScrollButton onClick={() => setShouldScrollToBottom(true)}>
                <Icon id="downArrow" />
              </ScrollButton>
            )}
            <Footer />
          </FooterContainer>
        </Body>
        <Sidebar title="Search" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
          <SearchSection />
        </Sidebar>
        <Sidebar
          title="Contact Info"
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        >
          <ProfileSection name={activeInbox?.name ?? ""} image={activeInbox?.image ?? ""} />
        </Sidebar>
      </Container>
    </ChatLayout>
  );
}
export default observer(ChatRoomPage);
