import { ReactiveFormsPage } from './app.po';

describe('reactive-forms App', () => {
  let page: ReactiveFormsPage;

  beforeEach(() => {
    page = new ReactiveFormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
