import React, { useState } from "react";
import DataTypePeopleFactory from '../../DataTypes/People/Factory'
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { SocialMediaLinkInterface } from "../../Fields/SocialMediaLink";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { PeopleInterface } from "../../DataTypes/People";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { TagsDisplay } from "../TagsDisplay"
import { SocialDisplay } from "../SocialDisplay"
import Loading from "../Loading";
import PeopleRowDisplay from "./PeopleRowDisplay";
import PeopleFullDisplay from "./PeopleFullDisplay";

export interface PeopleDisplayProps {
  data: PeopleInterface;
  key?: string;
  view_mode: string;
}

// TODO: support more than one bundle of people. Currently only supports "staff".
export const PeopleDisplay = (props: PeopleDisplayProps) => {
  const { data, key, view_mode } = props;
  const DataObject = DataTypePeopleFactory(data);
  const [staffData, setStaffData] = useState(DataObject);
  const [fetchRan, setFetchData] = useState(false);

  if (!staffData.hasData() || !fetchRan) {
    const ecp = new EntityComponentProps(DataObject);
    ecp
      .getData(DataObject.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = DataTypePeopleFactory(ajaxData.data);
        setStaffData(newDO);
        setFetchData(true);
      });
  }

  if (!staffData.hasData()) {
    return <Loading />;
  }

  console.debug("PeopleDisplay: staffData.hasData()", staffData.hasData());

  console.debug("PeopleDisplay: Component should have data by now:", staffData);
  switch (view_mode) {
    case 'card':
      return (
        <a
          className="col-sm-6 col-md-4 col-lg-3 p-4 text-center text-decoration-none text-dark"
          style={{ transition: 'all 0.5s ease' }}
          href={staffData.path.alias}
        >
          <ImageFileDisplay
            data={staffData.field_photo[0]}
            view_mode="large"
            className={"card-img"}
            style={{ maxWidth: "100%" }}
            srcsetSizes="(max-width: 1000px) 200px, 400px"
          />
          <p
            className="m-0 mt-3"
            style={{ fontFamily: 'LatoWebBold', fontSize: '1em' }}
          >{staffData.field_first_name} {staffData.field_last_name}
          </p>
          <p style={{ color: 'dimgray', fontSize: '1em' }}>{staffData.field_pgtitle}</p>
        </a>
      );
    case 'row':
      return (
        <PeopleRowDisplay data={staffData} />
      );

    case 'full':
    default:
      return (
        <PeopleFullDisplay data={staffData} />
      );

  }
};

export default PeopleDisplay;