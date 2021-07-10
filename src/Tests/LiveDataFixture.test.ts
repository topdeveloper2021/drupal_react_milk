import "@testing-library/jest-dom/extend-expect";
import { expect, test } from "@jest/globals";
import { LiveDataFixture } from "../Utility/LiveDataFixture";

test("LiveDataFixture testing", () => {
  console.info("Running Test:", process.env);
  ["media--image", "file--file", "node--article"].forEach((value) => {
    const liveDataFixture = new LiveDataFixture(value);
    expect(liveDataFixture).toBeInstanceOf(LiveDataFixture);
    liveDataFixture.getFixtureData().then((fixtureData) => {
      expect(fixtureData.data).not.toBeNull();
      expect(fixtureData.data).toBeDefined();
      expect(fixtureData.data).toBeInstanceOf(Array);
    });
  });
});
