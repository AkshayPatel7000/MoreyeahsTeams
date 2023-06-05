import { forwardRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import Icon from "common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { getMessages, Message } from "./data/get-messages";
import {
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  Date,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";
import { GetUserChats } from "services/Firebase/User.service";
import { Auth_Store } from "store/auth.store";
import { observer } from "mobx-react-lite";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
};

function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom } = props;
  var currentUserId = Auth_Store.userCred?.profile?.id;

  const params = useParams();
  // const messages = useMemo(() => {
  //   return getMessages();
  //   // eslint-disable-next-line
  // }, [params.id]);
  var docId =
    currentUserId > params.id ? params.id + "-" + currentUserId : currentUserId + "-" + params.id;
  useEffect(() => {
    const subscriber = GetUserChats(docId);
    return () => subscriber();
  }, [params.id]);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );

  return (
    <Container ref={containerRef}>
      <EncryptionMessage>
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even MoreYeahs Teams,
        can read or listen to them. Click to learn more.
      </EncryptionMessage>

      <>
        {Object.keys(Auth_Store?.userMessages).map((item) => {
          return (
            <div key={item}>
              <DateWrapper>
                <Date> {item} </Date>
              </DateWrapper>
              <MessageGroup>
                {Auth_Store?.userMessages[item]?.map((message, i) => {
                  if (i === Auth_Store?.userMessages.length - 1) {
                    return (
                      <SingleMessage key={message.id} message={message} ref={lastMessageRef} />
                    );
                  } else {
                    return <SingleMessage key={message.id} message={message} />;
                  }
                })}
              </MessageGroup>
            </div>
          );
        })}
      </>
    </Container>
  );
}
export default observer(MessagesList);
const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
      <span>{message.body}</span>
      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {!message.isOpponent && (
          <Icon
            id={`${message.messageStatus === "SENT" ? "singleTick" : "doubleTick"}`}
            className={`chat__msg-status-icon ${
              message.messageStatus === "READ" ? "chat__msg-status-icon--blue" : ""
            }`}
          />
        )}
      </ChatMessageFooter>
    </ChatMessage>
  );
});
