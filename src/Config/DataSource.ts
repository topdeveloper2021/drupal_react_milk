

export default class DataSource {

  constructor(incoming) {
    Object.assign(this.incoming);
    console.debug("DataSource.constructor", this);
  }

  factory(incoming) {
    console.debug("DataSource.factory", incoming);
    return new DataSource(incoming);
  }

}