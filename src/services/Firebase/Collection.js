import { firestore } from "./config";

const Users = firestore.collection("users");
const Chat = firestore.collection("chat");
const UsersChat = firestore.collection("usersChat");
const Url = firestore.collection("url");

export { Users, Chat, UsersChat, Url };
