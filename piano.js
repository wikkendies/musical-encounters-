/* Musical Encounters — herbruikbaar pianoklavier (standaard 2 octaven, C tot C'')
   Onderste octaaf: C D E …  ·  hoogste octaaf: C' D' E' …  ·  laatste toets: C''
   Optie octaves: 1 of 2 (standaard 2)
   Gebruik:  const p = MEPiano.mount(element, { names:'both', onNote:(midi,label)=>{} });
   names: 'sharp' (C♯), 'flat' (D♭) of 'both' (C♯ en D♭)
   API: p.setNames(mode), p.play(midi, duur), p.mark([midi,...]), p.destroy()            */
(function () {
  if (window.MEPiano) return;

  const PC = [
    { w: 'C' }, { s: 'C♯', f: 'D♭' }, { w: 'D' }, { s: 'D♯', f: 'E♭' }, { w: 'E' },
    { w: 'F' }, { s: 'F♯', f: 'G♭' }, { w: 'G' }, { s: 'G♯', f: 'A♭' }, { w: 'A' },
    { s: 'A♯', f: 'B♭' }, { w: 'B' }
  ];
  const spoken = t => t.replace('♯', ' kruis').replace('♭', ' mol');
  /* octaafteken: C4–B4 geen, C5–B5 ', C6 '' */
  const oct = m => m >= 84 ? "''" : m >= 72 ? "'" : '';
  function label(m, mode) {
    const n = PC[((m % 12) + 12) % 12], o = oct(m);
    if (n.w) return n.w + o;
    return mode === 'sharp' ? n.s + o : mode === 'flat' ? n.f + o : n.s + o + ' / ' + n.f + o;
  }

  /* ---------- stijl (1x ingevoegd) ---------- */
  const CSS = `
.me-piano{container-type:inline-size;width:100%;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.me-piano .me-case{background:linear-gradient(#262c3b,#161a24);border-radius:16px;padding:12px 10px 14px;box-shadow:0 1px 2px rgba(0,0,0,.2),0 12px 28px rgba(22,32,58,.18)}
.me-piano .me-keys{position:relative;display:flex;width:100%;aspect-ratio:8/3.5;max-height:320px;touch-action:none;border-top:4px solid #8a1f2b;border-radius:2px}
.me-piano button{appearance:none;-webkit-appearance:none;margin:0;font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.me-piano .me-w{flex:1;position:relative;margin:0 1px;border:0;border-radius:0 0 8px 8px;background:linear-gradient(#fbfbf8,#eeeeea);box-shadow:inset 0 -7px 0 #d9dbe1,inset 0 0 0 1px #c6cad3;display:flex;align-items:flex-end;justify-content:center;padding:0 0 9%;color:#16203A;font-family:var(--display,system-ui);font-weight:800;font-size:clamp(15px,4.6cqw,34px);line-height:1;white-space:nowrap;transition:background .06s,box-shadow .06s}
.me-piano .me-w.on{background:linear-gradient(#dfe6ff,#c9d4ff);box-shadow:inset 0 -2px 0 #aebcf2,inset 0 0 0 1px #9fb0ee;color:#3257E0}
.me-piano .me-b{position:absolute;top:0;width:7.4%;height:61%;z-index:2;border:0;border-radius:0 0 6px 6px;background:linear-gradient(#3a4050,#12151d 85%);box-shadow:inset 0 -6px 0 #05070b,inset 1px 0 0 #4a5063,0 3px 5px rgba(0,0,0,.4);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:.35em;padding:0 0 14%;color:#fff;font-family:var(--body,system-ui);font-weight:700;font-size:clamp(9px,2.35cqw,17px);line-height:1;white-space:nowrap;transition:background .06s,box-shadow .06s}
.me-piano .me-b .me-sep{width:55%;height:1px;background:rgba(255,255,255,.35)}
.me-piano .me-b.on{background:linear-gradient(#5b7cff,#3257E0);box-shadow:inset 0 -2px 0 #1d3ab0,0 1px 2px rgba(0,0,0,.4)}
.me-piano .me-w.mark::after,.me-piano .me-b.mark::after{content:"";position:absolute;left:50%;transform:translateX(-50%);width:.55em;height:.55em;border-radius:50%;background:#B5472C}
.me-piano .me-w.mark::after{top:14%;font-size:clamp(15px,4.6cqw,34px)}
.me-piano .me-b.mark::after{top:10%;background:#FF9B7A}
.me-piano button:focus-visible{outline:3px solid #3257E0;outline-offset:-5px}
.me-piano .me-b:focus-visible{outline-color:#8198FF}
@container (max-width:520px){.me-piano .me-keys{aspect-ratio:8/5}}
.me-piano .me-keys.me-2{aspect-ratio:15/4.4;max-height:300px}
.me-piano .me-2 .me-w{margin:0 .5px;border-radius:0 0 6px 6px;font-size:clamp(11px,2.5cqw,26px)}
.me-piano .me-2 .me-w.mark::after{font-size:clamp(11px,2.5cqw,26px)}
.me-piano .me-2 .me-b{width:3.95%;font-size:clamp(8px,1.55cqw,16px);padding-bottom:12%}
.me-piano .me-2 .me-w:nth-child(n+8){background:linear-gradient(#fbfbf8,#f1ede4)}
.me-piano .me-2 .me-w.on{background:linear-gradient(#dfe6ff,#c9d4ff)}
@container (max-width:620px){.me-piano .me-keys.me-2{aspect-ratio:15/8}.me-piano .me-2 .me-b span{font-size:.9em}}
@media (prefers-reduced-motion:reduce){.me-piano *{transition:none!important}}`;
  function injectCSS() {
    if (document.getElementById('me-piano-css')) return;
    const s = document.createElement('style'); s.id = 'me-piano-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------- geluid ---------- */
  let ctx, out;
  function audio() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -10; comp.ratio.value = 4;
      out = ctx.createGain(); out.gain.value = .9; out.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  function noteOn(m) {
    const c = audio(), t = c.currentTime + .005;
    const g = c.createGain(), lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.Q.value = .7;
    lp.frequency.setValueAtTime(Math.min(9000, hz(m) * 14), t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(700, hz(m) * 3), t + 1.6);
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(.32, t + .006);
    g.gain.exponentialRampToValueAtTime(.12, t + .35);
    g.gain.setTargetAtTime(.0001, t + .35, 1.4);
    g.connect(lp).connect(out);
    const oscs = [];
    [[1, 1, 0], [1, .5, 4], [2, .42, 0], [3, .2, 0], [4, .1, 0], [5, .05, 0], [6, .03, 0]].forEach(([k, a, det]) => {
      const o = c.createOscillator(), og = c.createGain();
      o.type = 'sine'; o.frequency.value = hz(m) * k * (1 + .00035 * k * k); o.detune.value = det;
      og.gain.value = a; o.connect(og).connect(g); o.start(t); oscs.push(o);
    });
    /* korte hamertik */
    const len = Math.floor(c.sampleRate * .03), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const ns = c.createBufferSource(), nf = c.createBiquadFilter(), ng = c.createGain();
    ns.buffer = buf; nf.type = 'bandpass'; nf.frequency.value = 2500; ng.gain.value = .05;
    ns.connect(nf).connect(ng).connect(out); ns.start(t);
    const stopAll = when => oscs.forEach(o => { try { o.stop(when); } catch (e) {} });
    stopAll(t + 8);
    return {
      off() {
        const n = c.currentTime;
        g.gain.cancelScheduledValues(n);
        g.gain.setValueAtTime(Math.max(g.gain.value, .0001), n);
        g.gain.setTargetAtTime(.0001, n, .09);
        stopAll(n + .6);
      }
    };
  }

  /* computertoetsenbord: A W S E D F T G Y H U J K = C tot C */
  const KEYMAP = { KeyA: 0, KeyW: 1, KeyS: 2, KeyE: 3, KeyD: 4, KeyF: 5, KeyT: 6, KeyG: 7, KeyY: 8, KeyZ: 8, KeyH: 9, KeyU: 10, KeyJ: 11, KeyK: 12 };

  function mount(host, opt) {
    opt = Object.assign({ low: 60, octaves: 2, names: 'both', computerKeys: true, onNote: null }, opt || {});
    const nOct = opt.octaves === 1 ? 1 : 2;
    injectCSS();
    const low = opt.low, root = document.createElement('div');
    root.className = 'me-piano';
    root.innerHTML = '<div class="me-case"><div class="me-keys' + (nOct === 2 ? ' me-2' : '') + '" role="group" aria-label="Pianoklavier, ' + (nOct === 2 ? 'twee octaven' : 'één octaaf') + '"></div></div>';
    const kb = root.querySelector('.me-keys');
    const els = {};
    let mode = opt.names;

    const whites = [], blacks = [];
    for (let m = low; m <= low + 12 * nOct; m++) (PC[m % 12].w ? whites : blacks).push(m);
    whites.forEach(m => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'me-w'; b.dataset.m = m;
      b.textContent = PC[m % 12].w + oct(m); b.setAttribute('aria-label', PC[m % 12].w + (oct(m) ? ' hoog' : ''));
      kb.appendChild(b); els[m] = b;
    });
    const W = 100 / whites.length;
    blacks.forEach(m => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'me-b'; b.dataset.m = m;
      const leftWhite = whites.indexOf(m - 1);
      b.style.left = ((leftWhite + 1) * W - (nOct === 2 ? 1.975 : 3.7)) + '%';
      kb.appendChild(b); els[m] = b;
    });
    function paintNames() {
      blacks.forEach(m => {
        const n = PC[m % 12], b = els[m], o = oct(m), hi = o ? ' hoog' : '';
        b.innerHTML = mode === 'sharp' ? `<span>${n.s}${o}</span>` : mode === 'flat' ? `<span>${n.f}${o}</span>`
          : `<span>${n.s}${o}</span><i class="me-sep"></i><span>${n.f}${o}</span>`;
        b.setAttribute('aria-label', spoken(mode === 'flat' ? n.f : n.s) + hi + (mode === 'both' ? ' of ' + spoken(n.f) + hi : ''));
      });
    }
    paintNames();
    host.appendChild(root);

    /* aan/uit per bron (vinger, muis, toets) */
    const voices = new Map(), held = new Map(), count = {};
    function start(src, m) {
      stop(src);
      held.set(src, m);
      if (m == null) return;
      voices.set(src, noteOn(m));
      count[m] = (count[m] || 0) + 1; els[m].classList.add('on');
      if (opt.onNote) opt.onNote(m, label(m, mode));
    }
    function stop(src) {
      const m = held.get(src);
      const v = voices.get(src); if (v) v.off();
      voices.delete(src);
      if (m != null && --count[m] <= 0) { count[m] = 0; els[m].classList.remove('on'); }
      held.set(src, null);
    }
    const keyAt = (x, y) => { const e = document.elementFromPoint(x, y); const k = e && e.closest && e.closest('[data-m]'); return k && kb.contains(k) ? +k.dataset.m : null; };

    kb.addEventListener('pointerdown', e => {
      const k = e.target.closest('[data-m]'); if (!k) return;
      e.preventDefault();
      try { kb.setPointerCapture(e.pointerId); } catch (_) {}
      start('p' + e.pointerId, +k.dataset.m);
    });
    kb.addEventListener('pointermove', e => {
      const src = 'p' + e.pointerId; if (!held.has(src)) return;
      const m = keyAt(e.clientX, e.clientY);
      if (m !== held.get(src)) start(src, m);   /* glijden over de toetsen */
    });
    const end = e => { const src = 'p' + e.pointerId; if (held.has(src)) { stop(src); held.delete(src); } };
    kb.addEventListener('pointerup', end); kb.addEventListener('pointercancel', end); kb.addEventListener('lostpointercapture', end);
    kb.addEventListener('contextmenu', e => e.preventDefault());

    /* Enter/Spatie op een toets met focus */
    kb.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset.m && !e.repeat) { e.preventDefault(); start('f', +e.target.dataset.m); }
    });
    kb.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stop('f'); } });
    kb.addEventListener('click', e => e.preventDefault());

    const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    const kd = e => {
      if (!opt.computerKeys || e.repeat || e.ctrlKey || e.metaKey || e.altKey || typing(document.activeElement)) return;
      const off = KEYMAP[e.code]; if (off == null) return;
      e.preventDefault(); start('k' + e.code, low + off);
    };
    const ku = e => { if (held.has('k' + e.code)) { stop('k' + e.code); held.delete('k' + e.code); } };
    const blur = () => [...held.keys()].forEach(s => { stop(s); held.delete(s); });
    document.addEventListener('keydown', kd); document.addEventListener('keyup', ku); window.addEventListener('blur', blur);

    return {
      el: root,
      label: m => label(m, mode),
      setNames(mo) { mode = mo; paintNames(); },
      play(m, dur) { const v = noteOn(m); els[m] && els[m].classList.add('on'); setTimeout(() => { v.off(); if (!count[m]) els[m] && els[m].classList.remove('on'); }, (dur || .6) * 1000); },
      mark(list) { Object.values(els).forEach(b => b.classList.remove('mark')); (list || []).forEach(m => els[m] && els[m].classList.add('mark')); },
      destroy() { blur(); document.removeEventListener('keydown', kd); document.removeEventListener('keyup', ku); window.removeEventListener('blur', blur); root.remove(); }
    };
  }

  window.MEPiano = { mount, label };
})();
