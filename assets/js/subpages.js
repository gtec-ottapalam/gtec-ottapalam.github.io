// ==========================================================================
// G-TEC NEW-SITE — SUBPAGE APPLICATION LOGIC
// ==========================================================================
import { siteConfig } from './config.js';
import { disciplineCategories, verifiedCourses } from './courses-data.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initBackToTop();

  const pathname = window.location.pathname;

  if (pathname.includes('courses.html')) {
    initCoursesPage();
  } else if (pathname.includes('course-detail.html')) {
    initCourseDetailPage();
  } else if (pathname.includes('admissions.html')) {
    initAdmissionsPage();
  } else if (pathname.includes('contact.html')) {
    initContactPage();
  }
});

// Mobile Drawer Navigation
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// COURSES CATALOGUE PAGE (courses.html)
// ==========================================================================
function initCoursesPage() {
  const gridEl = document.getElementById('all-courses-grid');
  const searchInput = document.getElementById('catalogue-search');
  const searchClearBtn = document.getElementById('catalogue-search-clear');
  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  const counterEl = document.getElementById('catalogue-counter');
  const emptyStateEl = document.getElementById('catalogue-empty');
  const resetBtn = document.getElementById('catalogue-reset-btn');

  if (!gridEl) return;

  // Read URL query parameter: ?cat=cad
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('cat') || 'all';
  let searchTerm = '';

  // Synchronize initial filter pill state
  filterBtns.forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (cat === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  function renderCatalogue() {
    let filtered = verifiedCourses.filter(course => {
      const matchesCat = activeCategory === 'all' || course.category === activeCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || 
        course.name.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        (course.modules && course.modules.some(m => m.toLowerCase().includes(q))) ||
        (course.eligibility && course.eligibility.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });

    // Update Counter
    if (counterEl) {
      counterEl.textContent = `Showing ${filtered.length} of ${verifiedCourses.length} Verified Programs`;
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      gridEl.style.display = 'none';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
    } else {
      gridEl.style.display = 'grid';
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    gridEl.innerHTML = filtered.map((course, idx) => {
      const catCode = course.category.toUpperCase().slice(0, 3);
      const modulesPreview = (course.modules || []).slice(0, 3);

      return `
        <article class="course-card motion-reveal" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="course-card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <span class="discipline-index">${catCode} 0${(idx % 9) + 1}</span>
              <span class="spotlight-cat-tag" style="background: var(--bg-subtle); color: var(--color-gtec-blue); border: 1px solid var(--border-color);">${course.categoryTitle || 'Certified'}</span>
            </div>

            <h3 class="course-title" style="font-family: var(--font-display); font-size: 18px; font-weight: 800; color: var(--color-navy-dark); margin-bottom: 8px; line-height: 1.25;">
              <a href="./course-detail.html?id=${course.id}" style="color: inherit; text-decoration: none;">${course.name}</a>
            </h3>

            <p style="font-family: var(--font-body); font-size: 13.5px; color: var(--color-slate-body); line-height: 1.55; margin-bottom: 16px;">
              ${course.description.slice(0, 140)}...
            </p>

            <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; margin-bottom: 18px;">
              <div style="font-family: var(--font-display); font-size: 10.5px; font-weight: 800; color: var(--color-slate-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                Key Syllabus Modules:
              </div>
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
                ${modulesPreview.map(m => `
                  <li style="font-size: 12.5px; color: var(--color-slate-dark); display: flex; align-items: flex-start; gap: 6px;">
                    <span style="color: var(--color-gtec-blue); font-weight: bold;">•</span>
                    <span>${m}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-subtle); margin-bottom: 14px;">
              <span style="font-size: 12px; color: var(--color-slate-muted); font-weight: 600;">⏱ ${course.duration || 'Flexible Duration'}</span>
              <span style="font-size: 12px; color: #16A34A; font-weight: 700;">1:1 Lab Machine</span>
            </div>

            <div style="display: flex; gap: 8px;">
              <a href="./course-detail.html?id=${course.id}" class="btn btn-navy btn-sm" style="flex: 1; justify-content: center;">
                <span>View Full Syllabus &rarr;</span>
              </a>
              <a href="https://wa.me/916238843939?text=${encodeURIComponent(`Hello G-TEC Ottappalam, I would like syllabus and fee details for ${course.name}.`)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="padding: 8px 12px;" aria-label="WhatsApp syllabus enquiry">
                💬
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter Buttons binding
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderCatalogue();

      // Update URL without reloading
      const url = new URL(window.location);
      if (activeCategory === 'all') {
        url.searchParams.delete('cat');
      } else {
        url.searchParams.set('cat', activeCategory);
      }
      window.history.replaceState({}, '', url);
    });
  });

  // Search input binding
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderCatalogue();
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchTerm = '';
      renderCatalogue();
      searchInput.focus();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchTerm = '';
      if (searchInput) searchInput.value = '';
      filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === 'all'));
      renderCatalogue();
    });
  }

  renderCatalogue();
}

// ==========================================================================
// COURSE DETAIL DEEP-DIVE PAGE (course-detail.html)
// ==========================================================================
function initCourseDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');

  const notFoundSection = document.getElementById('course-not-found');
  const contentSection = document.getElementById('course-detail-content');

  const course = verifiedCourses.find(c => c.id === courseId);

  if (!course) {
    if (notFoundSection) notFoundSection.style.display = 'block';
    if (contentSection) contentSection.style.display = 'none';
    document.title = 'Course Not Found | G-TEC Education Ottappalam';
    return;
  }

  if (notFoundSection) notFoundSection.style.display = 'none';
  if (contentSection) contentSection.style.display = 'block';

  // Update Page Title
  document.title = `${course.name} | G-TEC Computer Education Ottappalam`;

  // Bind Header Fields
  const breadcrumbCourse = document.getElementById('breadcrumb-course');
  const courseCatTag = document.getElementById('course-cat-tag');
  const courseLevelBadge = document.getElementById('course-level-badge');
  const courseTitleEl = document.getElementById('course-title');
  const courseDescEl = document.getElementById('course-description');

  if (breadcrumbCourse) breadcrumbCourse.textContent = course.name;
  if (courseCatTag) courseCatTag.textContent = course.categoryTitle || 'Certified Program';
  if (courseLevelBadge) courseLevelBadge.textContent = course.level || 'Certificate Course';
  if (courseTitleEl) courseTitleEl.textContent = course.name;
  if (courseDescEl) courseDescEl.textContent = course.description;

  // Bind Quick Facts
  const durationVal = document.getElementById('fact-duration');
  const eligibilityVal = document.getElementById('fact-eligibility');
  const certVal = document.getElementById('fact-certification');

  if (durationVal) durationVal.textContent = course.duration || '3 Months Standard';
  if (eligibilityVal) eligibilityVal.textContent = course.eligibility || 'Open to all graduates & higher secondary';
  if (certVal) certVal.textContent = 'ISO 9001:2015 Audited G-TEC Credential';

  // Bind Modules Deck
  const modulesDeck = document.getElementById('modules-deck');
  if (modulesDeck && course.modules) {
    modulesDeck.innerHTML = course.modules.map((mod, idx) => `
      <div class="syllabus-module-row">
        <span class="module-index-badge">MODULE 0${idx + 1}</span>
        <div class="module-title-text">${mod}</div>
      </div>
    `).join('');
  }

  // Bind Career Pathways
  const careersDeck = document.getElementById('careers-deck');
  if (careersDeck && course.careerOpportunities) {
    careersDeck.innerHTML = course.careerOpportunities.map(career => `
      <div style="display: inline-flex; align-items: center; gap: 7px; padding: 6px 14px; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-full); font-size: 13px; font-weight: 600; color: var(--color-slate-dark);">
        <span style="color: var(--color-gtec-blue); font-weight: bold;">💼</span>
        <span>${career}</span>
      </div>
    `).join('');
  }

  // Bind WhatsApp Direct Action Buttons
  const waEnquiryBtn = document.getElementById('course-wa-btn');
  const waMessage = `Hello G-TEC Education Ottappalam,\nI am interested in admission for the ${course.name} program.\nDuration: ${course.duration}.\nPlease share the upcoming batch start date, fee structure, and admissions details.`;
  const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(waMessage)}`;

  if (waEnquiryBtn) {
    waEnquiryBtn.href = waUrl;
  }

  // Render Related Courses
  const relatedGrid = document.getElementById('related-courses-grid');
  if (relatedGrid) {
    const related = verifiedCourses
      .filter(c => c.category === course.category && c.id !== course.id)
      .slice(0, 3);

    relatedGrid.innerHTML = related.map(rel => `
      <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: var(--color-gtec-blue); text-transform: uppercase;">${rel.categoryTitle}</span>
          <h4 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--color-navy-dark); margin-top: 6px; margin-bottom: 8px;">
            <a href="./course-detail.html?id=${rel.id}" style="color: inherit; text-decoration: none;">${rel.name}</a>
          </h4>
          <p style="font-size: 13px; color: var(--color-slate-body); line-height: 1.5; margin-bottom: 14px;">${rel.description.slice(0, 95)}...</p>
        </div>
        <a href="./course-detail.html?id=${rel.id}" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
          <span>Explore Syllabus &rarr;</span>
        </a>
      </div>
    `).join('');
  }
}

// ==========================================================================
// ADMISSIONS PAGE (admissions.html)
// ==========================================================================
function initAdmissionsPage() {
  // FAQ Accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      }
    });
  });

  // Admissions Form (re-use smart validation engine)
  const form = document.getElementById('admissions-subpage-form');
  const confirmBox = document.getElementById('admissions-subpage-confirm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sub-student-name')?.value.trim();
      const phone = document.getElementById('sub-student-phone')?.value.trim();
      const course = document.getElementById('sub-course-interest')?.value;
      const timing = document.getElementById('sub-batch-timing')?.value;

      if (!name || name.length < 2) {
        alert('Please enter your full name (at least 2 letters)');
        return;
      }
      if (!phone || phone.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
      if (!course) {
        alert('Please select your program of interest');
        return;
      }

      const message = `*G-TEC EDUCATION OTTAPPALAM — ADMISSIONS INQUIRY*\n• Name: ${name}\n• Phone: ${phone}\n• Course: ${course}\n• Preferred Batch: ${timing}\nKindly share verified syllabus and fee schedule. Thank you!`;
      const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;

      if (confirmBox) {
        form.style.display = 'none';
        confirmBox.style.display = 'block';
        const link = document.getElementById('sub-launch-wa');
        if (link) link.href = waUrl;
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

// ==========================================================================
// CONTACT PAGE (contact.html)
// ==========================================================================
function initContactPage() {
  const contactForm = document.getElementById('contact-direct-form');
  const confirmBox = document.getElementById('contact-direct-confirm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number');
        return;
      }

      const formatted = `*G-TEC OTTAPPALAM — CONTACT ENQUIRY*\n• Name: ${name}\n• Contact: ${phone}\n• Message: ${message || 'Requesting callback regarding course enrollment'}`;
      const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(formatted)}`;

      if (confirmBox) {
        contactForm.style.display = 'none';
        confirmBox.style.display = 'block';
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}
