import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";

import { File } from "../DataTypes/File";
import { LiveDataFixture } from "../Utility/LiveDataFixture";
import { FileDataFactory } from "../Components/FileDisplay";
import { v4Regex } from "../Utility/uuidv4";

const expectedIncludeString = "";

const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
fixtureData.url.query.addFilter("filemime", "image/jpeg");
console.log("fixture data", fixtureData);
process.exit(fixtureData.url.toString());

test("image/jpeg", (done) => {
  const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
  fixtureData.url.query.addFilter("filemime", "image/jpeg");
  console.info("Running Test:", fixtureData.url.toString());
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);
      for (const origData of mockResponse.data) {
        const systemUnderTest = FileDataFactory(origData);
        expect(systemUnderTest).not.toBeUndefined();
        expect(systemUnderTest).not.toBe(null);
      }
    })
    .then(() => {
      done();
    });
});

test("image/png", (done) => {
  const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
  fixtureData.url.query.addFilter("filemime", "image/png");
  console.info("Running Test:", fixtureData.url.toString());
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);
      for (const origData of mockResponse.data) {
        const systemUnderTest = FileDataFactory(origData);
        expect(systemUnderTest).not.toBeUndefined();
        expect(systemUnderTest).not.toBe(null);
      }
    })
    .then(() => {
      done();
    });
});

test("image/gif", (done) => {
  const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
  fixtureData.url.query.addFilter("filemime", "image/gif");
  console.info("Running Test:", fixtureData.url.toString());
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);
      for (const origData of mockResponse.data) {
        const systemUnderTest = FileDataFactory(origData);
        expect(systemUnderTest).not.toBeUndefined();
        expect(systemUnderTest).not.toBe(null);
      }
    })
    .then(() => {
      done();
    });
});

test("audio/mpeg", (done) => {
  const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
  fixtureData.url.query.addFilter("filemime", "audio/mpeg");
  console.info("Running Test:", fixtureData.url.toString());
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);
      for (const origData of mockResponse.data) {
        const systemUnderTest = FileDataFactory(origData);
        expect(systemUnderTest).not.toBeUndefined();
        expect(systemUnderTest).not.toBe(null);
      }
    })
    .then(() => {
      done();
    });
});

test("application/pdf", (done) => {
  const fixtureData = new LiveDataFixture("file--file", expectedIncludeString);
  fixtureData.url.query.addFilter("filemime", "application/pdf");
  console.info("Running Test:", fixtureData.url.toString());
  fixtureData
    .getFixtureData()
    .then((mockResponse) => {
      expect(Array.isArray(mockResponse.data)).toBe(true);
      expect(mockResponse.length).not.toBe(0);
      for (const origData of mockResponse.data) {
        const systemUnderTest = FileDataFactory(origData);
        expect(systemUnderTest).not.toBeUndefined();
        expect(systemUnderTest).not.toBe(null);
      }
    })
    .then(() => {
      done();
    });
});
