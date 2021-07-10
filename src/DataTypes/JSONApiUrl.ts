import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { LinkListInterface } from "./LinkList";

interface JSONApiUrlEntityInterface {
  id: string;
  type: string;
}

export interface JsonApiListResponse {
  data: Array<JSONApiUrlEntityInterface>;
  links: LinkListInterface;
}

export interface JSONApiContentResponse {
  data: JSONApiUrlEntityInterface;
  links: LinkListInterface;
}

export class JSONApiUrl {
  parsed: URL;

  query: DrupalJsonApiParams;

  constructor(incoming: string = null, searchParams: URLSearchParams = null) {
    console.log("jsonapiURL: Incoming", incoming);
    if (incoming) {
      // This is to deal with relative URL's that dont' have a pathl
      const location = new URL(document.location.href.toString());
      this.parsed = new URL(incoming, location.origin.toString());
      // If new search params are provided, use those, else
      // the query from the supplied URL.
      this.query = new DrupalJsonApiParams();
      this.query.initializeWithQueryString(
        searchParams ?? this.parsed.searchParams.toString()
      );
    }
    console.debug("JsonapiURL: constructor", this);
  }

  toString(): string {
    return this?.parsed?.toString().concat("?", this?.query?.getQueryString());
  }

  clone() {
    return Object.assign(new JSONApiUrl(), this);
  }
}

export default JSONApiUrl;
