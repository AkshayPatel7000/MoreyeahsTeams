import { makeAutoObservable } from "mobx";

class AuthStore {
  userCred = {};
  isLoggedIn = false;
  allusers = [];
  searchUsers = [];
  userMessages = [];
  constructor() {
    makeAutoObservable(this);
  }
  setUserCred(value) {
    this.userCred = value;
  }
  setIsLoggedIn(value) {
    this.isLoggedIn = value;
  }
  setAllUsers(value) {
    this.allusers = value;
    this.searchUsers = value;
  }
  setUserMessages = (value) => {
    this.userMessages = value;
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
