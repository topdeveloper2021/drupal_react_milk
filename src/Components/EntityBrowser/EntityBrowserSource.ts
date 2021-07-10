import ListSource, { ListSourceInterface } from "../../DataTypes/ListSource";

export class EntityBrowserSource
  extends ListSource
  implements ListSourceInterface {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    if (props.type) {
      const [entityTypeId, bundle] = props.type?.split("--");
      this.entityTypeId = entityTypeId;
      this.bundle = bundle;
    }
  }

  clone() {
    const toReturn = Object.create(Object.getPrototypeOf(this));
    return Object.assign(toReturn, this.toObject());
  }
}

export default EntityBrowserSource;
