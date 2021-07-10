import React from "react";
import Autocomplete from "react-autocomplete";

export interface AutoCompleteOptions {
  name: string;
  value: string;
}

export interface AutoCompleteProps {
  onSubmit: CallableFunction;
  keywords: string;
}

export interface AutocompleteState {
  value: string;
  items: Array<AutoCompleteOptions>;
  abortController: AbortController;
}

export class KeywordForm extends React.Component<
  AutoCompleteProps,
  AutocompleteState
> {
  constructor(props) {
    super(props);
    const { keywords } = props;
    this.state = {
      value: keywords,
      items: [],
      abortController: new AbortController(),
    };
  }

  onInputHandler = (evt) => {
    console.debug(evt);
    this.setState({ value: evt.target.value });
    this.refreshOptions(evt.target.value);
  };

  onSelectHandler = (value, selection) => {
    console.debug(value);
    this.setState({ value });
  };

  refreshOptions = (keyword: string = null) => {
    const { abortController } = this.state;
    const { signal } = abortController;
    fetch("/search_api_autocomplete/solr_search?q=".concat(keyword), {
      signal,
    })
      .then((res) => res.json())
      .then((ajaxData) => {
        if (Array.isArray(ajaxData)) {
          this.setState({ items: ajaxData });
        }
      });
  };

  render() {
    const { onSubmit } = this.props;
    const { items, value } = this.state;
    const { onInputHandler, onSelectHandler } = this;
    return (
      <form onSubmit={onSubmit} href="/search">
        <Autocomplete
          getItemValue={(item) => item.value}
          items={items}
          onSelect={onSelectHandler}
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? "lightgray" : "white" }}
              data-autocomplete-value={item.value}
            >
              <span dangerouslySetInnerHTML={{ __html: item.label }} />
            </div>
          )}
          value={value}
          autoHighlight
          renderInput={(props) => {
            return (
              <input
                {...props}
                name="keywords"
                value={value}
                autoComplete={false}
                autoCapitalize={false}
                autoCorrect={false}
                onInput={onInputHandler}
              />
            );
          }}
        />
      </form>
    );
  }
}

export default KeywordForm;
