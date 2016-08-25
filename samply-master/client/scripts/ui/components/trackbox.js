'use strict';

/*
options
@state
@keymap
@trackid
@focus_table
@trigger_index
@width
*/
const trackBox = (options) => {
  let tb = document.createElement('button');

  tb.dataset.trackState = options.state   || 'empty/non ready';
  tb.dataset.mappedKey  = options.keymap;
  tb.dataset.trackId    = options.trackId || 'n/track';
  tb.className          = 'track-box';


  tb.addEventListener('mouseover', over_event => {
    options.focus_table.focused = over_event.target;
    over_event.target.focus();
  });

  tb.addEventListener('mouseout', out_event => {
    options.focus_table.focused = null;
    out_event.target.blur();
  });
  /*
  tb.addEventListener('keydown', kdown_event => {
    options.triggers_index.keymaps[kdown_event.key] = tb;
    options.triggers_index._stats.registered_keys++;
    console.log(options.triggers_index);
  });*/

  tb.innerHTML = `${tb.dataset.trackId}<br>${tb.dataset.mappedKey}<br>${tb.dataset.trackState}`;

  return tb;
}
