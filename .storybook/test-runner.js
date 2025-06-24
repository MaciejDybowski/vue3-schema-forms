module.exports = {
  async preVisit(page, context) {
    // Ustaw viewport dla konsystentności
    await page.setViewportSize({ width: 1280, height: 720 });

    // Zwiększ timeout dla CI
    if (process.env.CI) {
      page.setDefaultTimeout(30000);
    }
  },

  async postVisit(page, context) {
    // Poczekaj na załadowanie wszystkich elementów
    await page.waitForLoadState('networkidle');

    // Dodatkowe czekanie dla komponentów z animacjami
    await page.waitForTimeout(800);
  },

  tags: {
    // Pomiń problematyczne testy w CI
    skip: process.env.CI ? ['skip-ci'] : [],
  }
};
