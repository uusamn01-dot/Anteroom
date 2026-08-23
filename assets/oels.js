/* ============================================================
   Oels — shared behaviour
   No localStorage anywhere: theme is in-memory for the session, by design.
   Every module is a no-op if its markup is absent, so one file serves all pages.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Theme ---------- */
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });

  /* ---------- Scroll reveal ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('seen'); });
  }

  /* ---------- Navigation: dropdowns + mobile ---------- */
  var nav = $('#nav'), burger = $('#burger');

  function closeAllPanels(except) {
    $$('.nav-btn').forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      var p = document.getElementById(b.getAttribute('aria-controls'));
      if (p) p.classList.remove('open');
    });
  }
  $$('.nav-btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = b.getAttribute('aria-expanded') === 'true';
      closeAllPanels(b);
      b.setAttribute('aria-expanded', open ? 'false' : 'true');
      var p = document.getElementById(b.getAttribute('aria-controls'));
      if (p) p.classList.toggle('open', !open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-grp')) closeAllPanels(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllPanels(null);
      if (nav && burger && nav.getAttribute('data-open') === 'true' && window.innerWidth <= 1000) {
        nav.setAttribute('data-open', 'false');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    }
  });
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    // Reset state when crossing the breakpoint so the desktop bar is never hidden
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) {
        nav.setAttribute('data-open', 'true');
        burger.setAttribute('aria-expanded', 'false');
      } else if (burger.getAttribute('aria-expanded') !== 'true') {
        nav.setAttribute('data-open', 'false');
      }
    });
    nav.setAttribute('data-open', window.innerWidth > 1000 ? 'true' : 'false');
  }

  /* ---------- Ledger (home hero signature) ---------- */
  var LEDGER = {
    law: {
      title: 'Attendance note — Whitfield and Co', ref: 'Ref WC-4471 · Thu 14 Aug', rows: [
        { t: '14:02', m: 'Inbound call, number withheld', c: 'lg-act' },
        { t: '14:02', m: 'Disclosed automated at first turn', c: 'lg-act' },
        { t: '14:03', m: 'Leasehold purchase. Offer accepted 8 August.', c: '' },
        { t: '14:03', m: 'Conflict check run against 2,114 matters — no match', c: 'lg-act' },
        { t: '14:04', m: 'Routed to R. Whitfield, leasehold', c: '' },
        { t: '14:04', m: 'Booked Thursday 21 August, 11:30', c: '' },
        { t: '14:04', m: 'Written to case management', c: 'lg-act' }]
    },
    fin: {
      title: 'Attendance note — Hartley Financial', ref: 'Ref HF-2208 · Mon 11 Aug', rows: [
        { t: '19:41', m: 'Inbound call, outside office hours', c: 'lg-act' },
        { t: '19:41', m: 'Disclosed automated at first turn', c: 'lg-act' },
        { t: '19:42', m: 'Caller asked whether they could remortgage.', c: '' },
        { t: '19:42', m: 'Advice boundary held — no recommendation given', c: 'lg-flag' },
        { t: '19:43', m: 'Details captured for a qualified adviser', c: '' },
        { t: '19:43', m: 'Booked Tuesday 10:00, J. Hartley DipPFS', c: '' }]
    },
    esc: {
      title: 'Attendance note — Whitfield and Co', ref: 'Ref WC-4488 · Fri 15 Aug', rows: [
        { t: '08:14', m: 'Inbound call, mobile', c: 'lg-act' },
        { t: '08:14', m: 'Disclosed automated at first turn', c: 'lg-act' },
        { t: '08:14', m: 'Caller stated her ex-partner had come to the house overnight, children present.', c: '' },
        { t: '08:14', m: 'Safeguarding indicator detected, confidence 0.94', c: 'lg-flag' },
        { t: '08:14', m: 'Intake halted — no further questions asked', c: 'lg-flag' },
        { t: '08:15', m: 'Transferred to duty solicitor in 11 seconds', c: '' },
        { t: '08:15', m: 'Escalation logged: trigger, timestamp, destination', c: 'lg-act' }]
    }
  };
  var lgRows = $('#lgRows');
  if (lgRows) {
    var lgTitle = $('#lgTitle'), lgRef = $('#lgRef'), lgStatus = $('#lgStatus'), lgTimer = null;
    function lgMake(r) {
      var d = document.createElement('div'); d.className = 'lg-row ' + (r.c || '');
      var a = document.createElement('span'); a.className = 'tm'; a.textContent = r.t;
      var b = document.createElement('span'); b.className = 'en'; b.textContent = r.m;
      d.appendChild(a); d.appendChild(b); return d;
    }
    function lgPlay(k) {
      if (lgTimer) { clearTimeout(lgTimer); lgTimer = null; }
      var s = LEDGER[k]; if (!s) return;
      lgRows.innerHTML = ''; lgTitle.textContent = s.title; lgRef.textContent = s.ref;
      // switching away from the safeguarding record heals the margin
      window.dispatchEvent(new CustomEvent('oels:halt', { detail: { halted: false } }));
      if (reduce) {
        s.rows.forEach(function (r) { var e = lgMake(r); e.style.animation = 'none'; e.style.opacity = 1; e.style.transform = 'none'; lgRows.appendChild(e); });
        lgStatus.textContent = 'Closed · signed off by the fee earner'; return;
      }
      lgStatus.innerHTML = 'Writing<span class="caret"></span>';
      var i = 0;
      (function step() {
        if (i >= s.rows.length) { lgStatus.textContent = 'Closed · signed off by the fee earner'; return; }
        var row = s.rows[i];
        lgRows.appendChild(lgMake(row));
        i++;
        // The peak. When intake halts, the page's own margin rule breaks with it.
        if (/Intake halted/i.test(row.m)) {
          window.dispatchEvent(new CustomEvent('oels:halt', { detail: { halted: true } }));
        }
        lgTimer = setTimeout(step, 760);
      })();
    }
    $$('[data-ledger]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-ledger]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true'); lgPlay(b.getAttribute('data-ledger'));
      });
    });
    lgPlay('law');
  }

  /* ---------- Live transcript + field extraction ---------- */
  var SCEN = {
    law: {
      label: 'Conveyancing enquiry, 14:02',
      fields: { 'Matter type': 'Leasehold purchase', 'Urgency': 'Standard', 'Contact': 'Captured', 'Routed to': 'R. Whitfield' },
      lines: [
        { t: '14:02', m: '"Whitfield and Co, good afternoon. I am an automated assistant, not a solicitor."' },
        { t: '14:02', m: '"I need someone to handle a house purchase."' },
        { t: '14:03', m: '"Of course. Is it freehold or leasehold, and has your offer been accepted?"' },
        { t: '14:03', m: '"Leasehold, offer accepted last Friday."' },
        { t: '14:03', m: 'Conflict check run, no match found', c: 'ln-sys' },
        { t: '14:04', m: '"I can put you in with Rebecca Whitfield, who handles leasehold. Thursday at 11:30?"' },
        { t: '14:04', m: 'Booked, written to case management', c: 'ln-sys' }]
    },
    fin: {
      label: 'Mortgage enquiry, 19:41',
      fields: { 'Enquiry': 'Remortgage', 'Advice given': 'None — boundary held', 'Contact': 'Captured', 'Routed to': 'J. Hartley DipPFS' },
      lines: [
        { t: '19:41', m: '"Good evening. I am an automated assistant for Hartley Financial. I cannot give advice, but I can book you in with an adviser."' },
        { t: '19:41', m: '"Can I remortgage on my salary?"' },
        { t: '19:42', m: '"That is a question for a qualified adviser rather than me. I can take a few details so they can help properly."' },
        { t: '19:42', m: 'Advice boundary respected, no recommendation given', c: 'ln-sys' },
        { t: '19:43', m: 'Booked, Tuesday 10:00 with J. Hartley DipPFS', c: 'ln-sys' }]
    },
    esc: {
      label: 'Caller in distress, 08:14',
      fields: { 'Matter type': 'Not captured', 'Urgency': 'Immediate', 'Intake': 'Halted', 'Routed to': 'Duty solicitor' },
      lines: [
        { t: '08:14', m: '"Good morning. I am an automated assistant for Whitfield and Co."' },
        { t: '08:14', m: '"My ex partner turned up at the house last night and I have got the children here."' },
        { t: '08:14', m: 'Safeguarding indicator detected, confidence 0.94', c: 'ln-esc' },
        { t: '08:14', m: 'Intake halted, no further questions asked', c: 'ln-esc' },
        { t: '08:14', m: '"I am putting you through to someone right now. Please stay on the line."' },
        { t: '08:15', m: 'Transferred to duty solicitor, 11 seconds', c: 'ln-esc' },
        { t: '08:15', m: 'Escalation logged with trigger and timestamp', c: 'ln-sys' }]
    }
  };
  var feed = $('#demoFeed');
  if (feed) {
    var demoLabel = $('#demoLabel'), xtract = $('#xtract'), dTimer = null, cycle = null;
    function renderFields(f, upTo) {
      if (!xtract) return;
      xtract.innerHTML = '';
      Object.keys(f).forEach(function (k, i) {
        var row = document.createElement('div'); row.className = 'xrow';
        var kk = document.createElement('span'); kk.className = 'k'; kk.textContent = k;
        var vv = document.createElement('span');
        var got = i < upTo;
        vv.className = 'v' + (got ? '' : ' pending');
        vv.textContent = got ? f[k] : 'listening…';
        row.appendChild(kk); row.appendChild(vv); xtract.appendChild(row);
      });
    }
    function demoPlay(k) {
      if (dTimer) { clearTimeout(dTimer); dTimer = null; }
      var s = SCEN[k]; if (!s) return;
      feed.innerHTML = ''; if (demoLabel) demoLabel.textContent = s.label;
      var keys = Object.keys(s.fields), n = s.lines.length;
      renderFields(s.fields, reduce ? keys.length : 0);
      if (reduce) {
        s.lines.forEach(function (l) {
          var d = document.createElement('div'); d.className = 'ln ' + (l.c || '');
          d.style.animation = 'none'; d.style.opacity = 1; d.style.transform = 'none';
          d.innerHTML = '<span class="t"></span><span class="m"></span>';
          d.querySelector('.t').textContent = l.t; d.querySelector('.m').textContent = l.m;
          feed.appendChild(d);
        });
        return;
      }
      var i = 0;
      (function step() {
        if (i >= n) return;
        var l = s.lines[i];
        var d = document.createElement('div'); d.className = 'ln ' + (l.c || '');
        d.innerHTML = '<span class="t"></span><span class="m"></span>';
        d.querySelector('.t').textContent = l.t; d.querySelector('.m').textContent = l.m;
        feed.appendChild(d);
        i++;
        renderFields(s.fields, Math.round(keys.length * (i / n)));
        dTimer = setTimeout(step, 880);
      })();
    }
    $$('[data-scen]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-scen]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true'); demoPlay(b.getAttribute('data-scen'));
      });
    });
    demoPlay('law');
    if (!reduce) {
      cycle = setInterval(function () {
        var a = $('[data-scen][aria-selected="true"]');
        if (a && !document.hidden) demoPlay(a.getAttribute('data-scen'));
      }, 14000);
    }
  }

  /* ---------- Console controls ---------- */
  $$('.sw').forEach(function (s) {
    if (s.hasAttribute('data-annual')) return;
    s.addEventListener('click', function () {
      s.setAttribute('aria-checked', s.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  });
  var conf = $('#conf');
  if (conf) conf.addEventListener('input', function () { $('#cval').textContent = conf.value + '%'; });
  var killBtn = $('#killBtn');
  if (killBtn) {
    killBtn.addEventListener('click', function () {
      var on = killBtn.getAttribute('aria-pressed') === 'true';
      killBtn.setAttribute('aria-pressed', String(!on));
      killBtn.classList.toggle('on', !on);
      var c = $('#console'); if (c) c.classList.toggle('armed', !on);
      killBtn.textContent = !on ? 'Stand down' : 'Arm kill switch';
      var kt = $('#killTxt'), ct = $('#consoleTag');
      if (kt) kt.textContent = !on ? 'Armed. Every call is routing directly to your staff.' : 'One press and every call routes to a human. No notice period, no ticket.';
      if (ct) ct.textContent = !on ? 'Suspended, all calls to humans' : 'Live, approved 14 Aug by R. Whitfield';
    });
  }

  /* ---------- Pricing annual toggle ---------- */
  var annual = $('[data-annual]');
  if (annual) {
    annual.addEventListener('click', function () {
      var on = annual.getAttribute('aria-checked') === 'true';
      annual.setAttribute('aria-checked', String(!on));
      $$('.pr').forEach(function (p) {
        var pre = p.getAttribute('data-prefix') || '£';
        p.textContent = pre + (!on ? p.getAttribute('data-a') : p.getAttribute('data-m'));
      });
      $$('.per-note').forEach(function (el) { el.textContent = !on ? ', billed annually' : ''; });
    });
  }

  /* ---------- Workflow canvas ---------- */
  var flow = $('#flow');
  if (flow) {
    var FLOWS = {
      onboard: {
        name: 'Client onboarding',
        nodes: [
          { t: 'Matter accepted', s: 'Trigger', d: 'Fires the moment a fee earner marks an enquiry as accepted. Nothing runs on unaccepted enquiries.', sys: ['Case management'] },
          { t: 'Engagement letter', s: 'Generate + send', d: 'Populates your own template with the client and matter details, then sends it for signature.', sys: ['Template store', 'E-signature'] },
          { t: 'ID verification', s: 'Request + chase', d: 'Requests ID, then chases on a schedule you set until it is returned. Stops chasing the moment it lands.', sys: ['ID provider', 'Email'] },
          { t: 'Matter opened', s: 'Write records', d: 'Creates the matter, the file and the ledger entry in every system that needs one, from a single form.', sys: ['Case management', 'Accounts'] },
          { t: 'Team notified', s: 'Result', d: 'The fee earner gets one message confirming the matter is open and what is still outstanding.', sys: ['Email', 'Teams or Slack'] }
        ],
        result: 'Matter WC-4471 opened. Engagement letter signed, ID verified, 0 items outstanding. Elapsed: 2 days 4 hours, against a 9-day average by hand.'
      },
      chase: {
        name: 'Document chasing',
        nodes: [
          { t: 'Outstanding list', s: 'Trigger', d: 'Reads what each open matter is still waiting on, every morning.', sys: ['Case management'] },
          { t: 'Decide who to chase', s: 'Rules', d: 'Applies your escalation ladder: a polite nudge at day 3, a firmer one at day 7, a fee earner alert at day 14.', sys: ['Rules engine'] },
          { t: 'Send the chase', s: 'Email or SMS', d: 'Sends in the firm\'s own wording, from the firm\'s own address. Never a generic template.', sys: ['Email', 'SMS'] },
          { t: 'Record it', s: 'Write back', d: 'Logs the chase against the matter so the file shows exactly who was asked what, and when.', sys: ['Case management'] },
          { t: 'Weekly summary', s: 'Result', d: 'One digest showing what came back, what did not, and what needs a human.', sys: ['Email'] }
        ],
        result: '38 matters checked. 12 chases sent, 7 documents returned, 2 escalated to the fee earner. Nobody rebuilt this list by hand.'
      },
      conflict: {
        name: 'Conflict check',
        nodes: [
          { t: 'New enquiry', s: 'Trigger', d: 'Runs before anyone spends time on the enquiry, including on calls answered by Anteroom.', sys: ['Anteroom', 'Web form'] },
          { t: 'Normalise names', s: 'Prepare', d: 'Handles spelling variants, former names and company numbers, because exact-match alone misses real conflicts.', sys: ['Rules engine'] },
          { t: 'Search all matters', s: 'Hybrid search', d: 'Keyword and semantic search across current and closed matters and the parties in them.', sys: ['Case management', 'Archive'] },
          { t: 'Score and flag', s: 'Decide', d: 'Clear matches block. Borderline matches go to a human rather than being guessed at.', sys: ['Rules engine'] },
          { t: 'Logged outcome', s: 'Result', d: 'Every check writes a record, whether it found something or not. That record is the audit artifact.', sys: ['Audit log'] }
        ],
        result: 'Checked against 2,114 matters. No conflict found. Result written to the audit log with timestamp and search terms used.'
      }
    };
    var flowName = $('#flowName'), nodeDetail = $('#nodeDetail'), runRes = $('#runRes'), runBtn = $('#runBtn');
    var current = 'onboard', runTimer = [];

    function drawFlow(key) {
      runTimer.forEach(clearTimeout); runTimer = [];
      current = key;
      var f = FLOWS[key];
      flow.innerHTML = '';
      if (flowName) flowName.textContent = f.name;
      if (runRes) { runRes.classList.remove('show'); }
      if (nodeDetail) nodeDetail.innerHTML = '<span class="k">Select a step</span><p>Click any step above to see what it does and which of your systems it touches.</p>';
      f.nodes.forEach(function (n, i) {
        if (i) { var w = document.createElement('div'); w.className = 'wire'; flow.appendChild(w); }
        var b = document.createElement('button');
        b.className = 'node'; b.type = 'button'; b.setAttribute('aria-expanded', 'false');
        b.innerHTML = '<span class="nn"></span><span class="nt"></span><span class="ns"></span>';
        b.querySelector('.nn').textContent = 'Step ' + (i + 1);
        b.querySelector('.nt').textContent = n.t;
        b.querySelector('.ns').textContent = n.s;
        b.addEventListener('click', function () {
          $$('.node', flow).forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
          b.setAttribute('aria-expanded', 'true');
          if (!nodeDetail) return;
          nodeDetail.innerHTML = '<span class="k"></span><p></p><div class="sys"></div>';
          nodeDetail.querySelector('.k').textContent = 'Step ' + (i + 1) + ' · ' + n.t;
          nodeDetail.querySelector('p').textContent = n.d;
          var sys = nodeDetail.querySelector('.sys');
          n.sys.forEach(function (s) { var t = document.createElement('span'); t.className = 'tag'; t.textContent = s; sys.appendChild(t); });
        });
        flow.appendChild(b);
      });
    }
    function runFlow() {
      runTimer.forEach(clearTimeout); runTimer = [];
      var nodes = $$('.node', flow), wires = $$('.wire', flow), f = FLOWS[current];
      nodes.forEach(function (n) { n.classList.remove('lit'); });
      wires.forEach(function (w) { w.classList.remove('lit'); });
      if (runRes) runRes.classList.remove('show');
      if (reduce) {
        nodes.forEach(function (n) { n.classList.add('lit'); });
        wires.forEach(function (w) { w.classList.add('lit'); });
        if (runRes) { runRes.innerHTML = '<strong>Complete.</strong> ' + f.result; runRes.classList.add('show'); }
        return;
      }
      nodes.forEach(function (n, i) {
        runTimer.push(setTimeout(function () {
          n.classList.add('lit');
          if (wires[i - 1]) wires[i - 1].classList.add('lit');
          if (i === nodes.length - 1 && runRes) {
            runTimer.push(setTimeout(function () {
              runRes.innerHTML = '<strong>Complete.</strong> ' + f.result;
              runRes.classList.add('show');
            }, 420));
          }
        }, 520 * i));
      });
    }
    $$('[data-flow]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-flow]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true'); drawFlow(b.getAttribute('data-flow'));
      });
    });
    if (runBtn) runBtn.addEventListener('click', runFlow);
    drawFlow('onboard');
  }

  /* ---------- Corpus search (custom bots) ---------- */
  var answerEl = $('#answer');
  if (answerEl) {
    var QA = {
      q1: {
        q: 'What is our standard notice period for a commercial lease assignment?',
        a: 'Your precedent bank uses 21 days’ written notice to the landlord for an assignment, extended to 28 days where the lease is registered at HM Land Registry.',
        src: 'Precedents / Commercial Property / Lease Assignment v4.2 — clause 8.3',
        naive: 'Notice periods for lease assignments are typically between 14 and 30 days, depending on the terms of the lease and local practice.'
      },
      q2: {
        q: 'Which fee earner has handled the most leasehold enfranchisement matters?',
        a: 'R. Whitfield, with 34 enfranchisement matters closed in the last 24 months. The next highest is D. Okonjo with 11.',
        src: 'Matter archive / closed matters 2024–2026 — filtered on practice area',
        naive: 'I do not have access to your firm’s matter records, so I cannot say which fee earner has handled the most of a given matter type.'
      },
      q3: {
        q: 'Do we have a template for a deed of variation?',
        a: 'Yes — two. A short-form deed for rent variations only, and a long-form deed covering term, rent and repair obligations. The long-form was last reviewed in March 2026.',
        src: 'Precedents / Commercial Property / Deed of Variation (short) v2.1 and (long) v3.0',
        naive: 'Most firms keep a deed of variation template. You would need to check your own document management system to confirm.'
      }
    };
    var citedMode = true;
    function renderAnswer(key) {
      var item = QA[key]; if (!item) return;
      var stream = answerEl.querySelector('.astream');
      var citeBox = answerEl.querySelector('#citeBox');
      var text = citedMode ? item.a : item.naive;
      stream.textContent = '';
      citeBox.innerHTML = '';
      function finish() {
        if (citedMode) {
          citeBox.className = 'cite';
          citeBox.innerHTML = '<b>Source</b>';
          var s = document.createElement('span'); s.textContent = item.src; citeBox.appendChild(s);
        } else {
          citeBox.className = 'cite nocite';
          citeBox.innerHTML = '<b>No source</b>';
          var s2 = document.createElement('span');
          s2.textContent = 'Answered from general knowledge, not from your documents. Nothing here can be checked, and nobody should rely on it.';
          citeBox.appendChild(s2);
        }
      }
      if (reduce) { stream.textContent = text; finish(); return; }
      var i = 0;
      (function type() {
        if (i >= text.length) { finish(); return; }
        stream.textContent += text.charAt(i); i++;
        setTimeout(type, 12);
      })();
    }
    $$('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-q]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        answerEl.setAttribute('data-current', b.getAttribute('data-q'));
        renderAnswer(b.getAttribute('data-q'));
      });
    });
    var citeToggle = $('#citeToggle');
    if (citeToggle) {
      citeToggle.addEventListener('click', function () {
        citedMode = citeToggle.getAttribute('aria-checked') !== 'true';
        citeToggle.setAttribute('aria-checked', String(citedMode));
        var cur = answerEl.getAttribute('data-current');
        if (cur) renderAnswer(cur);
      });
      citeToggle.setAttribute('aria-checked', 'true');
    }
    var firstQ = $('[data-q]');
    if (firstQ) { firstQ.setAttribute('aria-pressed', 'true'); answerEl.setAttribute('data-current', firstQ.getAttribute('data-q')); renderAnswer(firstQ.getAttribute('data-q')); }
  }

  /* ---------- Architecture toggle (self-hosted) ---------- */
  var archToggle = $('#archToggle');
  if (archToggle) {
    var COMPONENTS = [
      { n: 'Document store', s: 'Your files and precedents', selfHost: true, always: true },
      { n: 'Vector index', s: 'Qdrant, searchable', selfHost: true, always: true },
      { n: 'Automations', s: 'n8n workflows', selfHost: true, always: true },
      { n: 'Web chat', s: 'Widget plus backend', selfHost: true, always: false },
      { n: 'Language model', s: 'Reasoning and drafting', selfHost: true, always: false },
      { n: 'Voice pipeline', s: 'Speech in, speech out', selfHost: false, always: false }
    ];
    var inside = $('#inside'), outside = $('#outside'), perimLbl = $('#perimLbl'), archNote = $('#archNote');
    function drawArch(mode) {
      var selfHosted = mode === 'self';
      inside.innerHTML = ''; outside.innerHTML = '';
      COMPONENTS.forEach(function (c) {
        var el = document.createElement('div');
        var isIn = selfHosted ? c.selfHost : c.always;
        el.className = 'comp' + (isIn ? '' : ' comp-out');
        el.innerHTML = '<strong></strong><span></span>';
        el.querySelector('strong').textContent = c.n;
        el.querySelector('span').textContent = isIn ? c.s : c.s + ' — DPA, UK/EEA, zero retention';
        (isIn ? inside : outside).appendChild(el);
      });
      perimLbl.textContent = selfHosted ? 'Inside your network' : 'Our infrastructure, UK region';
      archNote.textContent = selfHosted
        ? 'Everything except the voice pipeline runs on your hardware. Local text-to-speech that does not sound synthetic, inside the latency budget, is still a genuine engineering problem — so we say so rather than implying the whole stack is air-gapped. The voice layer runs under a signed DPA with UK or EEA residency and zero retention.'
        : 'We host and run everything in a UK region, under a signed DPA with zero retention. Your data does not train anyone’s model. This is the faster route to live, and you can move to self-hosting later without rebuilding.';
    }
    $$('[data-arch]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-arch]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true'); drawArch(b.getAttribute('data-arch'));
      });
    });
    drawArch('cloud');
  }

  /* ---------- Practice-area configurator (sector pages) ---------- */
  var cfgOut = $('#cfgOut');
  if (cfgOut) {
    var CFG = window.OELS_CONFIG || {};
    function drawCfg(key) {
      var c = CFG[key]; if (!c) return;
      cfgOut.innerHTML = '';
      var h = document.createElement('div'); h.className = 'xrow';
      h.innerHTML = '<span class="k">Routes to</span><span class="v"></span>';
      h.querySelector('.v').textContent = c.route;
      cfgOut.appendChild(h);
      c.questions.forEach(function (q, i) {
        var r = document.createElement('div'); r.className = 'xrow';
        r.innerHTML = '<span class="k"></span><span class="v"></span>';
        r.querySelector('.k').textContent = 'Question ' + (i + 1);
        r.querySelector('.v').textContent = q;
        cfgOut.appendChild(r);
      });
      var e = document.createElement('div'); e.className = 'xrow';
      e.innerHTML = '<span class="k">Escalates on</span><span class="v"></span>';
      e.querySelector('.v').textContent = c.escalate;
      cfgOut.appendChild(e);
    }
    $$('[data-cfg]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-cfg]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true'); drawCfg(b.getAttribute('data-cfg'));
      });
    });
    var firstCfg = $('[data-cfg]');
    if (firstCfg) drawCfg(firstCfg.getAttribute('data-cfg'));
  }

  /* ---------- Booking ---------- */
  var calGrid = $('#calGrid');
  if (calGrid) {
    var MN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var view = new Date(today.getFullYear(), today.getMonth(), 1), picked = null, pickedSlot = null;
    var calMonth = $('#calMonth'), slotsEl = $('#slots'), slotHint = $('#slotHint');
    var det = $('#detailsWrap'), sum = $('#bkSummary'), prevM = $('#prevM'), nextM = $('#nextM');
    function fmt(d) { return d.getDate() + ' ' + MN[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); }
    function drawCal() {
      calMonth.textContent = MN[view.getMonth()] + ' ' + view.getFullYear();
      calGrid.innerHTML = '';
      ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].forEach(function (d) {
        var h = document.createElement('div'); h.className = 'dow'; h.textContent = d; calGrid.appendChild(h);
      });
      var off = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7;
      for (var i = 0; i < off; i++) calGrid.appendChild(document.createElement('div'));
      var dim = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      var lim = new Date(today); lim.setDate(lim.getDate() + 60);
      for (var d = 1; d <= dim; d++) {
        var dt = new Date(view.getFullYear(), view.getMonth(), d);
        var b = document.createElement('button');
        b.className = 'day'; b.type = 'button'; b.textContent = d;
        if (dt <= today || dt.getDay() === 0 || dt.getDay() === 6 || dt > lim) b.disabled = true;
        else b.setAttribute('aria-label', fmt(dt));
        if (picked && dt.getTime() === picked.getTime()) { b.classList.add('sel'); b.setAttribute('aria-pressed', 'true'); }
        (function (x, btn) {
          btn.addEventListener('click', function () { picked = x; pickedSlot = null; drawCal(); drawSlots(); });
        })(dt, b);
        calGrid.appendChild(b);
      }
      prevM.disabled = new Date(view.getFullYear(), view.getMonth() - 1, 1) < new Date(today.getFullYear(), today.getMonth(), 1);
    }
    function drawSlots() {
      slotsEl.innerHTML = ''; det.style.display = 'none';
      if (!picked) { slotHint.textContent = 'Pick a date to see what is free.'; return; }
      slotHint.textContent = fmt(picked);
      ['09:30', '10:30', '11:30', '13:30', '14:30', '16:00'].forEach(function (t) {
        var b = document.createElement('button');
        b.className = 'slot'; b.type = 'button'; b.textContent = t;
        b.addEventListener('click', function () {
          pickedSlot = t;
          $$('.slot', slotsEl).forEach(function (x) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
          b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
          sum.textContent = fmt(picked) + ' at ' + t + ', 30 minutes';
          det.style.display = 'block';
        });
        slotsEl.appendChild(b);
      });
    }
    prevM.addEventListener('click', function () { view.setMonth(view.getMonth() - 1); drawCal(); });
    nextM.addEventListener('click', function () { view.setMonth(view.getMonth() + 1); drawCal(); });
    var bkConfirm = $('#bkConfirm');
    if (bkConfirm) {
      bkConfirm.addEventListener('click', function () {
        var n = $('#bName').value.trim(), e = $('#bEmail').value.trim(), err = $('#bkErr');
        var okEmail = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(e);
        if (!n || !okEmail) {
          err.textContent = !n ? 'We need a name to put on the invite.' : 'That email address does not look right.';
          err.classList.add('show');
          (!n ? $('#bName') : $('#bEmail')).focus();
          return;
        }
        err.classList.remove('show');
        $('#calCard').style.display = 'none';
        $('#slotWrap').style.display = 'none';
        det.style.display = 'none';
        $('#doneTxt').textContent = fmt(picked) + ' at ' + pickedSlot + '. A confirmation is on its way.';
        $('#bkDone').style.display = 'block';
        $('#bkDone').focus();
      });
    }
    drawCal();
  }

  /* ---------- Chat widget ---------- */
  var chatBtn = $('#chatBtn'), chatWin = $('#chatWin');
  if (chatBtn && chatWin) {
    var chatBody = $('#chatBody'), chatOpts = $('#chatOpts'), started = false;
    function say(t, who) {
      var d = document.createElement('div'); d.className = 'msg msg-' + who; d.textContent = t;
      chatBody.appendChild(d); chatBody.scrollTop = chatBody.scrollHeight;
    }
    function opts(list) {
      chatOpts.innerHTML = '';
      list.forEach(function (o) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = o.q;
        b.addEventListener('click', function () {
          say(o.q, 'you'); chatOpts.innerHTML = '';
          setTimeout(function () { say(o.a, 'bot'); if (o.next) opts(o.next); }, 480);
        });
        chatOpts.appendChild(b);
      });
    }
    var back = [{ q: 'Something else', a: 'Happy to help. Quickest route is a short call, or email enquiries@oels.dev and a person replies.' }];
    var main = [
      { q: 'What do you actually build?', a: 'Four things: AI receptionists, workflow automation, custom and machine learning bots trained on your own data, and self-hosted versions of all of it. The receptionist is called Anteroom.', next: back },
      { q: 'Can it run on our own servers?', a: 'Yes. Self-hosting is available on everything we build. The one honest caveat is the voice layer, which runs under a signed DPA with UK or EEA residency rather than fully on your hardware.', next: back },
      { q: 'What does it cost?', a: 'Reception plans are £249, £449 and from £849 a month, with a £495 setup waived for founding clients. Automations and custom bots are quoted separately.', next: back },
      { q: 'I would like a demo', a: 'Good. Scroll to the booking section and pick a time. Thirty minutes, built around a scenario from your own practice.' }
    ];
    function openChat() {
      chatWin.classList.add('open');
      chatBtn.setAttribute('aria-expanded', 'true');
      if (!started) {
        started = true;
        say('Good afternoon. I am an automated assistant, not a person. What would be most useful?', 'bot');
        opts(main);
      }
    }
    function closeChat() { chatWin.classList.remove('open'); chatBtn.setAttribute('aria-expanded', 'false'); }
    chatBtn.addEventListener('click', function () {
      chatWin.classList.contains('open') ? closeChat() : openChat();
    });
    $$('[data-open-chat]').forEach(function (b) { b.addEventListener('click', openChat); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && chatWin.classList.contains('open')) { closeChat(); chatBtn.focus(); } });
  }

  /* ---------- The rubric margin (signature element) ----------
     Builds itself from whatever sections the page has, so it works on all
     thirteen without per-page markup. One passive scroll listener writing a
     single custom property, coalesced through rAF: no layout reads per frame. */
  var margin = $('#margin');
  // Built under reduced motion too: the marks are navigation, and removing
  // navigation is not "reducing motion". Only the easing is dropped, in CSS.
  if (margin) {
    var marksEl = $('#marginMarks', margin);
    var progEl = $('.margin-prog', margin);
    var breakEl = $('.margin-break', margin);

    // A long prose document (privacy, terms, DPA) is one section with many
    // headings, so its chapters are the headings themselves. Everywhere else a
    // chapter is a section. Ids are minted where the markup has none.
    var prose = $('.prose');
    var chapters = prose
      ? $$('h2', prose)
      : $$('main section').filter(function (s) { return s.querySelector('h2'); });
    chapters.forEach(function (s, i) {
      if (!s.id) s.id = 'ch-' + (i + 1);
    });

    var marks = chapters.map(function (s) {
      var h = s.matches('h2') ? s : s.querySelector('h1,h2');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'margin-mark';
      b.setAttribute('data-passed', 'false');
      var label = (h.textContent || '').trim().replace(/[.]$/, '');
      if (label.length > 26) label = label.slice(0, 24).replace(/\s+\S*$/, '') + '…';
      b.innerHTML = '<span></span>';
      b.querySelector('span').textContent = label;
      b.setAttribute('aria-label', 'Go to: ' + label);
      b.addEventListener('click', function () {
        s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
      marksEl.appendChild(b);
      return { el: b, sec: s, top: 0 };
    });

    var docH = 1, winH = 1, ticking = false;

    function measure() {
      winH = window.innerHeight;
      docH = Math.max(document.documentElement.scrollHeight - winH, 1);
      var full = document.documentElement.scrollHeight;
      marks.forEach(function (m) {
        m.top = m.sec.getBoundingClientRect().top + window.scrollY;
        m.el.style.top = ((m.top / full) * 100) + '%';
      });
      // The break sits where the peak lives: the safeguarding record.
      var peak = $('#lgRows') ? $('.ledger') : null;
      if (peak && breakEl) {
        var t = (peak.getBoundingClientRect().top + window.scrollY + peak.offsetHeight * 0.55) / full;
        breakEl.style.top = (t * 100) + '%';
        margin.style.setProperty('--mb-top', (t * 100) + '%');
        margin.style.setProperty('--mb-bot', (t * 100 + 1.6) + '%');
      }
    }

    function paint() {
      ticking = false;
      var y = window.scrollY;
      margin.style.setProperty('--mp', Math.min(y / docH, 1).toFixed(4));
      for (var i = 0; i < marks.length; i++) {
        var passed = y + winH * 0.5 >= marks[i].top;
        var cur = marks[i].el.getAttribute('data-passed') === 'true';
        if (passed !== cur) marks[i].el.setAttribute('data-passed', String(passed));
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); paint(); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); paint(); });
    measure(); paint();

    // The rule breaks when the record halts. Same event the ledger fires.
    window.addEventListener('oels:halt', function (e) {
      margin.classList.toggle('is-broken', !!(e.detail && e.detail.halted));
    });
  }

  /* ---------- Mark current page in nav ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-lnk, .nav-item').forEach(function (a) {
    var h = (a.getAttribute('href') || '').split('#')[0];
    if (h && h === here) a.setAttribute('aria-current', 'page');
  });
})();
