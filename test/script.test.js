// [jest --env=jsdom]で実行することでwindow/document/localStorageが使用できるようになる:https://jestjs.io/docs/ja/getting-started
const sum = require('../src/js/script');

test('sum()を実行', () => {
    expect(sum()).toBe(0)
});
test('sum()に引数を設定して実行', () => {
    expect(sum(1, 2, 3)).toBe(6)
});
