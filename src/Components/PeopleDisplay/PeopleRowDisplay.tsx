import React from 'react';
import { Image } from "react-bootstrap";
import styled from "styled-components";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";


const PersonRowDisplay = ( props: any ) => {
  
    const { data } = props;

    const PersonWrapper = styled.div`
        border: 1px solid lightgray;
        & .field-tag {
            color: var(--color-milken-blue);
            font-family: 'LatoWebBold';
        }

        & .name {
            font-family: 'LatoWebHeavy';
            color: #35363c;
            white-space: nowrap;
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

    let tagSeparatorCounter: number = 0;
    let elTags = (
        <h6 className="field-tag text-uppercase">
            {
                (data.field_regions.length !== undefined) ? data.field_regions.map( (item) => { 
                    tagSeparatorCounter++;
                    return(
                        <>
                            {((tagSeparatorCounter > 1) ? <span> - </span> : '')}
                            <a>{item.name}</a> 
                        </>
                    )
                }) 
                : ''
            }
            {
                (data.field_tags.length !== undefined) ? data.field_tags.map( (item) => { 
                    tagSeparatorCounter++;
                    return(
                        <>
                            {((tagSeparatorCounter > 1) ? <span> - </span> : '')}
                            <a>{item.name}</a> 
                        </>
                    )
                }) 
                : ''
            }
        </h6>
    );

    return (
        <PersonWrapper className="mx-0 mb-4 row">
            <div className="col-md-3 col-sm-5 col-xs-12 p-0 m-0">
                <ImageFileDisplay
                    data={data.field_photo[0]}
                    view_mode="large"
                    className={"card-img"}
                    style={{ maxWidth: "100%" }}
                    srcsetSizes="(max-width: 1000px) 200px, 400px"
                />
            </div>
            <div className="col-md-9 col-sm-7 col-xs-12 p-3 d-flex flex-column justify-content-between">
                <div>
                    <h6 className="field-tag text-uppercase">{elTags}</h6>
                    <div className="d-flex align-items-baseline mb-2">
                        <h5 className="name mr-2 my-0">
                            {(data.field_last_name_goes_first != null && data.field_last_name_goes_first === true) 
                            ? data.field_last_name + ' ' + data.field_first_name 
                            : data.field_first_name + ' ' + data.field_last_name}
                        </h5>
                        <p className="job-title m-0">{data.field_pgtitle}</p>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: data.field_summary?.value}}></div>
                <a href={data.path.alias} className="text-uppercase text-decoration-none my-2 read-more">Read More</a>
            </div>
        </PersonWrapper>
    )
};
export default PersonRowDisplay;