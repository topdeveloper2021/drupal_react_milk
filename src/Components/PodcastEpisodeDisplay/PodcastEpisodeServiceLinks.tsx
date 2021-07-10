import React from "react";
import { Col } from "react-bootstrap";
import ApplePodcastLogo from "../../Logos/ApplePodcastLogo";
import IHeartLogo from "../../Logos/IHeartLogo";
import SpotifyLogo from "../../Logos/SpotifyLogo";
import { PodcastServiceLinkInterface } from "../../DataTypes/PodcastEpisode";

interface PodcastEpisodeServiceLinksProps {
  links: Array<PodcastServiceLinkInterface>;
}

const PodcastEpisodeServiceLinks: React.FunctionComponent = (
  props: PodcastEpisodeServiceLinksProps
) => {
  const onClickHandler = function (evt) {
    document.location.href = evt.currentTarget?.dataset?.url;
  };

  if (props.links?.length) {
    const colWidth = Math.floor(12 / props.links.length);
    return props.links.map((item: PodcastServiceLink, key: number) => {
      let icon = "";
      switch (item.key.toLowerCase()) {
        case "itunes":
          // @ts-ignore
          icon = (
            <ApplePodcastLogo
              onClickHandler={onClickHandler}
              url={item.value}
            />
          );
          break;

        case "iheart":
          // @ts-ignore
          icon = (
            <IHeartLogo onClickHandler={onClickHandler} url={item.value} />
          );
          break;

        case "spotify":
          // @ts-ignore
          icon = (
            <SpotifyLogo onClickHandler={onClickHandler} url={item.value} />
          );
          break;

        default:
          icon = (
            <h5>
              <a data-url={item.value} href="#" onClick={onClickHandler}>
                {item.key}
              </a>
            </h5>
          );
      }

      return (
        <Col
          xs={12}
          md={4}
          style={{ cursor: "pointer" }}
          key={key}
          cellPadding={"1rem"}
        >
          {icon}
        </Col>
      );
    });
  }
  return <div></div>;
};

export {
  PodcastEpisodeServiceLinks as default,
  PodcastEpisodeServiceLinksProps,
};
