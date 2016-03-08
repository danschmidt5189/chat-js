'use strict';

import { newDragStream, repositionDraggedElement } from './draggable';
import { newDblClickStream } from './dblclick';

(function (doc) {
  // Enable drag-n-drop for divs with class .draggable
  const draggedStream = newDragStream(doc, {
    isDraggable: function (e) {
      return e.target.classList.contains('draggable');
    },
  }).subscribe(repositionDraggedElement);

  // Log all double-clicks
  const dblClickStream = newDblClickStream(doc, {
    buffer: 500,
    strict: true,
  }).subscribe((clicks) => console.log(clicks));
})(document);
