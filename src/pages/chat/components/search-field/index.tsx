import Icon from "common/components/icons";
import { SearchWrapper, IconContainer, Input, SearchBox } from "./styles";
import { useCallback, useRef, useState, useEffect } from "react";
import { SearchUser, handleSelectUser } from "services/Firebase/User.service";
import { Auth_Store } from "store/auth.store";
import { toJS } from "mobx";
import InboxContact from "../sidebar/contacts";
import { useChatContext } from "pages/chat/context/chat";
import { useNavigate } from "react-router-dom";

type SearchFieldProps = {
  placeholder?: string;
  [x: string]: any;
};

export default function SearchField(props: SearchFieldProps) {
  const { placeholder, ...rest } = props;
  const { searchUsers } = Auth_Store;
  const [search, setSearch] = useState("");
  const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const inputRef = useRef<any>();
  const chatCtx = useChatContext();
  const navigate = useNavigate();
  const onClear = () => {
    setSearch("");
  };

  // useEffect(() => {
  //   const closeOpenMenus = (e)=>{
  //     if(inputRef.current && openSearchBox && !inputRef.current.contains(e.target)){
  //       setOpenSearchBox(false)
  //       Auth_Store.setSearchUser([])
  //     }
  // }
  //   document.addEventListener("mousedown", closeOpenMenus);
  //   return () => {
  //     document.removeEventListener("mousedown", closeOpenMenus);
  //   };
  // }, [openSearchBox])
  const handleChangeChat = (chat: any) => {
    console.log("chat=>>>>>>>>>>.", chat);
    handleSelectUser(chat);
    chatCtx.onChangeChat(chat);
    setOpenSearchBox(false);
    navigate("/" + chat.id);
  };

  const onSearch = async () => {
    await SearchUser(search);
    setOpenSearchBox(true);
  };
  return (
    <SearchWrapper {...rest}>
      <IconContainer>
        <Icon id="search" className="search-icon" />
        <button className="search__back-btn" onClick={onClear}>
          <Icon id="back" />
        </button>
      </IconContainer>
      <Input
        ref={inputRef}
        placeholder={placeholder ?? "Search or start a new chat"}
        onKeyDown={(e) => {
          e.keyCode === 13 && onSearch();
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {openSearchBox && (
        <SearchBox>
          {searchUsers.map((users: any, index: any) => (
            <InboxContact
              key={users.id}
              inbox={users}
              isActive={users.id === chatCtx.activeChat?.id}
              onChangeChat={handleChangeChat}
            />
          ))}
        </SearchBox>
      )}
    </SearchWrapper>
  );
}
