import React from 'react';
import LogoProps from "./LogoProps";

const IHeartLogo = (props: LogoProps = {}) => {
  return (
    <div onClick={props?.onClickHandler} className={"IHeartLogo"} data-url={props.url}>
      <img src="/modules/custom/podcasts/images/iHPodcastNetwork_Logo.png"
           style={{ margin: "auto auto 1em auto", display: "block", width: "auto", maxHeight: "3em", }}
      />
    </div>
  );
}
IHeartLogo.defaultProps = {
  width: "150px",
  height: "40px",
}
export default IHeartLogo;
