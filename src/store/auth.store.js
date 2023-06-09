import { makeAutoObservable } from "mobx";

class AuthStore {
  userCred = {};
  isLoggedIn = false;
  allusers = [];
  searchUsers = [];
  userMessages = [];
  userChatHistory = [];
  url = "";
  constructor() {
    makeAutoObservable(this);
  }
  setUserCred(value) {
    this.userCred = value;
  }
  setUserChatHistory(value) {
    this.userChatHistory = value;
  }
  setIsLoggedIn(value) {
    this.isLoggedIn = value;
  }
  setAllUsers(value) {
    this.allusers = value;
  }
  setSearchUser(value) {
    this.searchUsers = value;
  }
  setUserMessages = (value) => {
    this.userMessages = value;
  };
  setUrl = (value) => {
    this.url = value;
  };
  logout() {
    this.userCred = {};
    this.isLoggedIn = false;
    this.allusers = [];
    this.searchUsers = [];
    this.userMessages = [];
  }
}

export const Auth_Store = new AuthStore();
