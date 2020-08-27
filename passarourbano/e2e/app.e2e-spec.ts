import { PassarourbanoPage } from './app.po';

describe('passarourbano App', () => {
  let page: PassarourbanoPage;

  beforeEach(() => {
    page = new PassarourbanoPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to xyz!!'))
      .then(done, done.fail);
  });
});
