import React from "react";
import JSONApiUrl from "./JSONApiUrl";

interface ListComponentPropsInterface {
  id: string;
  url: JSONApiUrl;
  error?: Error;
  onSelectHandler?: any;
  view_mode?: string;
  items?: Array<any>;
  entityTypeId: string;
  browser: boolean;
  key: number;
  loadAll?: boolean;
}

interface ListComponentState {
  items: Array<any>;
  loaded: boolean;
}

class ListComponentProps extends React.Component<
  ListComponentPropsInterface,
  ListComponentState
> {
  id: string;

  _url: JSONApiUrl;

  key: number;

  error?: Error;

  onSelectHandler: any;

  view_mode: string;

  abortController?: AbortController;

  constructor(props: ListComponentPropsInterface) {
    super(props);
    this.state = {
      items: props.items || [],
    };
    Object.assign(this, props);
    this.refresh = this.refresh.bind(this);
    this.getData = this.getData.bind(this);
    this.loadChain = this.loadChain.bind(this);
    this.toObject = this.toObject.bind(this);
    this.hasItems = this.hasItems.bind(this);
    this.handleError = this.handleError.bind(this);
    this.abortController = new AbortController();
  }

  toObject(): ListComponentPropsInterface {
    return {
      entityTypeId: this.props.entityTypeId,
      id: this.id,
      url: this.url.toString(),
      error: this.error,
      onSelectHandler: this.onSelectHandler,
      view_mode: this.view_mode,
      key: this.key,
      loadAll: this.props.loadAll,
    };
  }

  async getData(url: JSONApiUrl = null): Promise<any> {
    console.debug("get Data called: ", this);
    if (url !== null) {
      this.url = url;
    }
    if (this.url) {
      console.debug("listComponenet calling url: ", this.url.toString());
      return fetch(this.url.toString(), {
        signal: this.abortController.signal,
      }).catch(this.handleError);
    }
    this.handleError(new Error("No URL to make a refresh call"));
    resolve([]);
  }

  hasItems(): boolean {
    return !!this.state?.items?.length || 0;
  }

  handleError(err) {
    this.error = err;

    if (err.name === "AbortError") {
      console.log(this.url);
    }
    console.log(
      "Entity Component Props has encountered an error with fetching the items:",
      err
    );
  }

  get loaded() {
    return this.state.loaded || this.hasItems();
  }

  get label() {
    return this.id;
  }

  refresh(evt: CustomEvent = null): Promise<any> {
    if (evt) {
      evt.stopImmediatePropagation();
      evt.preventDefault();
    }

    let toMutate = this.url.clone();
    if (evt?.detail) {
      // Flag keys for deletion
      const clearKeys = [];

      // Do not touch these URL params
      const blacklist = ["jsonapi_include", "include"];

      for (const key of toMutate.query.keys()) {
        if (blacklist.includes(key)) {
          continue;
        }
        if (!evt.detail.filter.hasOwnProperty(key) || !evt.detail.filter[key]) {
          clearKeys.push(key);
        }
      }

      // If filter passed, update URL parameters
      if (evt?.detail?.filter) {
        for (const f in evt.detail.filter) {
          // Sensible default filter if not a complex filter key
          const key = f.includes("filter") ? f : `filter[${f}]`;

          if (toMutate.query.has(key)) {
            console.debug("changing value of query param: ", toMutate.query);
            toMutate.query.set(key, evt.detail.filter[f]);
          } else {
            console.debug("Appending query param: ", toMutate.query);
            toMutate.query.append(key, evt.detail.filter[f]);
          }
        }
      }

      // Clear flagged keys
      clearKeys?.map((key) => {
        console.debug("Clear URL key", key);
        toMutate.query.delete(key);
      });

      // Set URL if passed
      if (evt?.detail?.url) {
        toMutate = evt.detail.url;
      }

      this._url = toMutate;
    }

    if (this?.url && this.url.toString() !== toMutate.toString()) {
      console.log("Fetch URL changed, abort current request");
      this.abortController.abort();
    }

    return this.loadChain();
  }

  loadChain(): Promise<any> {
    console.log("Loading an API page");

    const self = this;

    console.log("self", self);

    return fetch(this._url.toString(), { signal: this.abortController.signal })
      .then((res) => res.json())
      .then((ajaxData) => {
        // Result is empty
        if (!ajaxData?.data) {
          return;
        }

        // Check for additional pages on the API
        const pageCount = 50;
        let newItems = ajaxData.data;

        if (
          self.loadAll &&
          ajaxData?.links?.next?.href &&
          ajaxData?.meta?.count > pageCount
        ) {
          console.log("Loading more");

          // Prepare URLs for concurrent requests

          const total = ajaxData.meta.count;
          const pageUrl = new JSONApiUrl(ajaxData.links.next.href);
          const pages = [ajaxData.links.next.href];
          let offset = pageCount;

          while (offset + pageCount < total) {
            offset += pageCount;
            pageUrl.query.set("page[offset]", offset);
            pages.push(pageUrl.toString());
          }

          // console.log('All request pages', pages);

          Promise.all(
            pages.map((url) =>
              fetch(url, { signal: this.abortController.signal })
            )
          )
            .then((results) => {
              return Promise.all(
                results.map((response) => {
                  return response.json();
                })
              );
            })
            .then((allData) => {
              allData.map((data) => {
                if (data?.data?.length) {
                  newItems = newItems.concat(data.data);
                }
              });

              self.setState({ items: newItems });
            })
            .catch(function (error) {
              console.debug("Error reading API pages", error);
            });
        } else {
          self.setState({ items: newItems });
        }
      })
      .catch((e) => {
        console.warn(`Fetch 1 error: ${e.message}`);
      });
  }

  get url(): JSONApiUrl {
    return this._url;
  }

  set url(url) {
    if (!url instanceof JSONApiUrl) {
      url = new JSONApiUrl(url);
    }
    this._url = url;
  }
}

export { ListComponentProps as default, ListComponentPropsInterface };
