import React, { useState } from "react";
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import styled from "styled-components";
import Loading from "../Loading";

export const MenuDisplay = (props) => {

  const { data } = props;
  const multiMenu = data.menu_label === undefined ? false : true;

  const [fetchRan, setFetchRan] = useState(false);
  const [mainMenuData, setMainMenuData] = useState(null);
  const [secondaryMenuData, setSecondaryMenuData] = useState(null);

  // Fetch Centers List
  if (!fetchRan) {
    fetch('/api/v1.0/menu_fetcher?_format=json&menu=main')
      .then((res) => res.json())
      .then((incoming) => {
        setMainMenuData(incoming);
        setFetchRan(true);
      }
    );

    if ( multiMenu ) {
      fetch('/api/v1.0/menu_fetcher?_format=json&menu=' + data.menu_id)
        .then((res) => res.json())
        .then((incoming) => {
          setSecondaryMenuData(incoming);
          setFetchRan(true);
        }
      );
    }
  }

  if (!fetchRan || mainMenuData === null || ( multiMenu && secondaryMenuData === null ) ) {
    return (
      <Loading />
    );
  }

  // Set active tab
  const active_menu_tab = multiMenu ? data.menu_label : 'Milken Institute';

  // Add primary menu
  let menuArray = [
    {
      id: "milken-main",
      label: 'Milken Institute',
      data: mainMenuData,
    }
  ];

  // Add secondary menu
  if( multiMenu ) {
    menuArray.push(    
      {
        id: data.menu_id,
        label: data.menu_label,
        data: secondaryMenuData,
      }
    );
  }

  console.debug("MenuDisplay: mainMenuData ", mainMenuData);
  console.debug("MenuDisplay: secondaryMenuData ", secondaryMenuData);

  let socialLinks = 
  `
    <ul class="social-icons">
      <li>
        <a href="https://www.facebook.com/milkeninstitute/" target="_blank"><i class="fab fa-facebook-f"></i></a>
      </li>
      <li>
        <a href="https://twitter.com/milkeninstitute" target="_blank"><i class="fab fa-twitter"></i></a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/milkeninstitute/" target="_blank"><i class="fab fa-linkedin"></i></a>
      </li>
      <li>
        <a href="https://www.instagram.com/milkeninstitute/" target="_blank"><i class="fab fa-instagram"></i></a>
      </li>
      <li>
        <a href="https://www.youtube.com/channel/UCIRzxohZ6SbwsPqHFQGMJ7A" target="_blank"><i class="fab fa-youtube"></i></a>
      </li>
    </ul>
  `;

  function buildMenuColumns(data) {
    let parents = [], children = [];
    data.map((item) => {
      item.parent === "" ? parents.push(item) : children.push(item)
    })
    return (
      <>
        {
          parents.map((parent, index) => {
            return (
              <Col key={index} className={ parent.title === "Others" ? " others" : '' }>
                <h5 className="menu-title TEST">{parent.title}</h5>
                <ul className="list-group">
                  {
                    children.map((child, index) => {
                      if (child.parent === parent.uuid) {
                        console.debug("DECODED MENU URL", unescape(child.link__uri).replace('&amp;', '&'));
                        return (
                          <li key={index}>
                            <a href={unescape(child.link__uri).replace('&amp;', '&')} dangerouslySetInnerHTML={{ __html: unescape(child.title) }}/>
                            {
                              child.description != "" ? <p dangerouslySetInnerHTML={{ __html: unescape(child.description) }}/> : ""
                            }
                          </li>
                        )
                      }
                    })
                  }
                </ul>
                {
                  ( parent.title === "Others" ) 
                  ? 
                    <ul class="social-icons">
                      <li>
                        <a href="https://www.facebook.com/milkeninstitute/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href="https://twitter.com/milkeninstitute" target="_blank"><i class="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/company/milkeninstitute/" target="_blank"><i class="fab fa-linkedin"></i></a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/milkeninstitute/" target="_blank"><i class="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/channel/UCIRzxohZ6SbwsPqHFQGMJ7A" target="_blank"><i class="fab fa-youtube"></i></a>
                      </li>
                    </ul>
                  : ''
                }
              </Col>
            )
          })
        }
      </>
    )
  };

  return (
    <div id="main-nav-wrapper" className="container-fluid">
      <Tabs defaultActiveKey={active_menu_tab}>
        {
          menuArray.map(( singleFullMenu, key ) => {
            return (
              <Tab eventKey={singleFullMenu.label} title={singleFullMenu.label}>
                <Row id={singleFullMenu.id} className="pb-5">
                  {buildMenuColumns(singleFullMenu.data)}
                </Row>
              </Tab>
            )
          })
        }        
      </Tabs>
    </div>
  );
};

export default MenuDisplay;
