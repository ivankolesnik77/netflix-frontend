class TokenService {
  accessToken: string | null;

  constructor() {
    this.accessToken = null;
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  //   getRefreshToken() {}

  setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  //   setRefreshToken(token: string) {}
}

export const tokenService = new TokenService();
