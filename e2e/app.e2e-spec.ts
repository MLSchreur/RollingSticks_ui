import { RollingsticksPage } from './app.po';

describe('rollingsticks App', () => {
  let page: RollingsticksPage;

  beforeEach(() => {
    page = new RollingsticksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
