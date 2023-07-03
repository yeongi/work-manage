//자동로그인 CRUD
const LOGINKEY = "myidpw";
const SPLIT_CHAR = "#";

class LoginSaveClient {
  constructor() {
    this.isSaved = localStorage.getItem(LOGINKEY) ? true : false;
  }

  createInfo = (ID, PW) => {
    localStorage.setItem(LOGINKEY, [ID, PW].join(SPLIT_CHAR));
  };

  getId = () => {
    if (this.isSaved) {
      return localStorage.getItem(LOGINKEY).split(SPLIT_CHAR);
    }
    return null;
  };

  updateInfo = (ID, PW) => {
    localStorage.setItem(LOGINKEY, [ID, PW].join(SPLIT_CHAR));
  };
}

export default LoginSaveClient;
