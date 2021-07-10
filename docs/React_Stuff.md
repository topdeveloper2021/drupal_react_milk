
===

# Where REACT meets Drupal #

So this site is partially decoupled. React handles the rendering of some of the pages and drupal handles the routing
and data storage. This is the basics of how they work together to build pages.

1. In the theme libraries file we have an entry for a typescript TSX file and associate it with a usable drupal
javascript library.

```yaml
article:
  version: 1.0.0
  footer: true
  drupalSettings:
    node: null
  js:
    js/Article.entry.js: { preprocess: 0, source: 'js/Article.entry.tsx' }
```

1. Each entry file is primarily associating a DIV with a React component render like so:

```jsx

import * as React from "react";
import * as ReactDOM from "react-dom";
import Article from "components/Article";

const parsedData = JSON.parse(
    document.querySelector(
      '#node-data > script[type="application/json"][data-drupal-selector="drupal-node-json"]'
    ).textContent
);
parsedData.data = {};
ReactDOM.render(
  <Article {...parsedData} />,
  document.getElementById('node-component')
);

```

1. What we're doing is is locating the information from the Drupal template that is on the page, getting the json value
and then parsing it into usable data. The data on the page looks something like this:

```html

<div id="node-data">
  <script type="application/json" data-drupal-selector="drupal-node-json">{
    "id": "eead5551-18f8-4fdf-960a-74e977531855",
    "entityTypeId": "node",
    "bundle": "landing_page",
    "view_mode": "full"
    }</script>
</div>

```

So then react makes a jsonapi call to '/jsonapi/node/landing_page/eead5551-18f8-4fdf-960a-74e977531855?jsonapi_include=true' which has a
data property that looks something like this:

```json

"data": {
        "type": "node--landing_page",
        "id": "eead5551-18f8-4fdf-960a-74e977531855",
        "links": {
            "self": {
                "href": "http:\/\/localhost:8080\/jsonapi\/node\/landing_page\/eead5551-18f8-4fdf-960a-74e977531855?resourceVersion=id%3A11"
            }
        },
        "drupal_internal__nid": 1,
        "drupal_internal__vid": 11,
        "langcode": "en",
        "revision_timestamp": "2020-07-29T18:18:06+00:00",
        "revision_log": null,
        "status": true,
        "title": "Home",
        "created": "2020-07-28T13:08:40+00:00",
        "changed": "2020-07-29T18:18:06+00:00",
        "promote": true,
        "sticky": false,
        "default_langcode": true,
        "revision_translation_affected": true,
        "metatag": null,
        "path": {
            "alias": "\/home",
            "pid": 469,
            "langcode": "en"
        },
        "field_meta_tags": null,
        "node_type": {
            "type": "node_type--node_type",
            "id": "495f0a76-55fb-4076-b72b-b33c3db0d526"
        },
        "revision_uid": {
            "type": "user--user",
            "id": "2217fab8-07c1-44b2-bc1d-464d90aea2ad"
        },
        "uid": {
            "type": "user--user",
            "id": "0569f59f-1865-457b-81c5-f3459b3a18cb"
        },
        "field_content": [{
            "type": "paragraph--slide",
            "id": "c776b2a4-c8fa-4775-8eae-c6523fb0e68f",
            "meta": {
                "target_revision_id": 1262
            }
        }, {
            "type": "paragraph--tiles",
            "id": "b672ea1a-ec10-442e-bc4d-4d49eeb6f1b1",
            "meta": {
                "target_revision_id": 1263
            }
        }],
        "field_hero_image": {
            "data": null,
            "links": {
                "related": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/node\/landing_page\/eead5551-18f8-4fdf-960a-74e977531855\/field_hero_image?resourceVersion=id%3A11"
                },
                "self": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/node\/landing_page\/eead5551-18f8-4fdf-960a-74e977531855\/relationships\/field_hero_image?resourceVersion=id%3A11"
                }
            }
        }
    }

```

1. The "jsonapi_include=true" is a switch that turns on field inclusion. You can include any field's data in the
query by naming it in the URL like so
"http://localhost:8080/jsonapi/node/landing_page/eead5551-18f8-4fdf-960a-74e977531855?jsonapi_include=true&include=field_content,field_hero_image"
this gives you extended information from the field:

```json

"field_content": [
            {
                "type": "paragraph--slide",
                "id": "c776b2a4-c8fa-4775-8eae-c6523fb0e68f",
                "links": {
                    "self": {
                        "href": "http://localhost:8080/jsonapi/paragraph/slide/c776b2a4-c8fa-4775-8eae-c6523fb0e68f"
                    }
                },
                "drupal_internal__id": 1556,
                "drupal_internal__revision_id": 1262,
                "langcode": "en",
                "status": true,
                "created": "2020-07-28T15:21:11+00:00",
                "parent_id": "1",
                "parent_type": "node",
                "parent_field_name": "field_content",
                "behavior_settings": [

                ],
                "default_langcode": true,
                "revision_translation_affected": true,
                "admin_title": null,
                "field_background": "transparent",
                "meta": {
                    "target_revision_id": 1262
                },
                "paragraph_type": {
                    "type": "paragraphs_type--paragraphs_type",
                    "id": "42622ad6-139f-4ef7-b70b-13445d8869c8"
                },
                "field_slides": [
                    {
                        "type": "slide--full_width_one_column",
                        "id": "a1fd9c35-a33d-44c9-9615-5906949221e2"
                    },
                    {
                        "type": "slide--full_width_one_column",
                        "id": "c50b4361-bff0-44d3-b26e-97274ef16752"
                    },
                    {
                        "type": "slide--full_width_one_column",
                        "id": "50891c7f-6d60-49b2-a627-f93b3251c947"
                    },
                    {
                        "type": "slide--full_width_one_column",
                        "id": "0d370612-e725-4c9c-a396-76bc4a579712"
                    }
                ]
            },
            {
                "type": "paragraph--tiles",
                "id": "b672ea1a-ec10-442e-bc4d-4d49eeb6f1b1",
                "links": {
                    "self": {
                        "href": "http://localhost:8080/jsonapi/paragraph/tiles/b672ea1a-ec10-442e-bc4d-4d49eeb6f1b1"
                    }
                },
                "drupal_internal__id": 1555,
                "drupal_internal__revision_id": 1263,
                "langcode": "en",
                "status": true,
                "created": "2020-07-28T15:19:16+00:00",
                "parent_id": "1",
                "parent_type": "node",
                "parent_field_name": "field_content",
                "behavior_settings": [

                ],
                "default_langcode": true,
                "revision_translation_affected": null,
                "admin_title": "Landing Pages",
                "field_title": "Connecting Resources. Catalyzing Solutions. Building Meaningful Lives.",
                "meta": {
                    "target_revision_id": 1263
                },
                "paragraph_type": {
                    "type": "paragraphs_type--paragraphs_type",
                    "id": "3f06777c-5540-4301-bbfc-26a8b7853d0f"
                },
                "field_tile_queue": {
                    "type": "entity_subqueue--landing_pages",
                    "id": "c8ea13b9-590f-4cb2-8378-c0f012f72869"
                }
            }
        ],
```

1. Getting the data for adjacent objects is easy with two pieces of information. Notice this portion:

```json

 "type": "paragraph--tiles",
   "id": "b672ea1a-ec10-442e-bc4d-4d49eeb6f1b1",

```

1.  What this portion of the file does is give you the UUID, entityTypeId and bundleID for any given piece of content, which can then be turned into a URL:
    ```/jsonapi/paragraph/tiles/b672ea1a-ec10-442e-bc4d-4d49eeb6f1b1?jsonapi_include=true```


    Paragraph rendering components are in the /src/components/Paragraphs folder. Here's a basic paragraph renderer that renders just text:

```jsx

import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, { EntityComponentState } from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import TextField from "../../DataTypes/TextField";

interface ParagraphTextProps extends EntityComponentPropsInterface {
  key: number;
  field_body: TextField;
  field_num_text_columns: number;
}


class ParagraphText extends EntityComponentBase<ParagraphTextProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render() {
    const textStyle={
      columnCount: Number(this.props.field_field_num_text_columns || 1),
      paddingTop: "2rem",
      paddingBottom: "2rem",
    };
    console.log("Paragraph Text", this.props, this.state);
    if (this.state.loaded) {
      return (
        <Col key={this.props.key} lg={12}>
          <Container>
            <p style={textStyle}
               dangerouslySetInnerHTML={{__html: this.state.attributes.field_body.value}} />
          </Container>
        </Col>
      );
    } else if (this.state.loading) {
      return (
        <Col key={this.props.key} lg={12}>
          <Loading/>
        </Col>
        );
    } else {
      return (
        <Col
          key={this.props.key}
          lg={12}><h1 key={this.props.key}>No Content Available</h1></Col>
      )
    }
  }

}

export default ParagraphText;

```

1.  React components that are based on EntityComponentBase can be given a JSONAPI ID and TYPE value and get the rest of
    the information that it needs from an AJAX call. EntityComponentBase serves as a base class for most of the JSONAPI
    react classes at the site.

    Most of the heavy lifting is done by EntityComponentProps class which makes data calls based on the ID/TYPE pair of
    a piece of content.

```javascript 1.8

  async getData(include: string = ""): Promise<any> {
    console.debug("get Data called: ", this);
    if (this.entityTypeId && this.bundle) {
      return fetch(`/jsonapi/${this.entityTypeId}/${this.bundle}/${this.id || ""}?jsonapi_include=1${include}`)
        .catch(this.handleError);
    } else {
      this.handleError(new Error("Not Enough Data to make a getData call"));
    }
  }

```
