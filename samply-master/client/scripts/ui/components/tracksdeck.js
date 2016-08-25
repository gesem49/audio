'use strict';
/*
TracksDeck component
It contains nine trackboxes

options
@width
@tbox_factory
@triggers_index
@focus_table
*/
const TRACKS_DECK_DEFSIZE = 9;
const KEYMAPS = Object.freeze({
  0: 'q',
  1: 'w',
  2: 'e',
  3: 'a',
  4: 's',
  5: 'd',
  6: 'z',
  7: 'x',
  8: 'c'
});
const tracksDeck = (options) => {

  let td = document.createElement('div');

  td.className = 'tracks-deck';
  //fill with buttons!
  for (let tb_counter = 0; tb_counter < TRACKS_DECK_DEFSIZE; tb_counter++) {
    td.appendChild(options.tbox_factory({
      state:          'empty',
      keymap:         KEYMAPS[tb_counter],
      trackid:        'not defined',
      focus_table:    options.focus_table,
      triggers_index: options.triggers_index,
      width:          '33.3%'
    }));
  }

  return td;
};
