import { ListComponentPropsInterface } from "../../DataTypes/ListComponentProps";
import ListSource, {
  ListComponentSourceInterface,
} from "../../DataTypes/ListSource";
import { ListableInterface } from "../../DataTypes/Listable";

export class PhilanthropyHubSource
  extends ListSource
  implements ListComponentSourceInterface, ListableInterface {
  static filters: {
    terms: "field_terms";
    actions: "field_actions";
    region: "field_region";
    focus: "field_focus";
  };
  onHashChangedCallback?: CallableFunction;

  constructor(incoming: ListComponentSourceInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  public static getDefaultSource(): Promise<ListComponentPropsInterface> {
    console.debug("getting default source", process.env);
    return fetch(process.env.CONFIG_FILE).then((data) => {
      return new PhilanthropyHubSource(data);
    });
  }

  onHashChanged() {
    console.debug("Hash change trigger");
    const params = new URLSearchParams(window.location.hash.replace("#", ""));
    let newFilter = {};
    // eslint-disable-next-line no-restricted-syntax
    for (let [field, values] of params) {
      field = `field_${field}`;
      values = values.split(",");

      // eslint-disable-next-line no-restricted-syntax
      for (const fieldValue of values) {
        const conjunction = "AND";
        const filterKey = `${field}-${fieldValue}`;
        const groupKey = `${filterKey}-group-${conjunction}`;

        const newValue = {};

        // NOTE: Workaround as per https://www.drupal.org/project/drupal/issues/3066202#comment-13181270
        newValue[`filter[${groupKey}][group][conjunction]`] = conjunction;
        newValue[`filter[${filterKey}][condition][value]`] = fieldValue;
        newValue[
          `filter[${filterKey}][condition][path]`
        ] = `${field}.machine_name`;
        newValue[`filter[${filterKey}][condition][memberOf]`] = groupKey;

        newFilter = {
          ...newFilter,
          ...newValue,
        };
      }
    }
    console.debug("New params", newFilter);
    try {
      this.refresh(newFilter).then(this.onHashChangedCallback);
    } catch (e) {
      console.error(e.getMessage());
      return [];
    }
  }

  notifyListComponent(newFilter: Object) {
    const evt = new CustomEvent("refresh", {
      bubbles: false,
      cancelable: false,
      detail: {
        filter: newFilter,
      },
    });
    document.querySelector("#list-component-root").dispatchEvent(evt);
  }
}

export default PhilanthropyHubSource;
