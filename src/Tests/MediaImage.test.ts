import "@testing-library/jest-dom/extend-expect";
import { expect, test } from "@jest/globals";
import { MediaImage } from "../DataTypes/MediaImage";
import { LiveDataFixture } from "../Utility/LiveDataFixture";
import { v4Regex } from "../Utility/uuidv4";

const expectedIncludeString = "&include=field_media_image,thumbnail";
const fixtureData = new LiveDataFixture("media--image", expectedIncludeString);

test("MediaImage testing", (done) => {
  console.info("Running Test:", process.env);
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);

      for (const origData of mockResponse.data) {
        const systemUnderTest = new MediaImage(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--image")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4Regex));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toBe(true);
        if (
          origData.thumbnail !== undefined &&
          origData.thumbnail.data === undefined
        ) {
          expect(systemUnderTest.thumbnail).not.toBe(null);
          expect(systemUnderTest.thumbnail).not.toBe(undefined);
          const { thumbnail } = systemUnderTest;
          expect(thumbnail).not.toBeNull();
          expect(thumbnail.id).not.toBeUndefined();
          expect(thumbnail.type).not.toBeUndefined();
          expect(thumbnail.id).toEqual(expect.stringMatching(v4Regex));
          expect(thumbnail.type).toEqual(expect.stringContaining("file--"));
          const styleObject = thumbnail.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(styleObject.constructor.name).toBe("ImageStyleObject");
          expect(typeof styleObject.srcSet).toBe("string");
        }

        if (
          origData.field_media_image !== undefined &&
          origData.field_media_image?.data === undefined
        ) {
          const imageFile = systemUnderTest.field_media_image;
          expect(imageFile).not.toBeNull();
          expect(imageFile).not.toBeUndefined();
          expect(imageFile.id).toEqual(expect.stringMatching(v4Regex));
          expect(imageFile.type).toEqual(expect.stringContaining("file--"));
          expect(imageFile.hasData()).toBe(true);
          const styleObject = imageFile.imageStyleObject;
          expect(styleObject).not.toBeNull();
          expect(styleObject).not.toBeUndefined();
          expect(styleObject.constructor.name).toBe("ImageStyleObject");
          expect(typeof styleObject.srcSet).toBe("string");
        }
        return true;
      }
    })
    .then(() => {
      done();
    });
});
