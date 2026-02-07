export function mockDateForBrowser(mockDate: Date) {
  // Mock the system date to ensure consistent calendar view
  const OriginalDate = globalThis.Date;

  class MockDate extends OriginalDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(mockDate.getTime());
      } else {
        // @ts-ignore
        super(...args);
      }
    }

    static now() {
      return mockDate.getTime();
    }
  }

  globalThis.Date = MockDate as DateConstructor;

  return () => {
    // Cleanup - restore original Date
    globalThis.Date = OriginalDate;
  };
}
