export const regularExps = {
  // email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

  // Password: 8–72 chars, at least 1 lowercase, 1 uppercase, 1 digit, 1 special, no spaces
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,72}$/
};