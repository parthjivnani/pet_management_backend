import * as jwt from 'jsonwebtoken';

export default class AuthService {
  /*
   * getAuthToken
   */
  public getAuthToken = (data: object, expiry: string) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: expiry, // expires in
    });
  };

  public verifyAuthToken = (token: string) => {
    let userInfo = { status: false };
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        userInfo = { status: false };
      }
      userInfo = {
        status: true,
        ...user,
      };
    });
    return userInfo;
  };

  /*
   * generateToken
   */
  public generateCookieToken = (res, data) => {
    const token = this.getAuthToken(data, '7d');
    res.locals.token = token;
    return res;
  };
}
