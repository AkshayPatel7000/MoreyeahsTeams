import { Auth_Store } from "store/auth.store";
import { Users, Chat, UsersChat } from "./Collection";
import firebase from "firebase/compat/app";
import { toJS } from "mobx";
export const GetAllUsers = async () => {
  try {
    console.log("first", Auth_Store.isLoggedIn);
    if (Auth_Store.isLoggedIn) {
      Users.where(
        firebase.firestore.FieldPath.documentId(),
        "!=",
        Auth_Store?.userCred?.profile?.id
      )
        .get()
        .then((res) => {
          if (!res.empty) {
            var allUsers = res?.docs?.map((resp) => resp.data());

            Auth_Store.setAllUsers(allUsers);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ file: User.service.js:12 ~ GetAllUsers ~ err:", err);
        });
    }
  } catch (error) {
    console.log("🚀 ~ file: User.service.js:32 ~ GetAllUsers ~ error:", error);
  }
};

export const GetUserChats = (docId = "kvigcDM2v4fLQVD1lTXm") => {
  try {
    const { profile } = Auth_Store.userCred;
    return Chat.doc(docId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((documentSnapshot) => {
        if (!documentSnapshot?.empty) {
          var allmesages = documentSnapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
            timestamp: new Date(item.data().timestamp).toLocaleTimeString(),
            date: new Date(item.data().date).toLocaleDateString(),
            isOpponent: profile?.id === item.data()?.reciverId ? true : false,
          }));
          MarkAsRead(docId, allmesages);

          Auth_Store.setUserMessages(arrayspliter(allmesages));
          return documentSnapshot;
          // var chats = res?.docs?.map((resp) => resp.data());
        } else {
          Auth_Store.setUserMessages([]);
        }
      });
  } catch (error) {
    console.log("🚀 ~ file: User.service.js:43 ~ GetUserChats ~ error:", error);
  }
};
export const messageSend = ({ reciverId, message }) => {
  const { profile } = Auth_Store.userCred;
  console.log("---->", firebase.firestore.Timestamp.now(new Date()).seconds * 1000);
  var docId = profile.id > reciverId ? reciverId + "-" + profile.id : profile.id + "-" + reciverId;
  var today = new Date(firebase.firestore.Timestamp.now().toDate()).toISOString();
  var time = firebase.firestore.Timestamp.now(new Date()).seconds * 1000;

  const body = {
    body: message,
    date: today,
    timestamp: time,
    messageStatus: "SENT",
    senderId: profile.id,
    reciverId: reciverId,
    isOpponent: true,
  };
  Chat.doc(docId).collection("messages").doc().set(body);
};

export const MarkAsRead = (docId, allmesages) => {
  try {
    var filteredData = allmesages?.filter((ele) => ele.isOpponent && ele.messageStatus === "SENT");

    const { profile } = Auth_Store.userCred;
    filteredData.map((item) => {
      Chat.doc(docId).collection("messages").doc(item?.id).update({ messageStatus: "READ" });
    });
    // Chat.doc(docId)
    //   .collection("messages").doc()
  } catch (error) {
    console.log("🚀 ~ file: User.service.js:81 ~ MarkAsRead ~ error:", error);
  }
};

export const arrayspliter = (msgData) => {
  const data = msgData;
  var today = new Date().toLocaleDateString();
  // Divide the array into subarrays based on the date
  const subArrays = data?.reduce((acc, obj) => {
    const { date } = obj;

    var isToday = today == date ? "TODAY" : date;
    if (!acc[isToday]) {
      acc[isToday] = [];
    }
    acc[isToday].push(obj);
    return acc;
  }, {});

  // Convert the resulting object into an array of subarrays

  const sortedKeys = Object.keys(subArrays).sort();

  // Create a new object with sorted keys
  const sortedData = {};
  sortedKeys.forEach((key) => {
    sortedData[key] = subArrays[key];
  });

  console.log(sortedData);

  return sortedData;
};

export const handleSelectUser = async (user) => {
  const { profile } = Auth_Store.userCred;

  //check whether the group(chats in firestore) exists, if not create
  const combinedId = profile.id > user.id ? profile.id + "-" + user.id : user.id + "-" + profile.id;

  try {
    const res = await Chat.doc(combinedId).get();
    console.log("user->>", res.exists);
    if (!res.exists) {
      await Chat.doc(combinedId).collection("messages").get();

      await UsersChat.doc(profile.id).update({
        [combinedId + ".userInfo"]: {
          id: user.id,
          name: user.name,
          image: user.image,
          email: user.email,
        },
        [combinedId + ".date"]: firebase.firestore.Timestamp.now().seconds,
      });

      await UsersChat.doc(user.id).update({
        [combinedId + ".userInfo"]: {
          id: profile.id,
          name: profile.name,
          image: profile.image,
          email: profile.email,
        },
        [combinedId + ".date"]: firebase.firestore.Timestamp.now().seconds,
      });
    } else console.log("Not exisit");
  } catch (err) {
    console.log("🚀 ~ file: User.service.js:171 ~ handleSelect ~ err:", err);
  }
};

export const getMyChats = async () => {
  try {
    const { profile } = Auth_Store.userCred;
    var myChatUsers = UsersChat.doc(profile.id).onSnapshot((documentSnapshot) => {
      if (!documentSnapshot?.empty) {
        console.log("🚀 ~ file: User.service.js:165 ~ myChatUsers ~ m:", documentSnapshot.data());
        var finalUsersChat = Object.entries(documentSnapshot.data())
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return chat;
          });
        Auth_Store.setUserChatHistory(finalUsersChat);
        // console.log(finalUsersChat);
      }
    });
  } catch (error) {
    console.log("🚀 ~ file: User.service.js:164 ~ getMyChats ~ error:", error);
  }
};
export const SearchUser = async (query) => {
  try {
    if (query?.trim() !== "") {
      const record = toJS(Auth_Store.allusers);
      var serchData = searchByFields(record, query, ["name"]);
      Auth_Store.setSearchUser(serchData);
    } else {
      Auth_Store.setSearchUser(Auth_Store.allusers);
    }

    console.log("🚀 ~ file: User.service.js:181 ~ SearchUser ~ serchData:", toJS(serchData));
  } catch (error) {
    console.log("🚀 ~ file: User.service.js:181 ~ SearchUser ~ error:", error);
  }
};
export const searchByFields = (arr, input, keyArr) => {
  const results = arr?.filter(function (p) {
    if (input?.length == 0) return false;
    if (keyArr?.length > 0) {
      var data = keyArr.map((ele) => p[ele]).join(" ");
      return data.match(new RegExp(input, "i"));
    }
    return Object.values(p).join(" ").match(new RegExp(input, "i"));
  });
  return results;
};
