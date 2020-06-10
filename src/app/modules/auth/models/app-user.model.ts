export interface AppUser {
  displayName: string;
  email?: string;
  roles?: {
    admin?: boolean;
  };
}

export class User implements AppUser {
  constructor(
    public uid: string,
    public displayName: string,
    public wishlist: string[] = [],
    ...args
  ) {}
}
