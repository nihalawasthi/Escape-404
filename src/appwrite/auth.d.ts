export interface User {
  name: string;
  prefs?: {
    image?: string;
    [key: string]: any;
  };
}

export const authService: {
  loginUser: (email: string, password: string) => Promise<User>;
  logoutUser: () => Promise<boolean>;
};