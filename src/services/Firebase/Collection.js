import { firestore } from "./config";

const Users = firestore.collection("users");
const Chat = firestore.collection("chat");

export { Users, Chat };
