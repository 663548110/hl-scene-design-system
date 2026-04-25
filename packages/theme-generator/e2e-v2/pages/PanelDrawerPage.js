class PanelDrawerPage {
  constructor(page) {
    this.page = page;
  }

  get drawer() {
    return this.page.locator('.t-drawer');
  }

  get saveThemeBtn() {
    return this.page.locator('.panel-drawer__footer').getByRole('button', { name: '保存主题' });
  }

  get resetBtn() {
    return this.page.locator('.panel-drawer__footer').getByRole('button', { name: '重置' });
  }

  async clickSaveTheme() {
    await this.saveThemeBtn.click();
    await this.page.locator('.t-dialog__ctx:visible .t-dialog').waitFor({ state: 'visible' });
  }

  async clickReset() {
    await this.resetBtn.click();
  }
}

module.exports = { PanelDrawerPage };
