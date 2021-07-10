import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { MediaReport } from "../DataTypes/MediaReport";
import { LiveDataFixture } from "../Utility/LiveDataFixture";
import { ImageStyleObject } from "../DataTypes/ImageStyleObject";
import { v4Regex } from "../Utility/uuidv4";

const expectedIncludeString = "&include=thumbnail,field_cover,field_media_file";
const fixtureData = new LiveDataFixture("media--report", expectedIncludeString);
test("MediaReport testing", (done) => {
  console.info("Running Test:", process.env);
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);

      for (const origData in mockResponse.data) {
        const systemUnderTest = new MediaReport(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--report")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4Regex));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toBe(true);
        if (origData.thumbnail !== undefined) {
          expect(systemUnderTest.thumbnail).not.toBe(null);
          expect(systemUnderTest.thumbnail).not.toBe(undefined);
          const thumbnail = systemUnderTest.getThumbnail();
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
          origData.field_cover !== undefined &&
          origData.field_cover?.data === undefined
        ) {
          const coverImage = systemUnderTest.field_cover;
          expect(coverImage).not.toBeUndefined();
          expect(coverImage).not.toBe(null);
          expect(coverImage.constructor.name).toBe("MediaImage");
          expect(coverImage.id).toEqual(expect.stringMatching(v4Regex));
          expect(coverImage.type).toEqual(expect.stringContaining("file--"));
          const styleObject = coverImage.imageStyleObject;
          if (styleObject === undefined) {
            process.exit(JSON.stringify(coverImage, null, 2));
          }
          expect(styleObject).not.toBeUndefined();
          expect(styleObject).not.toBe(null);
          expect(styleObject.constructor.name).toBe("ImageStyleObject");
          expect(typeof styleObject.srcSet).toBe("string");
        }
        if (
          origData.field_media_file !== undefined &&
          origData.field_media_file?.data === undefined
        ) {
          const documentFile = systemUnderTest.field_media_file;
          expect(documentFile).not.toBeNull();
          expect(documentFile).not.toBeUndefined();
          expect(documentFile.id).toEqual(expect.stringMatching(v4Regex));
          expect(documentFile.type).toEqual(expect.stringContaining("file--"));
          expect(documentFile.constructor.name).toBe("DocumentFile");
          expect(documentFile.hasData()).toBe(true);
          expect(typeof documentFile.uri?.url).toBe("string");
        }
      }
    })
    .then(() => {
      done();
    });
}, 10000);
