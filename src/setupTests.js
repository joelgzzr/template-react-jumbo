// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.CSSStyleSheet.prototype.insertRule = function _(rule, index) {
  const styleElement = document.createElement('style');
  const textNode = document.createTextNode(rule);
  styleElement.appendChild(textNode);
  document.head.appendChild(styleElement);
  return 0;
};
