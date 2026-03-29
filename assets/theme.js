/**
 * Shopify Custom Sections — Theme JavaScript
 * Handles: animations, countdown timers, tag filtering,
 * quick-add to cart, testimonial slider, announcement bar
 */

(function () {
  'use strict';

  /* ─── Intersection Observer Animations ─── */
  const animateEls = document.querySelectorAll('[data-animate]');
  if (animateEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    animateEls.forEach((el) => io.observe(el));
  }

  /* ─── Countdown Timer ─── */
  document.querySelectorAll('[data-countdown]').forEach((el) => {
    const target = new Date(el.dataset.countdown).getTime();
    if (isNaN(target)) return;

    const days    = el.querySelector('[data-days]');
    const hours   = el.querySelector('[data-hours]');
    const minutes = el.querySelector('[data-minutes]');
    const seconds = el.querySelector('[data-seconds]');

    const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, '0');

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        el.textContent = 'Sale ended';
        return;
      }
      if (days)    days.textContent    = pad(diff / 86400000);
      if (hours)   hours.textContent   = pad((diff % 86400000) / 3600000);
      if (minutes) minutes.textContent = pad((diff % 3600000) / 60000);
      if (seconds) seconds.textContent = pad((diff % 60000) / 1000);
    };
    tick();
    setInterval(tick, 1000);
  });

  /* ─── Tag Filtering ─── */
  document.querySelectorAll('.featured-collection__filters').forEach((filterBar) => {
    const section = filterBar.closest('[data-section-id]');
    if (!section) return;

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach((b) => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      const cards  = section.querySelectorAll('.product-card-wrapper');

      cards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const show = filter === '*' || tags.split(' ').includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ─── Quick Add to Cart ─── */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.quick-add-btn[data-product-id]');
    if (!btn) return;

    const variantId = btn.dataset.productId;
    btn.disabled = true;
    btn.textContent = 'Adding...';

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ id: variantId, quantity: 1 }),
      });

      if (!res.ok) throw new Error('Add to cart failed');

      btn.textContent = 'Added!';
      btn.style.background = '#10b981';

      // Refresh cart count if element exists
      const cartCount = document.querySelector('[data-cart-count]');
      if (cartCount) {
        const cartRes = await fetch('/cart.js');
        const cart    = await cartRes.json();
        cartCount.textContent = cart.item_count;
      }

      setTimeout(() => {
        btn.textContent = btn.dataset.defaultLabel || 'Add to Cart';
        btn.style.background = '';
        btn.disabled = false;
      }, 2000);
    } catch {
      btn.textContent = 'Error';
      setTimeout(() => {
        btn.textContent = btn.dataset.defaultLabel || 'Add to Cart';
        btn.disabled = false;
      }, 1500);
    }
  });

  /* ─── Testimonials Slider ─── */
  document.querySelectorAll('.testimonials__slider').forEach((slider) => {
    const track    = slider.querySelector('.testimonials__track');
    if (!track) return;

    const cards    = Array.from(track.querySelectorAll('.testimonial-card'));
    const dots     = Array.from(slider.querySelectorAll('.testimonial-dot'));
    const prevBtn  = slider.querySelector('[data-prev]');
    const nextBtn  = slider.querySelector('[data-next]');
    const perView  = parseInt(slider.dataset.perView || '3', 10);
    const autoplay = slider.dataset.autoplay === 'true';
    const speed    = parseInt(slider.dataset.speed || '5000', 10);

    let current = 0;
    const total = Math.ceil(cards.length / perView);

    const go = (idx) => {
      current = ((idx % total) + total) % total;
      const offset = current * perView;
      cards.forEach((card, i) => {
        card.style.display = (i >= offset && i < offset + perView) ? '' : 'none';
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('testimonial-dot--active', i === current);
        dot.setAttribute('aria-selected', i === current);
      });
    };

    // Init — show only perView cards at a time
    if (cards.length > perView) {
      go(0);
      prevBtn?.addEventListener('click', () => go(current - 1));
      nextBtn?.addEventListener('click', () => go(current + 1));
      dots.forEach((dot) => dot.addEventListener('click', () => go(parseInt(dot.dataset.index, 10))));

      if (autoplay) {
        let timer = setInterval(() => go(current + 1), speed);
        slider.addEventListener('mouseenter', () => clearInterval(timer));
        slider.addEventListener('mouseleave', () => { timer = setInterval(() => go(current + 1), speed); });
      }
    }
  });

  /* ─── Announcement Bar Slider ─── */
  document.querySelectorAll('.announcement-bar__slider').forEach((slider) => {
    const slides  = Array.from(slider.querySelectorAll('.announcement-bar__slide'));
    if (slides.length <= 1) return;

    const autoplay = slider.dataset.autoplay !== 'false';
    const speed    = parseInt(slider.dataset.speed || '4000', 10);
    let current    = 0;
    const bar      = slider.closest('.announcement-bar');

    const go = (idx) => {
      slides[current].style.display = 'none';
      current = ((idx % slides.length) + slides.length) % slides.length;
      slides[current].style.display = '';
    };

    slides.forEach((s, i) => { if (i > 0) s.style.display = 'none'; });

    bar?.querySelector('.announcement-bar__prev')?.addEventListener('click', () => go(current - 1));
    bar?.querySelector('.announcement-bar__next')?.addEventListener('click', () => go(current + 1));

    if (autoplay) setInterval(() => go(current + 1), speed);
  });

  /* ─── Video Modal (hero play button) ─── */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-video]');
    if (!btn) return;

    const url = btn.dataset.video;
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <button style="position:absolute;top:20px;right:20px;background:none;border:none;color:white;font-size:2rem;cursor:pointer;" aria-label="Close">&times;</button>
      <video src="${url}" controls autoplay style="max-width:90%;max-height:80vh;border-radius:8px;"></video>
    `;
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  });

})();
