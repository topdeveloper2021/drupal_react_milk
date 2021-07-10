import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { MediaPodcastEpisode } from "../DataTypes/MediaPodcastEpisode";
import { LiveDataFixture } from "../Utility/LiveDataFixture";
import { v4Regex } from "../Utility/uuidv4";

test("Podcast Episode DataType Testing", (done) => {
  const expectedIncludeString =
    "&include=field_media_image,thumbnail,field_media_audio_file";
  const fixtureData = new LiveDataFixture(
    "media--podcast_episode",
    expectedIncludeString
  );

  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);

      for (const origData of mockResponse.data) {
        const systemUnderTest = new MediaPodcastEpisode(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--podcast_episode")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4Regex));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toBe(true);
        if (
          origData.thumbnail !== undefined &&
          origData.thumbnail?.data === undefined
        ) {
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
        }
        if (
          origData.field_media_audio_file !== undefined &&
          origData.field_media_audio_file?.data === undefined
        ) {
          const audioFile = systemUnderTest.field_media_audio_file;
          expect(audioFile).not.toBeNull();
          expect(audioFile).not.toBeUndefined();
          expect(audioFile.id).toEqual(expect.stringMatching(v4));
          expect(audioFile.type).toEqual(expect.stringContaining("file--"));
          expect(audioFile.hasData()).toBe(true);
        }
      }
    })
    .then(() => {
      done();
    });
});
