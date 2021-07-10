# Entry Components Directory

**CHECKING IN UNLINTED TYPESCRIPT COULD CAUSE THE BUILD TO FAIL.**

[React](https://reactjs.org/) entry components are capitalized with no hyphenation.

```jsx
<MediaDetail
  blah={blah}
  json-blah="{'item':'blah'}" />

```

[WebComponents](https://webcomponents.org) take the form of the tag they support, e.g. node-landing-page supports

```html
<node-landing-page
  data-blah="blah"
  data-json-blah="{'item':'blah'}" />
```

and can be used in the admin wherever a node landing page appears.

ALL OF THE ESLINT SETTINGS ARE THE PACKAGE.JSON.

**CHECKING IN UNLINTED TYPESCRIPT COULD CAUSE THE BUILD TO FAIL.**


When including components, a "PathAliases" file tells the webpack configs
where things are stored:

```typescript
export const PathAliases = {
  Components: pathUtility.resolve("./src/Components"),
  DataTypes: pathUtility.resolve("./src/DataTypes"),
  Fields: pathUtility.resolve("./src/Fields"),
  Utility: pathUtility.resolve("./src/Utility"),
  Libraries: pathUtility.resolve("./web/libraries"),
  FrontEndTheme: pathUtility.resolve("./web/themes/custom/milken"),
  AdminTheme: pathUtility.resolve("./web/themes/custom/milken_admin"),
  GinTheme: pathUtility.resolve("./web/themes/contrib/gin"),
  Modules: pathUtility.resolve("./web/modules"),
  Themes: pathUtility.resolve("./web/themes"),
  Core: pathUtility.resolve("./web/core"),
};
```

THIS FILE IS HERE: ./config/node/PathAliases.ts. This file is used by both
the CSS compiler and the JS compiler.


The basics:

### ALL COMPONENTS ###

The ```*.component.yml``` file is the integration with Drupal's
["component" module](https://www.drupal.org/project/component) and describes
the component. The form configs come into play when you add the component
to a page using a block. This can be done anywhere blocks can be used
with some limitations:

the ```*.entry.ts``` file is a typescript

### React ###

**REACT HAS A LIMIT OF ONE "ROOT" ELEMENT PER PAGE.**

There are ways to configure around the one-root-per-page limit, but that's
outside the scope of this project and the browser page gets a bit heavy and
slow-loading at 2 or 3 react roots. Remember react was made to take over the
rendering of the entire page and in this it shows it's legacy.

### WebComponents ###

**Multiple web components can appear on every page without it being an issue.**

The  webcomponents should be as pure javascript as is possible and everything
defined in the entry file. Do not include React components in WebComponent
renders as the SHADOW DOM of a webcomponent is private to that component
so the shadow root has none of the page's css or javascript.



### Angular ###

Support to be added Phase 2.
