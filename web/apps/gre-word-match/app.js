/* Word Match Sprint: pair six words with their meanings as fast as you can. */
(function () {
  'use strict';
  const ROUND = 6;
  const round = (words, seed) => { const r = SK.rng(seed); const pick = SK.sample(r, words, ROUND); return { pick, meanings: SK.shuffle(r, pick) }; };
  // A pair is right when the meaning card belongs to the same word.
  const isPair = (word, meaning) => word.id === meaning.id;
  const App = {
    about: 'A quick game for the GRE word bank. Six words and six meanings appear. Click a word, then its meaning. Wrong pairs cost two seconds. Beat your best time, and the words you miss are logged for review in the error log.',
    how: ['Press **New round**.', 'Click a word, then the meaning that matches it.', 'Finish all six pairs to stop the clock.', 'Your best time and missed words are saved.'],
    tabs: [
      { id: 'play', label: 'Play', render(el, ctx) {
        const best = SK.store.get('gre-word-match.best', null);
        const start = () => {
          const { pick, meanings } = round(ctx.data.gre_words, SK.seedNow());
          let chosen = null, done = new Set(), penalty = 0;
          const t0 = Date.now();
          const timer = SK.timer(0, null);
          const board = SK.h('div', { class: 'sk-split' });
          const left = SK.h('div', { class: 'sk-choices' }), right = SK.h('div', { class: 'sk-choices' });
          board.append(left, right);
          const msg = SK.h('div', {});
          const draw = () => {
            SK.clear(left); SK.clear(right);
            for (const w of pick) left.appendChild(SK.h('button', { type: 'button', class: 'sk-choice' + (done.has(w.id) ? ' right' : ''), disabled: done.has(w.id), 'aria-pressed': chosen === w ? 'true' : 'false', style: chosen === w ? { borderColor: 'var(--accent)', borderWidth: '2px' } : {}, onclick: () => { chosen = w; draw(); } }, SK.h('strong', { text: w.w })));
            for (const m of meanings) right.appendChild(SK.h('button', { type: 'button', class: 'sk-choice' + (done.has(m.id) ? ' right' : ''), disabled: done.has(m.id), onclick: () => {
              if (!chosen) { SK.clear(msg).appendChild(SK.note('Click a word first.')); return; }
              if (isPair(chosen, m)) { done.add(m.id); SK.clear(msg); }
              else { penalty += 2; SK.logMistake({ id: chosen.id, type: 'card', stem: chosen.w, answer: chosen.d, topic: 'Word match' }); SK.clear(msg).appendChild(SK.note('Not a pair: 2 seconds added.', 'wrong')); }
              chosen = null; draw();
              if (done.size === ROUND) finish();
            } }, m.d));
          };
          const finish = () => {
            timer.stop();
            const secs = SK.round((Date.now() - t0) / 1000 + penalty, 1);
            const prev = SK.store.get('gre-word-match.best', null);
            if (prev === null || secs < prev) SK.store.set('gre-word-match.best', secs);
            SK.logSession({ correct: ROUND, total: ROUND, seconds: secs, byTopic: { 'Word match': { right: ROUND, total: ROUND } } });
            SK.logPractice(secs / 60, 'Word match');
            SK.clear(msg).appendChild(SK.note('Done in ' + secs + ' seconds' + (penalty ? ' including ' + penalty + ' penalty seconds' : '') + '.' + (prev === null || secs < prev ? ' A new best!' : ' Best: ' + prev + ' s.'), 'right'));
            msg.appendChild(SK.btn('New round', start, '', { 'data-auto': 'once' }));
          };
          SK.clear(el);
          el.appendChild(SK.card('Match the pairs', SK.h('div', { class: 'sk-row', style: { marginBottom: '10px' } }, timer.el, SK.h('span', { class: 'sk-muted sk-small', text: SK.store.get('gre-word-match.best', null) ? 'Best: ' + SK.store.get('gre-word-match.best', null) + ' s' : 'No best time yet' })), board, msg));
          draw();
        };
        el.appendChild(SK.card('Word Match Sprint', SK.h('p', { class: 'sk-muted', text: 'Six words, six meanings. ' + (best ? 'Your best time is ' + best + ' seconds.' : 'No best time yet.') }), SK.btn('New round', start, '', { 'data-auto': 'once' })));
      } },
    ],
    round, isPair,
    checks: {
      'a round has six different words and the same six meanings': (data, assert) => {
        for (let s = 1; s < 50; s++) {
          const { pick, meanings } = round(data.gre_words, s);
          assert.equal(new Set(pick.map((w) => w.id)).size, 6);
          assert.deepEqual(pick.map((w) => w.id).sort(), meanings.map((m) => m.id).sort());
          assert.ok(isPair(pick[0], meanings.find((m) => m.id === pick[0].id)));
          assert.ok(!isPair(pick[0], meanings.find((m) => m.id !== pick[0].id)));
        }
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
