'use strict';

export { newDragStream, repositionDraggedElement };

import Rx from 'rx';

function repositionDraggedElement({ target, top, left }) {
  target.style.top = top + 'px';
  target.style.left = left + 'px';
}

function newDragStream(container, options) {
  // options: allows caller to decide what's "draggable"
  const opts = Object.assign({}, {
    isDraggable: function (e) {
      return getComputedStyle(e.target).getPropertyValue('cursor') === 'move';
    },
  }, options);

  // Dragging starts on mouse-down over a draggable element, continues while
  // the mouse-moves, and ends on the next mouse-up.
  const mousedown = Rx.Observable.fromEvent(container, 'mousedown');
  const mousemove = Rx.Observable.fromEvent(container, 'mousemove');
  const mouseup = Rx.Observable.fromEvent(container, 'mouseup');

  return mousedown
    .filter(opts.isDraggable)
    // Stream new position until mouseup
    .flatMap(({ offsetX, offsetY }) => {
      return mousemove
        .map((mm) => {
          mm.preventDefault();
          return {
            target: mm.target,
            left: mm.clientX - offsetX,
            top: mm.clientY - offsetY,
          };
        })
        .takeUntil(mouseup);
    });
}
