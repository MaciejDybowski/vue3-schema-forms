export interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  properties?: Record<string, any>;
}
