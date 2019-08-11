/**
 * ## Useful links:
 * - [Guidelines and Registration Procedures for URI Schemes](https://tools.ietf.org/html/rfc7595#section-3.2)
 * - [Uniform Resource Identifier (URI): Generic Syntax](https://tools.ietf.org/html/rfc3986#section-3.2)
 * - [Different results in parsing hostname/origin with custom uri schemes](https://github.com/jsdom/whatwg-url/issues/110)
 */

import * as whatwg from 'whatwg-url';
import html from 'nanohtml';
import { throttle } from 'throttle-debounce';
import ObjectInspector from 'Inspector-JSON';

const $output = document.querySelector('.inspectors');
$output.appendChild(inspector({
  url: 'storage://repository/assets/4139cf6f746eaf13eb9c77381297fef9bbcd0c9123994238607343b649a7b180___dummy.pdf'
}));
$output.appendChild(inspector({
  url: 'storage:repository/assets/4139cf6f746eaf13eb9c77381297fef9bbcd0c9123994238607343b649a7b180___dummy.pdf'
}));

function inspector({ url } = {}) {
  let actual, expected;

  const inspector = html`
    <div class="inspector">
      <p class="code">new URL('<span oninput=${throttle(350, onInput)} contenteditable="true">${url}</span>')</p>
      ${(actual = dump({ value: new URL(url), className: 'actual' }))}
      <p class="code">// expected output according to <a href="https://url.spec.whatwg.org/" target="_blank">url.spec.whatwg.org</a></p>
      ${(expected = dump({ value: new whatwg.URL(url), className: 'expected' }))}
    </div>
  `;

  return inspector;

  function onInput(e) {
    const url = e.target.textContent;

    try {
      // eslint-disable-next-line no-new
      new URL(url);
    } catch (err) {
      actual.innerHTML = 'Invalid URL';
      expected.innerHTML = 'Invalid URL';
      return;
    }

    const newActual = dump({ value: new URL(url), className: 'actual' });
    inspector.replaceChild(newActual, actual);
    actual = newActual;

    const newExpected = dump({ value: new whatwg.URL(url), className: 'expected' });
    inspector.replaceChild(newExpected, expected);
    expected = newExpected;
  }
}

function dump({ value, config = { collapsed: false }, className = '' } = {}) {
  const element = html`
    <div class="object-dump ${className}"></div>
  `;
  const inspector = new ObjectInspector({ ...config, element });
  inspector.view(value);
  return element;
}
