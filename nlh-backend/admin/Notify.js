/* ============================================================
   Nataly Laser House — admin new-booking alert
   Polls for unread notifications and plays a chime when the
   count goes up. No audio file needed: the tone is generated
   in the browser with the Web Audio API.
   ============================================================ */
(function () {
  var POLL_MS = 10000;                       // check every 10 seconds
  var STORAGE_KEY = 'nlh_admin_last_unread_count';
  var VOLUME = 0.9;                          // 0.0 - 1.0. Turn this down if it's too much.
  var REPEAT = 2;                            // how many times the chime plays per new booking
  var audioCtx = null;
  var originalTitle = document.title;
  var flashTimer = null;

  function getCtx() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    return audioCtx;
  }

  /* A three-note rising chime (C6 - E6 - G6): bright and clearly
     audible across a room, but a soft sine tone rather than a
     harsh buzzer — appropriate for a salon with clients present. */
  function playChimeOnce(ctx, startAt) {
    var notes = [1046.5, 1318.5, 1568.0];
    notes.forEach(function (freq, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      var t = startAt + i * 0.13;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(VOLUME, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  }

  function playChime() {
    var ctx = getCtx();
    if (!ctx) return;
    // If the browser suspended audio (tab was backgrounded), wake it first.
    if (ctx.state === 'suspended') ctx.resume();

    for (var r = 0; r < REPEAT; r++) {
      playChimeOnce(ctx, ctx.currentTime + r * 0.75);
    }
  }

  /* Visual backup: flash the browser tab title. This still works
     even if the browser refused to play audio, so a new booking
     is never missed entirely. */
  function flashTitle() {
    if (flashTimer) return;
    var on = false, ticks = 0;
    flashTimer = setInterval(function () {
      document.title = on ? originalTitle : '🔔 New booking!';
      on = !on;
      if (++ticks > 20) {
        clearInterval(flashTimer);
        flashTimer = null;
        document.title = originalTitle;
      }
    }, 700);
  }
  // Stop flashing as soon as she actually looks at the tab
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && flashTimer) {
      clearInterval(flashTimer);
      flashTimer = null;
      document.title = originalTitle;
    }
  });

  /* Browsers refuse to play sound until the user has interacted with
     the page at least once. We "unlock" audio on the first click or
     keypress so the very first real alert isn't silently swallowed. */
  function unlockAudio() {
    var ctx = getCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
  }
  document.addEventListener('click', unlockAudio);
  document.addEventListener('keydown', unlockAudio);

  // Exposed so the "Test sound" button on the notifications page can call it.
  window.nlhTestSound = playChime;

  function getLastCount() {
    var v = sessionStorage.getItem(STORAGE_KEY);
    return v === null ? null : parseInt(v, 10);
  }
  function setLastCount(n) {
    sessionStorage.setItem(STORAGE_KEY, String(n));
  }

  async function checkUnread() {
    try {
      var res = await fetch('notifications_count.php', { credentials: 'same-origin' });
      var data = await res.json();
      var newCount = data.count;
      var lastCount = getLastCount();

      if (lastCount !== null && newCount > lastCount) {
        playChime();
        flashTitle();
      }
      setLastCount(newCount);
      updateBadge(newCount);
    } catch (e) {
      // Network hiccup — just try again next interval.
    }
  }

  /* Keep the bell's number current without needing a page refresh. */
  function updateBadge(count) {
    var badge = document.querySelector('[data-unread-count]');
    if (!badge) return;
    badge.setAttribute('data-unread-count', count);
    badge.textContent = '🔔 Notifications' + (count ? ' (' + count + ')' : '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Seed from the count already rendered server-side, so opening a
    // page with existing unread notifications doesn't chime instantly.
    var badge = document.querySelector('[data-unread-count]');
    var initial = badge ? parseInt(badge.getAttribute('data-unread-count'), 10) : 0;
    if (getLastCount() === null) setLastCount(initial);
    setInterval(checkUnread, POLL_MS);
  });
})();