export interface User {
  data: {
    username: string;
    password: string;
    role: string;
    token?: string;
  };
}
