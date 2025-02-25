import { getTestingFunctions } from '../../testSimplifier';
import { cleanUpWorkspace, setupWorkspace } from './../../testUtils';
import { ModeName } from '../../../src/mode/mode';

suite('Motions in Normal Mode', () => {
  let { newTest, newTestOnly, newTestSkip } = getTestingFunctions();

  setup(async () => {
    await setupWorkspace();
  });

  teardown(cleanUpWorkspace);

  newTest({
    title: 'Can handle [(',
    start: ['({|})'],
    keysPressed: '[(',
    end: ['|({})'],
  });

  newTest({
    title: 'Can handle nested [(',
    start: ['(({|})'],
    keysPressed: '[(',
    end: ['(|({})'],
  });

  newTest({
    title: 'Can handle <number>[(',
    start: ['(({|})'],
    keysPressed: '2[(',
    end: ['|(({})'],
  });

  newTest({
    title: 'Can handle [( and character under cursor exclusive',
    start: ['(|({})'],
    keysPressed: '[(',
    end: ['|(({})'],
  });

  newTest({
    title: 'Can handle ])',
    start: ['({|})'],
    keysPressed: '])',
    end: ['({}|)'],
  });

  newTest({
    title: 'Can handle nested ])',
    start: ['(({|}))'],
    keysPressed: '])',
    end: ['(({}|))'],
  });

  newTest({
    title: 'Can handle <number>])',
    start: ['(({|}))'],
    keysPressed: '2])',
    end: ['(({})|)'],
  });

  newTest({
    title: 'Can handle ]) and character under cursor exclusive',
    start: ['(({}|))'],
    keysPressed: '])',
    end: ['(({})|)'],
  });

  newTest({
    title: 'Can handle [{',
    start: ['{(|)}'],
    keysPressed: '[{',
    end: ['|{()}'],
  });

  newTest({
    title: 'Can handle nested [{',
    start: ['{{(|)}'],
    keysPressed: '[{',
    end: ['{|{()}'],
  });

  newTest({
    title: 'Can handle <number>[{',
    start: ['{{(|)}'],
    keysPressed: '2[{',
    end: ['|{{()}'],
  });

  newTest({
    title: 'Can handle [{ and character under cursor exclusive',
    start: ['{|{()}'],
    keysPressed: '[{',
    end: ['|{{()}'],
  });

  newTest({
    title: 'Can handle ]}',
    start: ['{(|)}'],
    keysPressed: ']}',
    end: ['{()|}'],
  });

  newTest({
    title: 'Can handle nested ]}',
    start: ['{{(|)}}'],
    keysPressed: ']}',
    end: ['{{()|}}'],
  });

  newTest({
    title: 'Can handle <number>]}',
    start: ['{{(|)}}'],
    keysPressed: '2]}',
    end: ['{{()}|}'],
  });

  newTest({
    title: 'Can handle ]} and character under cursor exclusive',
    start: ['{{()|}}'],
    keysPressed: ']}',
    end: ['{{()}|}'],
  });

  newTest({
    title: "Can handle 'ge'",
    start: ['text tex|t'],
    keysPressed: '$ge',
    end: ['tex|t text'],
  });

  newTest({
    title: "Can handle 'gg'",
    start: ['text', 'text', 'tex|t'],
    keysPressed: '$jkjgg',
    end: ['|text', 'text', 'text'],
  });

  newTest({
    title: "Can handle 'gg' to first non blank char on random line",
    start: ['   te|xt', '  text', ' text', 'test'],
    keysPressed: '3gg',
    end: ['   text', '  text', ' |text', 'test'],
  });

  newTest({
    title: "Can handle 'gg' to first non blank char on first line",
    start: ['   text', 'text', 'tex|t'],
    keysPressed: 'gg',
    end: ['   |text', 'text', 'text'],
  });

  newTest({
    title: "'gg' obeys startofline",
    start: ['   text', 'text', 'texttexttex|t'],
    keysPressed: 'gg',
    end: ['   |text', 'text', 'texttexttext'],
  });

  newTest({
    title: 'Retain same column when moving up/down',
    start: ['text text', 'text', 'text tex|t'],
    keysPressed: 'kk',
    end: ['text tex|t', 'text', 'text text'],
  });

  newTest({
    title: 'Can handle <enter>',
    start: ['text te|xt', 'text'],
    keysPressed: '\n',
    end: ['text text', '|text'],
  });

  newTest({
    title: '$ always keeps cursor on EOL',
    start: ['text text', 'text', 'text tex|t'],
    keysPressed: 'gg$jj',
    end: ['text text', 'text', 'text tex|t'],
  });

  newTest({
    title: 'Can handle $ with a count',
    start: ['te|xt text', 'text', 'text text text'],
    keysPressed: '3$',
    end: ['text text', 'text', 'text text tex|t'],
  });

  newTest({
    title: 'Can handle $ with a count at end of file',
    start: ['te|xt text text'],
    keysPressed: '3$',
    end: ['text text tex|t'],
  });

  newTest({
    title: 'Can handle <End> with a count',
    start: ['te|xt text', 'text', 'text text text'],
    keysPressed: '3<End>',
    end: ['text text', 'text', 'text text tex|t'],
  });

  newTest({
    title: 'Can handle <D-right> with a count',
    start: ['te|xt text', 'text', 'text text text'],
    keysPressed: '3<D-right>',
    end: ['text text', 'text', 'text text tex|t'],
  });

  newTest({
    title: "Can handle 'f'",
    start: ['text tex|t'],
    keysPressed: '^ft',
    end: ['tex|t text'],
  });

  newTest({
    title: "Can handle 'f' twice",
    start: ['text tex|t'],
    keysPressed: '^ftft',
    end: ['text |text'],
  });

  newTest({
    title: "Can handle 'f' with <tab>",
    start: ['|text\tttext'],
    keysPressed: 'f<tab>',
    end: ['text|\tttext'],
  });

  newTest({
    title: "Can handle 'F'",
    start: ['text tex|t'],
    keysPressed: '$Ft',
    end: ['text |text'],
  });

  newTest({
    title: "Can handle 'F' twice",
    start: ['text tex|t'],
    keysPressed: '$FtFt',
    end: ['tex|t text'],
  });

  newTest({
    title: "Can handle 't'",
    start: ['text tex|t'],
    keysPressed: '^tt',
    end: ['te|xt text'],
  });

  newTest({
    title: "Can handle 't' twice",
    start: ['text tex|t'],
    keysPressed: '^tttt',
    end: ['te|xt text'],
  });

  newTest({
    title: "Can handle 'T'",
    start: ['text tex|t'],
    keysPressed: '$Tt',
    end: ['text t|ext'],
  });

  newTest({
    title: "Can handle 'T' twice",
    start: ['text tex|t'],
    keysPressed: '$TtTt',
    end: ['text t|ext'],
  });

  newTest({
    title: 'Can run a forward search',
    start: ['|one two three'],
    keysPressed: '/thr\n',
    end: ['one two |three'],
  });

  newTest({
    title: 'Can run a forward and find next search',
    start: ['|one two two two'],
    keysPressed: '/two\nn',
    end: ['one two |two two'],
  });

  // These "remembering history between editor" tests have started
  // breaking. Since I don't remember these tests ever breaking for real, and
  // because they're the cause of a lot of flaky tests, I'm disabling these for
  // now.

  // test('Remembers a forward search from another editor', async function() {
  //   // adding another editor
  //   await setupWorkspace();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['|one two two two'],
  //     keysPressed: '/two\n',
  //     end: ['one |two two two'],
  //   });

  //   await modeHandler.handleMultipleKeyEvents(['g', 'T', '<Esc>']);

  //   await waitForTabChange();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['|three four two one'],
  //     keysPressed: '<Esc>n',
  //     end: ['three four |two one'],
  //   });
  // });

  // test('Shares forward search history from another editor', async () => {
  //   // adding another editor
  //   await setupWorkspace();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['|one two two two'],
  //     keysPressed: '/two\n',
  //     end: ['one |two two two'],
  //   });

  //   await modeHandler.handleMultipleKeyEvents(['g', 'T', '<Esc>']);

  //   await waitForTabChange();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['|three four two one'],
  //     keysPressed: '/\n',
  //     end: ['three four |two one'],
  //   });
  // });

  newTest({
    title: 'Can run a reverse search',
    start: ['one two thre|e'],
    keysPressed: '?two\n',
    end: ['one |two three'],
  });

  newTest({
    title: 'Can run a reverse and find next search',
    start: ['one two two thre|e'],
    keysPressed: '?two\nn',
    end: ['one |two two three'],
  });

  // test('Remembers a reverse search from another editor', async () => {
  //   // adding another editor
  //   await setupWorkspace();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['one two two two|'],
  //     keysPressed: '?two\n',
  //     end: ['one two two |two'],
  //   });

  //   await modeHandler.handleMultipleKeyEvents(['g', 'T', '<Esc>']);

  //   await waitForTabChange();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['three four two one|'],
  //     keysPressed: '<Esc>n',
  //     end: ['three four |two one'],
  //   });
  // });

  // test('Shares reverse search history from another editor', async () => {
  //   // adding another editor
  //   await setupWorkspace();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['one two two two|'],
  //     keysPressed: '?two\n',
  //     end: ['one two two |two'],
  //   });

  //   await modeHandler.handleMultipleKeyEvents(['g', 'T', '<Esc>']);

  //   await waitForTabChange();

  //   await testIt(modeHandler, {
  //     title: '',
  //     start: ['three four two one|'],
  //     keysPressed: '?\n',
  //     end: ['three four |two one'],
  //   });
  // });

  newTest({
    title: 'cancelled search reverts to previous search state',
    start: ['|one', 'two two', 'three three three'],
    keysPressed: '/two\n/three<Esc>n',
    end: ['one', 'two |two', 'three three three'],
  });

  newTest({
    title: 'Backspace on empty search cancels',
    start: ['|one two three'],
    keysPressed: '/tw<BS><BS><BS>',
    end: ['|one two three'],
    endMode: ModeName.Normal,
  });

  newTest({
    title: 'Search offsets: b does nothing',
    start: ['|hayneedlehay'],
    keysPressed: '/needle/b\n',
    end: ['hay|needlehay'],
  });

  newTest({
    title: 'Search offsets: b2 goes 2 to the right',
    start: ['|hayneedlehay'],
    keysPressed: '/needle/b2\n',
    end: ['hayne|edlehay'],
  });

  newTest({
    title: 'Search offsets: b+3 goes 3 to the right',
    start: ['|hayneedlehay'],
    keysPressed: '/needle/b+3\n',
    end: ['haynee|dlehay'],
  });

  newTest({
    title: 'Search offsets: e goes to the end',
    start: ['|hayneedlehay'],
    keysPressed: '/needle/e\n',
    end: ['hayneedl|ehay'],
  });

  newTest({
    title: 'Search offsets: character offset goes across line boundaries',
    start: ['|hayneedlehay', '123'],
    keysPressed: '/needle/e+5\n',
    end: ['hayneedlehay', '1|23'],
  });

  newTest({
    title: 'Search offsets: 2 goes 2 down',
    start: ['|hayneedlehay', 'abc', 'def'],
    keysPressed: '/needle/2\n',
    end: ['hayneedlehay', 'abc', '|def'],
  });

  newTest({
    title: 'Search offsets: -2 goes 2 up',
    start: ['abc', '|def', 'hayneedlehay', 'abc', 'def'],
    keysPressed: '/needle/-2\n',
    end: ['|abc', 'def', 'hayneedlehay', 'abc', 'def'],
  });

  newTest({
    title: 'maintains column position correctly',
    start: ['|one one one', 'two', 'three'],
    keysPressed: 'lllljj',
    end: ['one one one', 'two', 'thre|e'],
  });

  newTest({
    title: 'maintains column position correctly with $',
    start: ['|one one one', 'two', 'three'],
    keysPressed: '$jj',
    end: ['one one one', 'two', 'thre|e'],
  });

  newTest({
    title: 'Can handle G ',
    start: ['|one', 'two', '  three'],
    keysPressed: 'G',
    end: ['one', 'two', '  |three'],
  });

  newTest({
    title: 'Can handle G with number prefix',
    start: ['|one', 'two', 'three'],
    keysPressed: '2G',
    end: ['one', '|two', 'three'],
  });

  newTest({
    title: 'Can handle G with number prefix',
    start: ['|one', 'two', 'three'],
    keysPressed: '5G',
    end: ['one', 'two', '|three'],
  });

  newTest({
    title: 'Can handle gg',
    start: ['one', '|two', 'three'],
    keysPressed: 'gg',
    end: ['|one', 'two', 'three'],
  });

  newTest({
    title: 'Can handle gg with number prefix',
    start: ['|one', 'two', 'three'],
    keysPressed: '2gg',
    end: ['one', '|two', 'three'],
  });

  // This is still currently not possible.
  // newTest({
  //   title: "Can handle dot with I with tab",
  //   start: ['on|e', 'two', 'three'],
  //   keysPressed: 'I<tab><Esc>j.j.',
  //   end: ['  one', '  two', ' | three']
  // });

  newTest({
    title: 'Can handle 0',
    start: ['blah blah bla|h'],
    keysPressed: '0',
    end: ['|blah blah blah'],
  });

  newTest({
    title: 'Can handle 0 as part of a repeat',
    start: ['|blah blah blah'],
    keysPressed: '10l',
    end: ['blah blah |blah'],
  });

  newTest({
    title: 'Can handle g*',
    start: ['|blah duh blahblah duh blah'],
    keysPressed: 'g*',
    end: ['blah duh |blahblah duh blah'],
  });

  newTest({
    title: 'Can handle g*n',
    start: ['|blah duh blahblah duh blah'],
    keysPressed: 'g*n',
    end: ['blah duh blah|blah duh blah'],
  });

  newTest({
    title: 'Can handle *',
    start: ['|blah blahblah duh blah blah'],
    keysPressed: '*',
    end: ['blah blahblah duh |blah blah'],
  });

  newTest({
    title: 'Can handle **',
    start: ['|blah duh blah duh blah'],
    keysPressed: '**',
    end: ['blah duh blah duh |blah'],
  });

  newTest({
    title: 'Can handle # on whitespace',
    start: ['abc abcdef| abc'],
    keysPressed: '#',
    end: ['|abc abcdef abc'],
  });

  newTest({
    title: 'Can handle # on EOL',
    start: ['abc abcdef abc| '],
    keysPressed: '#',
    end: ['abc abcdef abc| '],
  });

  newTest({
    title: 'Can handle g#',
    start: ['blah duh blahblah duh |blah'],
    keysPressed: 'g#',
    end: ['blah duh blah|blah duh blah'],
  });

  newTest({
    title: 'Can handle g#n',
    start: ['blah duh blahblah duh |blah'],
    keysPressed: 'g#n',
    end: ['blah duh |blahblah duh blah'],
  });

  newTest({
    title: 'Can handle #',
    start: ['blah blah blahblah duh |blah'],
    keysPressed: '#',
    end: ['blah |blah blahblah duh blah'],
  });

  newTest({
    title: 'Can handle # already on the word',
    start: ['one o|ne'],
    keysPressed: '#',
    end: ['|one one'],
  });

  newTest({
    title: 'Can handle ##',
    start: ['blah duh blah duh |blah'],
    keysPressed: '##',
    end: ['|blah duh blah duh blah'],
  });

  // These tests take advantage of the fact that an empty search repeats the last search
  newTest({
    title: '* adds to search history',
    start: ['|ONE two three ONE two three four ONE'],
    keysPressed: '*/\n',
    end: ['ONE two three ONE two three four |ONE'],
  });
  newTest({
    title: '# adds to search history',
    start: ['ONE two three ONE two three four |ONE'],
    keysPressed: '#?\n',
    end: ['|ONE two three ONE two three four ONE'],
  });

  newTest({
    title: 'Can handle |',
    start: ['blah duh blah duh |blah'],
    keysPressed: '|',
    end: ['|blah duh blah duh blah'],
  });

  newTest({
    title: 'Can handle <number> |',
    start: ['blah duh blah duh |blah'],
    keysPressed: '3|',
    end: ['bl|ah duh blah duh blah'],
  });

  newTest({
    title: 'Can handle +',
    start: ['|blah', 'duh'],
    keysPressed: '+',
    end: ['blah', '|duh'],
  });

  newTest({
    title: 'Can handle + indent',
    start: ['|blah', '   duh'],
    keysPressed: '+',
    end: ['blah', '   |duh'],
  });

  newTest({
    title: 'Can handle + with count prefix',
    start: ['|blah', 'duh', 'dur', 'hur'],
    keysPressed: '2+',
    end: ['blah', 'duh', '|dur', 'hur'],
  });

  newTest({
    title: 'Can handle -',
    start: ['blah', '|duh'],
    keysPressed: '-',
    end: ['|blah', 'duh'],
  });

  newTest({
    title: 'Can handle - indent',
    start: ['   blah', '|duh'],
    keysPressed: '-',
    end: ['   |blah', 'duh'],
  });

  newTest({
    title: 'Can handle - with count prefix',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '2-',
    end: ['|blah', 'duh', 'dur', 'hur'],
  });

  newTest({
    title: 'Can handle _',
    start: ['blah', '|duh'],
    keysPressed: '_',
    end: ['blah', '|duh'],
  });

  newTest({
    title: 'Can handle _ with count prefix',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '2_',
    end: ['blah', 'duh', 'dur', '|hur'],
  });

  newTest({
    title: 'Can handle g_',
    start: ['blah', '|duh'],
    keysPressed: 'g_',
    end: ['blah', 'du|h'],
  });

  newTest({
    title: 'Can handle g_ with count prefix',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '2g_',
    end: ['blah', 'duh', 'dur', 'hu|r'],
  });

  newTest({
    title: 'Can handle <up> key',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '<up>',
    end: ['blah', '|duh', 'dur', 'hur'],
  });

  newTest({
    title: 'Can handle <down> key',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '<down>',
    end: ['blah', 'duh', 'dur', '|hur'],
  });

  newTest({
    title: 'Can handle <left> key',
    start: ['blah', 'duh', 'd|ur', 'hur'],
    keysPressed: '<left>',
    end: ['blah', 'duh', '|dur', 'hur'],
  });

  newTest({
    title: 'Can handle <right> key',
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: '<right>',
    end: ['blah', 'duh', 'd|ur', 'hur'],
  });

  newTest({
    title: "Can handle 'gk'",
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: 'gk',
    end: ['blah', '|duh', 'dur', 'hur'],
  });

  newTest({
    title: "Can handle 'gj'",
    start: ['blah', 'duh', '|dur', 'hur'],
    keysPressed: 'gj',
    end: ['blah', 'duh', 'dur', '|hur'],
  });

  newTestSkip({
    title: "Preserves cursor position when handling 'gk'",
    start: ['blah', 'duh', 'a', 'hu|r '],
    keysPressed: 'gkgk',
    end: ['blah', 'du|h', 'a', 'hur '],
  });

  newTestSkip({
    title: "Preserves cursor position when handling 'gj'",
    start: ['blah', 'du|h', 'a', 'hur '],
    keysPressed: 'gjgj',
    end: ['blah', 'duh', 'a', 'hu|r '],
  });
});
