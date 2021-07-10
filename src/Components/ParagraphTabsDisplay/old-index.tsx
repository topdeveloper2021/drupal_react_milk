import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ParagraphTab, {
  ParagraphTabInterface,
} from "../../DataTypes/ParagraphTab";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import ParagraphsToolbar from "./ParagraphToolbar";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import ParagraphDataFactory from "../ParagraphDisplay/ParagraphDataFactory";
import uuidv4 from "../../Utility/uuidv4";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface ParagraphTabsDisplayProps {
  content: ParagraphTabInterface[];
  can_edit: boolean;
}

export interface ParagraphTabsDisplayState {
  content: ParagraphTabInterface[];
  can_edit: boolean;
  is_editing: boolean;
  formSchemas: Array<JSONSchema>;
  activeTab: string;
}

interface getNavTabProps extends ParagraphTabInterface {
  onClick?: unknown;
}

export class ParagraphTabsDisplay extends React.Component<
  ParagraphTabsDisplayProps,
  ParagraphTabsDisplayState
> {
  /**
   * Constructor.
   *
   * @param { ParagraphTabsDisplayProps } props - Main incoming props.
   */
  constructor(props: ParagraphTabsDisplayProps) {
    super(props);
    const { content } = props;
    const activeTab = content.length ? "nav-".concat(props.content[0].id) : "";
    this.state = {
      content: content,
      can_edit: props.can_edit,
      is_editing: false,
      activeTab: activeTab,
      formSchemas: [],
    };
    this.paragraphsToolbarOnClickHandler = this.paragraphsToolbarOnClickHandler.bind(
      this
    );
    this.getPane = this.getPane.bind(this);
    this.getNavTab = this.getNavTab.bind(this);
    this.createNewTab = this.createNewTab.bind(this);
  }

  /**
   * Create new empty tab.
   */
  createNewTab() {
    const content = this.state.content;
    const paragraphTab = new ParagraphTab({
      id: uuidv4(),
      type: "paragraph--paragraph_tab",
      admin_title: "New Tab",
      field_tab_content: [],
    });
    content.push(paragraphTab);
    this.setState({
      content: content,
      activeTab: "nav-".concat(paragraphTab.id),
    });
  }

  /**
   * OnClick handler for paragraph Toolbar.
   *
   * @param {Event} evt - Event trigger.
   */
  paragraphsToolbarOnClickHandler(evt: Event) {
    const { content } = this.state;
    const toCreate = ParagraphDataFactory(evt.currentTarget.dataset);
    console.debug("Creating new tab:", toCreate);
    content[evt.currentTarget.dataset?.tabKey - 1].field_tab_content.push(
      toCreate
    );
    this.setState({ content: content });
  }

  /**
   * Get nav tab for single pane.
   * @param { getNavTabProps } paragraphTab - Nav Tab Props.
   * @param { number } key - Sequential.
   * @return { React.ElementRef } Tab Element.
   */
  getNavTab(paragraphTab: getNavTabProps, key: number) {
    const idString = "nav-".concat(paragraphTab.id);
    const active = idString == this.state.activeTab ? "true" : "false";
    const linkProperties = {
      key: key,
      className: "nav-item nav-link".concat(key == 0 ? " active " : ""),
      id: idString,
      href: "#tab-".concat(paragraphTab.id),
      role: "tab",
      "aria-controls": "tab-".concat(paragraphTab.id),
      "aria-selected": active,
      "data-toggle": "tab",
      style: {
        textTransform: "uppercase",
      },
    };
    if (paragraphTab.onClick) {
      linkProperties["onClick"] = paragraphTab.onClick;
    }
    console.debug("EventFullDisplay => linkProperties", linkProperties);
    const adminTitle =
      paragraphTab.admin_title?.toString().toLowerCase() ?? "Overview";
    return <a {...linkProperties}>{adminTitle}</a>;
  }

  /**
   * Get the pane of a single tab.
   *
   * @param { ParagraphTabInterface } paragraphTab - Data for the pane.
   * @param { number } key - Sequential.
   * @return { React.ElementRef } Pane element.
   */
  getPane(paragraphTab: ParagraphTabInterface, key: number) {
    const { activeTab, can_edit } = this.state;
    const idString = "tab-".concat(paragraphTab.id);
    const paneProperties = {
      key: key,
      className: "tab-pane fade".concat(
        activeTab == "nav-".concat(paragraphTab.id) ? " show active" : ""
      ),
      id: idString,
      role: "tabpanel",
      title: paragraphTab.admin_title?.toString() ?? "Overview",
      "aria-labelledby": "nav-".concat(paragraphTab.id),
      fluid: true,
      style: {
        minHeight: "22rem",
      },
    };
    console.debug("EventFullDisplay => paneProperties", paneProperties);
    const paneContents: Array<unknown> = [];
    if (paragraphTab.field_tab_content.length) {
      paneContents.push(
        <Row>
          <Col lg={12} sm={12}>
            <ParagraphDisplayList
              view_mode="full"
              list={paragraphTab.field_tab_content}
            />
          </Col>
        </Row>
      );
    }
    if (can_edit) {
      paneContents.push(
        <Row>
          <Col lg={12} sm={12} className="my-3">
            <Container>
              <ParagraphsToolbar
                onClickHandler={this.paragraphsToolbarOnClickHandler}
                tabKey={key}
              />
            </Container>
          </Col>
        </Row>
      );
    }
    console.debug("EventFullDisplay => paneContents", paneContents);
    return <Container {...paneProperties}>{paneContents}</Container>;
  }

  /**
   * Main render.
   *
   * @return { React.ElementRef } Rendered Element.
   */
  render() {
    const { content, can_edit } = this.state;
    const addNewTab = this.getNavTab(
      {
        id: "add-tab-".concat(uuidv4()),
        type: "paragraph-paragraph_tab",
        admin_title: "Add",
        onClick: this.createNewTab,
      },
      content.length + 1
    );
    return (
      <Container fluid={true}>
        <Container>
          <nav className="pt-3">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {content.map(this.getNavTab)}
              {can_edit ? addNewTab : ""}
            </div>
          </nav>
        </Container>
        <div className="tab-content">{content.map(this.getPane)}</div>
      </Container>
    );
  }
}

export default ParagraphTabsDisplay;
