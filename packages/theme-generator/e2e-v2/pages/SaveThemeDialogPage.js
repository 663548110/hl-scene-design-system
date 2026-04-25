class SaveThemeDialogPage {
  constructor(page) {
    this.page = page;
  }

  // 可见的 dialog wrapper（display: block 时可见）
  get visibleCtx() {
    return this.page.locator('.t-dialog__ctx:visible');
  }

  get dialog() {
    return this.visibleCtx.locator('.t-dialog');
  }

  get nameInput() {
    return this.visibleCtx.locator('.t-input__inner');
  }

  get confirmBtn() {
    return this.visibleCtx.locator('.t-dialog__footer .t-button--theme-primary');
  }

  get cancelBtn() {
    return this.visibleCtx.locator('.t-dialog__footer .t-button--theme-default');
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async confirm() {
    await this.confirmBtn.click();
  }

  async cancel() {
    await this.cancelBtn.click();
  }

  async saveTheme(name) {
    await this.fillName(name);
    await this.confirm();
    // 等待 dialog 关闭（ctx 变为 display:none）
    await this.visibleCtx.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async isDialogVisible() {
    return await this.visibleCtx.count() > 0;
  }
}

module.exports = { SaveThemeDialogPage };
