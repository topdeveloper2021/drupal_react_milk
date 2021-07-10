import React from 'react';
import { Image } from "react-bootstrap";
import styled from "styled-components";

const PersonWrapper = styled.div`
    border: 1px solid lightgray;
    & .field-tag {
        color: var(--color-milken-blue);
        font-family: 'LatoWebBold';
    }

    & .name {
        font-family: 'LatoWebHeavy';
        color: #35363c;
    }

    & .job-title {
        color: #999aa3;
        font-family: 'Lato';
        font-size: 0.875em;
    }

    & .read-more {
        color: var(--color-milken-orange);
        font-family: 'LatoWebHeavy';
        letter-spacing: 1.5px;
        font-size: 0.8em;
    }

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & .align-items-baseline {
        @media screen and (max-width: 768px) {
            flex-direction: column;
        }
    }
`;

const PersonRowDisplay = ({ team }) => {

    return (
        <PersonWrapper className="mx-0 mb-4 row">
            <div className="col-md-3 col-sm-5 col-xs-12 p-0 m-0">
                <Image src={team.image} />
            </div>
            <div className="col-md-9 col-sm-7 col-xs-12 p-3 d-flex flex-column justify-content-between">
                <div>
                    <h6 className="field-tag text-uppercase">Finance</h6>
                    <div className="d-flex align-items-baseline mb-2">
                        <h5 className="name mr-2 my-0">
                            {(team.last_name_goes_first) ? team.last_name + ' ' + team.first_name : team.first_name + ' ' + team.last_name}
                        </h5>
                        <p className="job-title m-0">{team.job_title}</p>
                    </div>
                </div>
                <ul>
                    <li>Financial innovation for social impact</li>
                    <li>Opportunity Zones</li>
                    <li>International development</li>
                </ul>
                <a href={team.link_uri} className="text-uppercase text-decoration-none my-2 read-more">{team.link_text}</a>
            </div>
        </PersonWrapper>
    )
};
export default PersonRowDisplay;