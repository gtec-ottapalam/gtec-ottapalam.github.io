// ==========================================================================
// G-TEC NEW-SITE — MOTION & SCROLL ENGINE (REFINED ARCHITECTURE)
// Coordinated Hero Entrance Timeline, Multi-Phase Scroll-Linked Transformation,
// Dynamic Header Theme Shifter, 3D Parallax Tilt, & Accessibility Guardrails
// ==========================================================================

export function initMotionEngine() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Run Choreographed 6-Step Hero Entrance Timeline
  runHeroIntroSequence(prefersReduced);

  // 2. Initialize Coherent Scroll-Linked Transformation into Section A
  if (!prefersReduced) {
    initHeroScrollTransition();
    initHeroParallaxTilt();
  } else {
    initReducedMotionNav();
  }

  // 3. Initialize Viewport Observers for Subsequent Sections
  initViewportReveals(prefersReduced);

  // 4. Initialize Active Step Tracker for #why-gtec Pinned Storytelling
  initWhyGtecTracker();

  // 5. Initialize Scroll-Driven Pinned Disciplines Runway
  initDisciplinesPinnedRunway();
}

/**
 * Choreographed 6-Step Introductory Entrance Animation
 * Step 1: Chassis keylight activation (0ms)
 * Step 2: Atmospheric navigation entrance (60ms)
 * Step 3: Eyebrow badge (160ms) & Masked Editorial Headline (260ms, 380ms)
 * Step 4: Dominant Visual Showcase frame, 3D Gyroscope & HUD Badges (500ms - 780ms)
 * Step 5: Supporting Copy (860ms), CTAs (960ms), & Staggered Metrics Wave (1080ms+)
 * Step 6: Subtle Animated Scroll Cue (1350ms)
 */
function runHeroIntroSequence(prefersReduced) {
  const allHeroElements = document.querySelectorAll(
    '.site-nav, .hero-eyebrow, .hero-title-inner, .hero-showcase-frame, ' +
    '.tech-gyroscope-wrapper, .hero-hud-badge, .hero-description, ' +
    '.hero-cta-group, .hero-metric-item, .hero-scroll-cue'
  );

  if (prefersReduced) {
    allHeroElements.forEach(el => el.classList.add('is-visible'));
    const chassis = document.getElementById('hero-chassis');
    if (chassis) chassis.classList.add('is-active');
    return;
  }

  // Step 1: Chassis container keylight ignition
  const chassis = document.getElementById('hero-chassis');
  if (chassis) chassis.classList.add('is-active');

  // Step 2: Atmospheric frosted navigation drop-in (60ms)
  setTimeout(() => {
    const nav = document.querySelector('.site-nav');
    if (nav) nav.classList.add('is-visible');
  }, 60);

  // Step 3: Eyebrow badge (160ms) & Editorial Headline Lines (260ms, 380ms)
  setTimeout(() => {
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) eyebrow.classList.add('is-visible');
  }, 160);

  const titleLines = document.querySelectorAll('.hero-title-inner');
  if (titleLines.length > 0) {
    setTimeout(() => { titleLines[0].classList.add('is-visible'); }, 260);
    if (titleLines[1]) {
      setTimeout(() => { titleLines[1].classList.add('is-visible'); }, 380);
    }
  }

  // Step 4: Dominant Visual Showcase Frame (500ms) + 3D Gyroscope + Telemetry Badges (660ms, 780ms)
  setTimeout(() => {
    const showcase = document.querySelector('.hero-showcase-frame');
    const gyro = document.querySelector('.tech-gyroscope-wrapper');
    if (showcase) showcase.classList.add('is-visible');
    if (gyro) gyro.classList.add('is-visible');
  }, 500);

  setTimeout(() => {
    const badgeTop = document.querySelector('.hero-hud-badge.badge-top');
    if (badgeTop) badgeTop.classList.add('is-visible');
  }, 660);

  setTimeout(() => {
    const badgeBottom = document.querySelector('.hero-hud-badge.badge-bottom');
    if (badgeBottom) badgeBottom.classList.add('is-visible');
  }, 780);

  // Step 5: Supporting Copy (860ms) + CTAs (960ms) + Staggered Proof Metrics (1080ms+)
  setTimeout(() => {
    const desc = document.querySelector('.hero-description');
    if (desc) desc.classList.add('is-visible');
  }, 860);

  setTimeout(() => {
    const ctas = document.querySelector('.hero-cta-group');
    if (ctas) ctas.classList.add('is-visible');
  }, 960);

  const metricItems = document.querySelectorAll('.hero-metric-item');
  metricItems.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add('is-visible');
    }, 1080 + idx * 75);
  });

  // Step 6: Subtle Scroll Cue (1350ms)
  setTimeout(() => {
    const cue = document.querySelector('.hero-scroll-cue');
    if (cue) cue.classList.add('is-visible');
  }, 1350);
}

/**
 * Coherent Multi-Phase Scroll-Linked Transformation from Hero into Section A
 *
 * Phase 1 (p: 0 -> 0.45): Spatial separation — left text lifts and fades;
 * visual showcase frame pulls forward into focus with 3D gyroscopic orbital acceleration.
 *
 * Phase 2 (p: 0.45 -> 1.0): Theatrical stage contraction — showcase and chassis
 * recede into 3D depth, border-radius deepens, atmospheric lighting dims.
 *
 * Phase 3 (p >= 0.75): Seamless docking — Section A white architectural card
 * docks cleanly over the contracted chassis, while header morphs to light theme.
 *
 * 100% Symmetrical: scrolling back UP reverses every single property seamlessly.
 */
function initHeroScrollTransition() {
  const heroStage = document.getElementById('hero-stage');
  const heroChassis = document.getElementById('hero-chassis');
  const heroLeft = document.getElementById('hero-left-content');
  const heroVisual = document.getElementById('hero-visual-stage');
  const gyroscope = document.querySelector('.tech-gyroscope');
  const scrollCue = document.querySelector('.hero-scroll-cue');
  const header = document.querySelector('.site-nav');
  const badgeTop = document.querySelector('.hero-hud-badge.badge-top');
  const badgeBottom = document.querySelector('.hero-hud-badge.badge-bottom');

  if (!heroStage || !heroChassis) return;

  let ticking = false;
  let runwayDistance = 0;

  function measureRunway() {
    if (window.innerWidth >= 1024) {
      const vh = window.innerHeight;
      const stageH = heroStage.offsetHeight;
      runwayDistance = Math.max(1, stageH - vh + 80);
    } else {
      runwayDistance = 0;
      // Reset desktop inline transforms on mobile viewports
      heroChassis.style.transform = '';
      heroChassis.style.borderRadius = '';
      heroChassis.style.filter = '';
      if (heroLeft) {
        heroLeft.style.opacity = '';
        heroLeft.style.transform = '';
      }
      if (heroVisual) {
        heroVisual.style.transform = '';
      }
      if (gyroscope) {
        gyroscope.style.transform = 'rotateX(38deg) rotateY(0deg)';
      }
      if (badgeTop) {
        badgeTop.style.transform = '';
        badgeTop.style.opacity = '';
      }
      if (badgeBottom) {
        badgeBottom.style.transform = '';
        badgeBottom.style.opacity = '';
      }
      if (scrollCue) {
        scrollCue.style.opacity = '';
      }
    }
  }

  measureRunway();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measureRunway, 100);
  }, { passive: true });

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        applyScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  function applyScrollProgress() {
    const scrollY = window.scrollY || window.pageYOffset;

    // --- A. DESKTOP MULTI-PHASE TRANSFORMATION (>= 1024px) ---
    if (window.innerWidth >= 1024 && runwayDistance > 0) {
      const p = Math.min(1, Math.max(0, scrollY / runwayDistance));

      // 1. Dynamic Navigation Theme Morphing
      if (header) {
        if (p > 0.72) {
          header.classList.add('theme-light');
        } else {
          header.classList.remove('theme-light');
        }
      }

      // 2. Left Content Spatial Drift and Fade
      if (heroLeft) {
        const textOpacity = Math.max(0, 1 - p * 1.55).toFixed(3);
        const textY = (-p * 75).toFixed(1);
        heroLeft.style.opacity = textOpacity;
        heroLeft.style.transform = `translate3d(0, ${textY}px, 0)`;
      }

      // 3. Right Visual Showcase: Phase 1 pull-forward -> Phase 2 recede
      if (heroVisual) {
        let visualScale, visualY;
        if (p <= 0.45) {
          const norm1 = p / 0.45;
          visualScale = (1 + norm1 * 0.045).toFixed(4); // 1.0 -> 1.045
          visualY = (-norm1 * 16).toFixed(1);
        } else {
          const norm2 = (p - 0.45) / 0.55;
          visualScale = (1.045 - norm2 * 0.105).toFixed(4); // 1.045 -> 0.940
          visualY = (-16 - norm2 * 26).toFixed(1);
        }
        heroVisual.style.transform = `translate3d(0, ${visualY}px, 0) scale3d(${visualScale}, ${visualScale}, 1)`;
      }

      // 4. Telemetry Badges Spatial Separation
      if (badgeTop) {
        const bTopX = (-p * 32).toFixed(1);
        const bTopOpacity = Math.max(0, 1 - p * 1.6).toFixed(3);
        badgeTop.style.transform = `translate3d(${bTopX}px, 0, 0)`;
        badgeTop.style.opacity = bTopOpacity;
      }
      if (badgeBottom) {
        const bBottomX = (p * 32).toFixed(1);
        const bBottomOpacity = Math.max(0, 1 - p * 1.6).toFixed(3);
        badgeBottom.style.transform = `translate3d(${bBottomX}px, 0, 0)`;
        badgeBottom.style.opacity = bBottomOpacity;
      }

      // 5. 3D Gyroscope Perspective Tilt and Accelerated Orbit
      if (gyroscope) {
        const tiltX = (38 + p * 20).toFixed(1);
        const spinZ = (p * 65).toFixed(1);
        gyroscope.style.transform = `rotateX(${tiltX}deg) rotateZ(${spinZ}deg)`;
      }

      // 6. Chassis Architectural Contraction and Deep Lighting
      const chassisScale = (1 - p * 0.045).toFixed(4); // 1.0 -> 0.955
      const chassisY = (p * 32).toFixed(1);
      const chassisRadius = Math.round(36 + p * 18); // 36px -> 54px
      const brightness = Math.max(0.68, 1 - p * 0.32).toFixed(3);

      heroChassis.style.transform = `scale3d(${chassisScale}, ${chassisScale}, 1) translate3d(0, ${chassisY}px, 0)`;
      heroChassis.style.borderRadius = `${chassisRadius}px`;
      heroChassis.style.filter = `brightness(${brightness})`;

      // 7. Scroll Cue Fade Out
      if (scrollCue) {
        const cueOpacity = Math.max(0, 1 - p * 4.0).toFixed(3);
        scrollCue.style.opacity = cueOpacity;
      }
    } 
    // --- B. MOBILE & TABLET FLUID PARALLAX (< 1024px) ---
    else {
      if (header) {
        if (scrollY > 180) {
          header.classList.add('theme-light');
        } else {
          header.classList.remove('theme-light');
        }
      }

      // Subtle scroll parallax without runway height
      if (heroLeft && scrollY < 600) {
        const mTextY = (-scrollY * 0.12).toFixed(1);
        const mOpacity = Math.max(0, 1 - scrollY / 450).toFixed(3);
        heroLeft.style.transform = `translate3d(0, ${mTextY}px, 0)`;
        heroLeft.style.opacity = mOpacity;
      }

      if (heroVisual && scrollY < 600) {
        const mVisualY = (-scrollY * 0.06).toFixed(1);
        heroVisual.style.transform = `translate3d(0, ${mVisualY}px, 0)`;
      }

      if (scrollCue) {
        const mCueOpacity = Math.max(0, 1 - scrollY / 80).toFixed(3);
        scrollCue.style.opacity = mCueOpacity;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial frame check
  applyScrollProgress();
}

/**
 * Interactive 3D Parallax Tilt for Visual Showcase & Gyroscope
 * Tracks desktop cursor on mousemove over hero canvas with smooth dampening.
 */
function initHeroParallaxTilt() {
  const chassis = document.querySelector('.chassis-hero');
  const showcase = document.querySelector('.hero-showcase-frame');
  const gyroscope = document.querySelector('.tech-gyroscope');

  if (!chassis || (!showcase && !gyroscope)) return;

  chassis.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;
    const rect = chassis.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Only apply mouse tilt if near the top of the scroll
    const scrollY = window.scrollY || 0;
    if (scrollY < 80) {
      if (showcase) {
        showcase.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
      }
      if (gyroscope) {
        gyroscope.style.transform = `rotateX(${(38 + y * 12).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg)`;
      }
    }
  }, { passive: true });

  chassis.addEventListener('mouseleave', () => {
    const scrollY = window.scrollY || 0;
    if (scrollY < 80) {
      if (showcase) {
        showcase.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      if (gyroscope) {
        gyroscope.style.transform = 'rotateX(38deg) rotateY(0deg)';
      }
    }
  });
}

/**
 * Accessible Fallback for Reduced Motion
 */
function initReducedMotionNav() {
  const header = document.querySelector('.site-nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 80) {
      header.classList.add('theme-light');
    } else {
      header.classList.remove('theme-light');
    }
  }, { passive: true });
}

/**
 * Viewport Intersection Observer for Content Sections
 */
function initViewportReveals(prefersReduced) {
  if (prefersReduced) {
    document.querySelectorAll('.motion-reveal, .motion-slide-left, .motion-slide-right').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.motion-reveal, .motion-slide-left, .motion-slide-right').forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * Active Step Tracker for #why-gtec Pinned Scroll Storytelling
 * Observes each story card and marks the corresponding left sidebar tracker step as active.
 */
function initWhyGtecTracker() {
  const storyCards = document.querySelectorAll('.why-story-card');
  const trackerItems = document.querySelectorAll('.why-tracker-item');

  if (storyCards.length === 0 || trackerItems.length === 0) return;

  function setActiveStep(stepNum) {
    trackerItems.forEach(item => {
      const itemStep = item.getAttribute('data-tracker-step');
      item.classList.toggle('is-active', itemStep === String(stepNum));
    });
    storyCards.forEach(card => {
      const cardStep = card.getAttribute('data-step');
      card.classList.toggle('is-in-view', cardStep === String(stepNum));
    });
  }

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target.getAttribute('data-step');
        if (step) {
          setActiveStep(step);
        }
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-10% 0px -40% 0px'
  });

  storyCards.forEach(card => cardObserver.observe(card));

  // Allow clicking on tracker items to smoothly navigate to the target story card
  trackerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const step = item.getAttribute('data-tracker-step');
      const targetCard = document.getElementById(`why-step-${step}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setActiveStep(step);
      }
    });
  });
}

/**
 * Scroll-Driven Pinned Training Disciplines Runway
 * Maps desktop scroll progress through #disciplines-track (380vh)
 * to synchronize the 4 discipline states, visual compositions,
 * background lighting shader, and scrubber indicator.
 * Provides mobile tab switching on viewports < 1024px.
 */
function initDisciplinesPinnedRunway() {
  const track = document.getElementById('disciplines-track');
  const glow = document.getElementById('disciplines-glow');
  const counter = document.getElementById('discipline-counter');
  const storyPanes = document.querySelectorAll('.discipline-story-pane');
  const visualLayers = document.querySelectorAll('.discipline-visual-layer');
  const scrubberSteps = document.querySelectorAll('.scrubber-step');
  const mobileTabs = document.querySelectorAll('.mobile-disc-tab');
  const mobileCards = document.querySelectorAll('.mobile-discipline-card');

  // Background glow shaders matching discipline themes
  const glowShaders = [
    'radial-gradient(circle at 75% 50%, rgba(1, 64, 133, 0.16) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
    'radial-gradient(circle at 75% 50%, rgba(16, 185, 129, 0.13) 0%, rgba(1, 64, 133, 0.10) 45%, transparent 70%)',
    'radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.13) 0%, rgba(1, 64, 133, 0.10) 45%, transparent 70%)',
    'radial-gradient(circle at 75% 50%, rgba(245, 158, 11, 0.13) 0%, rgba(1, 64, 133, 0.10) 45%, transparent 70%)'
  ];

  let currentActiveIndex = -1;

  function setActiveDiscipline(index) {
    if (index === currentActiveIndex || index < 0 || index > 3) return;
    currentActiveIndex = index;

    // Update left story panes
    storyPanes.forEach(pane => {
      const paneIdx = parseInt(pane.getAttribute('data-index'), 10);
      pane.classList.toggle('is-active', paneIdx === index);
    });

    // Update right visual layers
    visualLayers.forEach(layer => {
      const layerIdx = parseInt(layer.getAttribute('data-index'), 10);
      layer.classList.toggle('is-active', layerIdx === index);
    });

    // Update scrubber buttons
    scrubberSteps.forEach((btn, idx) => {
      btn.classList.toggle('is-active', idx === index);
      btn.setAttribute('aria-selected', idx === index ? 'true' : 'false');
    });

    // Update counter pill
    if (counter) {
      counter.textContent = `0${index + 1} // 04`;
    }

    // Update dynamic background glow shader
    if (glow && glowShaders[index]) {
      glow.style.background = glowShaders[index];
    }
  }

  // --- Desktop Scroll-Driven Progress Mapping ---
  let isTicking = false;

  function onScroll() {
    if (window.innerWidth < 1024 || !track) return;
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateScrollState();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function updateScrollState() {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const runway = track.offsetHeight - vh;
    if (runway <= 0) return;

    const offset = -rect.top;
    const progress = Math.min(1, Math.max(0, offset / runway));

    // Map progress smoothly across the 4 discipline states:
    // 0: [0.00, 0.25)
    // 1: [0.25, 0.50)
    // 2: [0.50, 0.75)
    // 3: [0.75, 1.00]
    const stateIndex = Math.min(3, Math.floor(progress * 4));
    setActiveDiscipline(stateIndex);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial check on page load
  if (window.innerWidth >= 1024 && track) {
    updateScrollState();
  }

  // Scrubber click interaction: smoothly scroll to the exact point in runway
  scrubberSteps.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetStep = parseInt(btn.getAttribute('data-step-target'), 10);
      if (isNaN(targetStep) || !track) return;

      const vh = window.innerHeight;
      const runway = track.offsetHeight - vh;
      const trackRect = track.getBoundingClientRect();
      const currentScrollY = window.scrollY || window.pageYOffset;
      const trackAbsoluteTop = trackRect.top + currentScrollY;
      // Offset slightly to center the state
      const targetOffset = trackAbsoluteTop + ((targetStep + 0.15) / 4) * runway;

      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
      setActiveDiscipline(targetStep);
    });
  });

  // --- Mobile Tab Switching (< 1024px) ---
  mobileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabIdx = tab.getAttribute('data-mobile-tab');
      mobileTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const targetCard = document.getElementById(`mobile-disc-${tabIdx}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Observe mobile cards to update active mobile tab on natural scroll
  if (window.IntersectionObserver && mobileCards.length > 0) {
    const mobileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = entry.target.id;
          const idx = cardId.replace('mobile-disc-', '');
          mobileTabs.forEach(tab => {
            tab.classList.toggle('is-active', tab.getAttribute('data-mobile-tab') === idx);
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px -40% 0px'
    });

    mobileCards.forEach(card => mobileObserver.observe(card));
  }
}


