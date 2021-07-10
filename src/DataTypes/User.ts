interface UserInterface {
  type: string;
  id: string;
}

class User {
  type: string;

  id: string;

  constructor(incoming: UserInterface) {
    Object.assign(this, incoming);
  }
}

export { User as default, UserInterface };
