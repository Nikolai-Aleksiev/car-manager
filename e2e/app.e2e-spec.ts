import { CarManagerPage } from './app.po';

describe('car-manager App', () => {
  let page: CarManagerPage;

  beforeEach(() => {
    page = new CarManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
