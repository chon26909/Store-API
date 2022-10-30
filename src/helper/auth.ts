import bcrypt from "bcrypt";

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hashSync(password, salt);
};

export const validatePassword = async (
  enterPassword: string,
  savedPasword: string,
  salt: string
) => {
  return (await generatePassword(enterPassword, salt)) === savedPasword;
};
