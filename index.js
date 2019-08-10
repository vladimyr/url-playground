'use strict';

import html from 'nanohtml';
import ObjectInspector from 'Inspector-JSON';

const $output = document.querySelector('.inspectors');
$output.appendChild(inspector({
  url: 'storage://repository/assets/4139cf6f746eaf13eb9c77381297fef9bbcd0c9123994238607343b649a7b180___dummy.pdf'
}));
$output.appendChild(inspector({
  url: 'storage:repository/assets/4139cf6f746eaf13eb9c77381297fef9bbcd0c9123994238607343b649a7b180___dummy.pdf'
}));

function inspector({ url } = {}) {
  return html`
    <div class="inspector">
      <p class="code">new URL(${url})</p>
      ${dump({ value: new URL(url), config: { collapsed: false } })}
    </div>
  `;
}

function dump({ value, config } = {}) {
  const element = html`
    <div class="object-dump"></div>
  `;
  const inspector = new ObjectInspector({ ...config, element });
  inspector.view(value);
  return element;
}
