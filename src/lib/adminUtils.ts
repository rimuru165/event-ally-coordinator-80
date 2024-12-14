export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // In a real app, this should be properly hashed and stored securely
};

export const isAdmin = (username: string, password: string) => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};