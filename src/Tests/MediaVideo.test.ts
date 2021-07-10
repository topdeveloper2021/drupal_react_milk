import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { MediaVideo } from "../DataTypes/MediaVideo";
import { LiveDataFixture } from "../Utility/LiveDataFixture";
import { v4Regex } from "../Utility/uuidv4";

const expectedIncludeString = "&include=thumbnail";
const fixtureData = new LiveDataFixture("media--video", expectedIncludeString);

test("MediaVideo DataType Testing", (done) => {
  console.info("Running Test:", process.env);
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);

      for (const origData of mockResponse.data) {
        const systemUnderTest = new MediaVideo(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--video")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4Regex));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toEqual(true);
        if (origData.thumbnail !== undefined) {
          expect(systemUnderTest.thumbnail).not.toBe(null);
          expect(systemUnderTest.thumbnail).not.toBeUndefined();
          const thumbnail = systemUnderTest.getThumbnail();
          expect(thumbnail).not.toBeNull();
          expect(thumbnail).not.toBeUndefined();
          expect(thumbnail.id).not.toBeUndefined();
          expect(thumbnail.type).not.toBeUndefined();
          expect(thumbnail.id).toEqual(expect.stringMatching(v4Regex));
          expect(thumbnail.type).toEqual(expect.stringContaining("file--"));
          const styleObject = thumbnail.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(typeof styleObject.srcSet).toBe("string");
        }
        if (
          origData.field_media_file !== undefined &&
          origData.field_media_file?.data === undefined
        ) {
          const imageFile = systemUnderTest.field_media_file;
          expect(imageFile).not.toBeNull();
          expect(imageFile).not.toBeUndefined();
          expect(imageFile.id).toEqual(expect.stringMatching(v4Regex));
          expect(imageFile.type).toEqual(expect.stringContaining("file--"));
          expect(imageFile.hasData()).toBe(true);
          const styleObject = imageFile.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(typeof styleObject.srcSet).toBe("string");
        }
      }
    })
    .then(() => {
      done();
    });
});
