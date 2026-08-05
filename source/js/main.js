/* theblakeharrison.com — progressive enhancement only.
   Every byte of content renders without this file. */
(function () {
  'use strict';

  /** @type {HTMLElement | null} */
  var header = document.querySelector('.site-header');
  /** @type {HTMLElement | null} */
  var nav = document.getElementById('primary-nav');
  /** @type {HTMLButtonElement | null} */
  var toggle = document.querySelector('.nav-toggle');
  var year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  /* --- Mobile drawer --- */
  if (toggle && nav) {
    var drawer = nav;
    var button = toggle;

    /** @param {boolean} open */
    var setMenu = function (open) {
      drawer.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    button.addEventListener('click', function () {
      setMenu(button.getAttribute('aria-expanded') !== 'true');
    });

    drawer.addEventListener('click', function (e) {
      var target = e.target;
      if (target instanceof Element && target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        button.focus();
      }
    });
  }

  /* --- Header hairline on scroll --- */
  if (header) {
    var bar = header;
    var onScroll = function () {
      bar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Active nav link.
     Picks exactly one section — the last whose top has passed the marker
     line. The previous IntersectionObserver could light up two links at
     once whenever both straddled its rootMargin band. --- */
  var anchors = nav
    ? /** @type {HTMLAnchorElement[]} */ (
        Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'))
      )
    : [];

  /** @type {{ link: HTMLAnchorElement, section: HTMLElement }[]} */
  var targets = [];
  anchors.forEach(function (link) {
    var href = link.getAttribute('href');
    var section = href ? document.querySelector(href) : null;
    if (section instanceof HTMLElement) targets.push({ link: link, section: section });
  });

  if (targets.length) {
    var syncActive = function () {
      var marker = window.scrollY + window.innerHeight * 0.3;
      /** @type {{ link: HTMLAnchorElement, section: HTMLElement } | null} */
      var current = null;

      for (var i = 0; i < targets.length; i++) {
        if (targets[i].section.offsetTop <= marker) current = targets[i];
      }
      // once the page bottom is reached the final section always wins
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = targets[targets.length - 1];
      }

      for (var j = 0; j < targets.length; j++) {
        targets[j].link.classList.toggle('is-active', targets[j] === current);
      }
    };

    window.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive, { passive: true });
    syncActive();
  }
  /* --- Copy to clipboard -------------------------------------------------
     The mailto:/tel: links still work; these are an extra affordance for a
     recruiter who wants the address in their own compose window. Buttons
     ship hidden and are revealed only when the API is actually available. */
  var copyStatus = document.getElementById('copy-status');
  var copyButtons = Array.prototype.slice.call(document.querySelectorAll('.cc-copy'));

  if (copyButtons.length && navigator.clipboard && window.isSecureContext) {
    copyButtons.forEach(function (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-copy') || '';
        navigator.clipboard.writeText(value).then(
          function () {
            btn.classList.add('is-copied');
            btn.textContent = 'Copied';
            if (copyStatus) copyStatus.textContent = value + ' copied to clipboard';
            window.setTimeout(function () {
              btn.classList.remove('is-copied');
              btn.textContent = 'Copy';
            }, 1800);
          },
          function () {
            if (copyStatus) copyStatus.textContent = 'Copy failed — select the text instead';
          },
        );
      });
    });
  }

  /* --- Back to top -------------------------------------------------------
     Appears once the hero is well out of view. The footer link stays as the
     no-JS path. */
  var toTop = /** @type {HTMLButtonElement | null} */ (document.querySelector('.to-top'));
  if (toTop) {
    var topBtn = toTop;
    topBtn.hidden = false;
    var syncToTop = function () {
      topBtn.classList.toggle('is-shown', window.scrollY > window.innerHeight * 1.2);
    };
    topBtn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var main = document.getElementById('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    });
    window.addEventListener('scroll', syncToTop, { passive: true });
    syncToTop();
  }
})();
