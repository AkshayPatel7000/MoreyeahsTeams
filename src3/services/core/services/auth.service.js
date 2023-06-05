import { Constants } from "services/shared/constants";

export default class AuthService {
  static get Msalkey() {
    return Constants.msalSessionKey;
  }
  static get Authkey() {
    return Constants.authSessionKey;
  }

  static setLogin(data) {
    localStorage.setItem(this.Msalkey, data.msalKey);
    localStorage.setItem(this.Authkey, data.authKey);
  }
}
