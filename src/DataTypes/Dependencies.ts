export interface DependenciesInterface {
  config?: Array<string>;
  content?: Array<string>;
  module?: Array<string>;
}

export default class Dependencies {
  config?: Array<string>;

  content?: Array<string>;

  module?: Array<string>;

  constructor(incoming: DependenciesInterface) {
    Object.assign(this, incoming);
  }
}
