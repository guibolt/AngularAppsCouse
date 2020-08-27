import { browser, by, element } from 'protractor';

export class PassarourbanoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('xyz-root h1')).getText();
  }
}
