import React from "react";
import renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import { MediaDisplayImage } from "../Components/MediaDisplay/MediaDisplayImage";
import { LiveDataFixture } from "../Utility/LiveDataFixture";

const expectedIncludeString = "&include=field_media_image,thumbnail";
const fixtureData = new LiveDataFixture("media--image", expectedIncludeString);

test("MediaImageDisplay basic render test", (done) => {
  console.info("Running Test:", process.env);

  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      for (const origData of mockResponse.data) {
        expect(Array.isArray(mockResponse.data)).toBe(true);
        expect(mockResponse.length).not.toBe(0);

        const systemUnderTest = renderer.create(
          <MediaDisplayImage data={origData} view_mode="full" />
        );
        const tree = systemUnderTest.toJSON();
        console.log("tree", tree);
      }
    })
    .then(() => {
      done();
    });
});
