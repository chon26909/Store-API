import redis from "./redis";

export const setToken = (uid: string, token: string) => {
  redis.setEx(token, 60 * 5, uid);
};

export const setOTP = (mobilePhone: string, otpToken: string, otp: string) => {
  redis.setEx(mobilePhone + otpToken, 60 * 5, otp);
};
