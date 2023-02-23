export const emailValidation = (email) => {
  const validate = /\S+@\S+\.\S+/;
  return validate.test(email);
};

export const passwordValidation = (password) => {
  const minCharacters = 6;
  return password.length >= minCharacters;
};
