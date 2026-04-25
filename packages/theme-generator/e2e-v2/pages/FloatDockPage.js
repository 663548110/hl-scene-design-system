class FloatDockPage {
  constructor(page) {
    this.page = page;
  }

  get dock() {
    return this.page.locator('.dock');
  }

  get themeBtn() {
    return this.page.locator('.dock .generator-btn').first();
  }

  get customizeBtn() {
    return this.page.locator('.dock .generator-btn').nth(1);
  }

  get exportBtn() {
    return this.page.locator('.dock .export-btn');
  }

  get resetBtn() {
    return this.page.locator('.dock .recover-btn');
  }

  async clickThemeTab() {
    await this.themeBtn.click();
    await this.page.locator('.recommend-theme').waitFor({ state: 'visible' });
  }

  async clickCustomize() {
    await this.customizeBtn.click();
    await this.page.locator('.t-drawer').waitFor({ state: 'visible' });
  }

  async clickExport() {
    await this.exportBtn.click();
  }

  async clickReset() {
    await this.resetBtn.locator('.t-button').click();
    await this.page
      .locator('.t-popconfirm__buttons .t-button--theme-primary')
      .click();
  }
}

module.exports = { FloatDockPage };
