"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const userInfo = await UserStorage.getUserInfo(client.id);
      if (userInfo) {
        if (
          userInfo.USER_ID === client.id &&
          userInfo.USER_PSWORD === client.psword
        ) {
          return { success: true };
        }
        return { success: false, code: -1 }; // 비밀번호가 틀렸습니다.
      } else {
        return { success: false, code: -2 }; // 존재하지 않은 아이디입니다.
      }
      return response;
    } catch (err) {
      return { success: false, code: -3, err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, code: -3, err };
    }
  }
}

module.exports = User;
