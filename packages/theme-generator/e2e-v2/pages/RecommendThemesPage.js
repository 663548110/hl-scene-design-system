class RecommendThemesPage {
  constructor(page) {
    this.page = page;
  }

  get panel() {
    return this.page.locator('.recommend-theme');
  }

  get themeItems() {
    return this.page.locator('.recommend-theme__flex > div');
  }

  get addThemeBtn() {
    return this.page.locator('.recommend-theme__flex-theme--add');
  }

  get activeTheme() {
    return this.page.locator('.recommend-theme__flex-theme--active');
  }

  async selectTheme(index) {
    await this.themeItems.nth(index).click();
  }

  async clickAddTheme() {
    await this.addThemeBtn.click();
    await this.page.locator('.t-dialog__ctx >> visible=true').waitFor({ state: 'visible' });
  }

  async getThemeCount() {
    return await this.themeItems.count();
  }
}

module.exports = { RecommendThemesPage };
