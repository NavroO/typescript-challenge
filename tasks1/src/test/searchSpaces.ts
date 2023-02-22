import { searchSpaces } from "../service/search";

describe("searchSpaces", () => {
  test("returns results when search text matches", async () => {
    const results = await searchSpaces("Kraków HQ");
    expect(results.spaces).toHaveLength(20);
    expect(results.spaces[0].name).toBe("Kraków HQ 1");
    expect(results.spaces[19].name).toBe("Kraków HQ 20");
  });

  test("returns empty results when search text does not match", async () => {
    const results = await searchSpaces("Paris");
    expect(results.spaces).toHaveLength(0);
  });

  test("throws an error with a chance of 10%", async () => {
    await expect(searchSpaces("")).rejects.toThrowError("Network error");
  });
});
