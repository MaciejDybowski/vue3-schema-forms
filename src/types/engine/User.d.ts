export type User = {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  supervisor?: User;
  labels?: string | string[];
};
