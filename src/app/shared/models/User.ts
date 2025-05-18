export interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  role: string; // 'a' or 'u'
  email: string;
  password: string;
}
