'use strict';

export { newDblClickStream };

import Rx from 'rx';

function newDblClickStream(clickable, options) {
  const opts = Object.assign({}, {
    buffer: 500,
    strict: true,
  }, options);

  return Rx.Observable.fromEvent(clickable, 'click')
    .bufferWithTime(opts.buffer)
    .filter((list) => opts.strict ? list.length == 2 : list.length >= 2);
}
