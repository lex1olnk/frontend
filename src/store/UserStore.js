import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {
      token: null,
      id: null
    };
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser({ token, id }) {
    this._user = { token, id };
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
