import React from "react";
import $Ref { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import drupalJSONAPIEntities from "drupal_jsonapi_entities";

export interface FormBuilderProps {
  entityTypeId: string;
  bundle: string;
  uuid?: string;
}

export interface FormBuilderState {
  schema: JSONSchema;
}

export class FormBuilder extends React.Component<
  FormBuilderProps,
  FormBuilderState
> {
  api: drupalJSONAPIEntities;

  constructor(props) {
    super(props);
    this.api = new drupalJSONAPIEntities(document.location.origin, {
      credentials: "same-origin",
    });
    this.state = {
      schema: {},
    };
  }

  componentDidMount() {
    const { entityTypeId, bundle, uuid } = this.props;
    const formSchema = await this.api.getFormSchema(
      entityTypeId,
      bundle,
      "default"
    );
    this.setState({schema: formSchema});
  }

  render() {
    return (
      <div>
        <h1>FormBuilder</h1>
      </div>
    );
  }
}

export default FormBuilder;
