import { isMobileBrowser } from '../browser';

it('checks if a user uses a mobile browser', () => {
  expect(isMobileBrowser()).toEqual(false);
});
