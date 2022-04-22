export interface BaseUser {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
}
