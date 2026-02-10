describe("Random Test", () => {
  beforeEach(() => {
    console.log("Running before each test");
  });

  beforeAll(() => {
    console.log("Running before all tests");
  });

  test("should run a simple test", () => {
    expect(1).toBe(1);
  });
});
