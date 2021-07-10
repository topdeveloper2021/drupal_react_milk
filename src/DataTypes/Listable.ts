import JSONApiUrl from "./JSONApiUrl";
import { EntityInterface } from "./Entity";

export interface ListableInterface {
  id?: string;
  items?: Array<EntityInterface> | undefined;
  url?: string;
  browser?: boolean;
}

export class Listable {
  id?: string;
  items?: Array<EntityInterface>;
  url?: string;
  browser: boolean;

  constructor(props: ListableInterface) {
    Object.assign(this, props);
  }

  refresh(url: JSONApiUrl = null): Promise<Array<EntityInterface>> {
    if (url === null) {
      url = new JSONApiUrl(this.url);
    }
    return fetch(url)
      .then((res) => res.json())
      .then((ajaxData) => {
        if (ajaxData.errors !== undefined) {
          throw new Error(ajaxData.errors[0]);
        }
        return ajaxData.data;
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}

export default Listable;
