import { Auth_Store } from "store/auth.store";
import { Users, Chat } from "./Collection";
import { firestore } from "./config";
import firebase from "firebase/compat/app";
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
