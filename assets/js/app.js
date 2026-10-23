// ==========================================================================
// G-TEC NEW-SITE — MAIN APPLICATION CONTROLLER
// ==========================================================================

import { siteConfig } from './config.js';
import { verifiedCourses, courseMap } from './courses-data.js';
import { initMotionEngine } from './motion-engine.js';

let currentCategory = 'all';
let currentSearchTerm = '';

const categoryImages = {
  cad: './assets/images/student-workstation.jpg',
  software: './assets/images/students-coding-lab.jpg',
  multimedia: './assets/images/students-learning.jpg',
  accounting: './assets/images/training-lab-perspective.jpg'
};

const categoryNames = {
  all: 'All Disciplines',
  cad: 'CAD & Engineering',
  software: 'Software & IT',
  multimedia: 'Multimedia & VFX',
  accounting: 'Corporate Accounting & SAP'
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

function updateStatusBar(filteredCount) {
  const counterEl = document.getElementById('courses-counter-num');
  const badgeEl = document.getElementById('courses-active-badge');
  const resetBtn = document.getElementById('courses-reset-btn');
  const clearSearchBtn = document.getElementById('search-clear-btn');

  if (counterEl) {
    counterEl.textContent = `Showing ${filteredCount} of ${verifiedCourses.length} Verified Programs`;
  }

  if (badgeEl) {
    if (currentSearchTerm.trim()) {
      badgeEl.textContent = `Search: "${currentSearchTerm.trim()}"`;
    } else {
      badgeEl.textContent = categoryNames[currentCategory] || 'All Disciplines';
    }
  }

  const isFiltered = currentCategory !== 'all' || currentSearchTerm.trim() !== '';
  if (resetBtn) {
    resetBtn.style.display = isFiltered ? 'inline-block' : 'none';
  }

  if (clearSearchBtn) {
    clearSearchBtn.classList.toggle('is-active', currentSearchTerm.trim().length > 0);
  }
}

export function resetFilters() {
  currentCategory = 'all';
  currentSearchTerm = '';
  const searchInput = document.getElementById('course-search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-pill').forEach(btn => {
    const isTarget = btn.getAttribute('data-category') === 'all';
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });
  renderCourses();
}

// 1. Render Course Cards (With Spotlight Lead & Editorial Stream)
export function renderCourses() {
  const grid = document.getElementById('courses-grid');
  if (!grid || !verifiedCourses) return;

  const filtered = verifiedCourses.filter(course => {
    const matchCat = (currentCategory === 'all' || course.category === currentCategory);
    const q = currentSearchTerm.toLowerCase().trim();
    const matchSearch = !q ||
      course.name.toLowerCase().includes(q) ||
      (course.description && course.description.toLowerCase().includes(q)) ||
      (course.tools && course.tools.some(t => t.toLowerCase().includes(q))) ||
      (course.modules && course.modules.some(m => m.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="courses-empty-state">
        <div class="empty-state-icon-box" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-state-title">No Matching Programs Found</h3>
        <p class="empty-state-desc">
          We couldn't find any courses matching "${escapeHtml(currentSearchTerm)}" in the selected category. Try searching for other tools like Revit, Python, SAP, Flutter, or Tally.
        </p>
        <div class="empty-state-actions">
          <button type="button" class="btn btn-navy btn-sm" id="empty-reset-btn">
            <span>Reset All Filters</span>
          </button>
          <a href="${siteConfig.whatsappUrl}?text=${encodeURIComponent('Hello G-TEC Education Ottappalam, I am looking for information on a course that was not found in the search: ' + currentSearchTerm)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Enquire with counsellor on WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.12-.533-1.821-.756-2.986-2.614-3.076-2.735-.09-.12-0.739-.983-.739-1.874 0-.891.468-1.328.635-1.507.167-.179.366-.224.488-.224.122 0 .245.002.35.008.113.006.262-.042.411.314.155.371.531 1.296.577 1.39.046.094.077.204.015.327-.061.123-.092.199-.183.307-.091.107-.193.24-.276.323-.092.092-.188.193-.081.378.107.184.475.786 1.021 1.272.703.627 1.296.822 1.48.914.184.092.292.077.4-.046.108-.123.461-.537.584-.722.123-.184.246-.154.414-.092.169.062 1.07.505 1.254.597.184.092.307.138.353.215.046.077.046.447-.098.852z"/>
            </svg>
            <span>Ask Counsellor on WhatsApp</span>
          </a>
        </div>
      </div>
    `;
    const resetBtn = document.getElementById('empty-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }
    updateStatusBar(0);
    return;
  }

  const spotlightCourse = filtered[0];
  const standardCourses = filtered.slice(1);

  const spotlightHtml = `
    <article class="course-card-spotlight motion-reveal is-revealed" id="course-${spotlightCourse.id}">
      <div class="spotlight-banner-wrap" style="background-image: url('${categoryImages[spotlightCourse.category] || './assets/images/training-lab-wide.jpg'}');">
        <div class="spotlight-eyebrow-pill">
          <span class="pulse-dot"></span>
          <span>Featured Career Track</span>
        </div>
        <div class="spotlight-meta-strip">
          <span class="spotlight-cat-tag">${spotlightCourse.categoryTitle || spotlightCourse.category.toUpperCase()}</span>
          <span class="spotlight-dur-tag">${spotlightCourse.duration || "Verified Track"}</span>
        </div>
      </div>
      <div class="spotlight-content-wrap">
        <div>
          <span class="course-level-tag">${spotlightCourse.level || "Professional Certification"}</span>
          <h3 class="spotlight-title">
            <a href="./course-detail.html?id=${spotlightCourse.id}">${spotlightCourse.name}</a>
          </h3>
          <p class="spotlight-desc">
            ${spotlightCourse.description || "Industry accredited training curriculum designed for live practical execution."}
          </p>

          ${spotlightCourse.modules && spotlightCourse.modules.length > 0 ? `
            <div class="spotlight-modules-preview">
              <span class="spotlight-modules-heading">Core Curriculum Syllabus Preview</span>
              <div class="spotlight-modules-list">
                ${spotlightCourse.modules.slice(0, 3).map((m, i) => `
                  <div class="spotlight-module-item">
                    <span class="mod-num">0${i+1}.</span>
                    <span>${m}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${spotlightCourse.tools && spotlightCourse.tools.length > 0 ? `
            <div class="spotlight-tools-wrap">
              ${spotlightCourse.tools.map(t => `<span class="tool-chip">${t}</span>`).join('')}
            </div>
          ` : ''}
        </div>

        <div class="spotlight-actions-row">
          <a href="./course-detail.html?id=${spotlightCourse.id}" class="btn btn-navy btn-sm">
            <span>View Full Syllabus &rarr;</span>
          </a>
          <button type="button" class="btn btn-outline btn-sm" data-modal="${spotlightCourse.id}">
            <span>Quick Preview</span>
          </button>
          <a href="${siteConfig.whatsappUrl}?text=${encodeURIComponent('Hello G-TEC Ottappalam, I would like to know more about the ' + spotlightCourse.name + ' course. Please share admission details.')}" 
             target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Enquire about ${spotlightCourse.name} on WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.12-.533-1.821-.756-2.986-2.614-3.076-2.735-.09-.12-0.739-.983-.739-1.874 0-.891.468-1.328.635-1.507.167-.179.366-.224.488-.224.122 0 .245.002.35.008.113.006.262-.042.411.314.155.371.531 1.296.577 1.39.046.094.077.204.015.327-.061.123-.092.199-.183.307-.091.107-.193.24-.276.323-.092.092-.188.193-.081.378.107.184.475.786 1.021 1.272.703.627 1.296.822 1.48.914.184.092.292.077.4-.046.108-.123.461-.537.584-.722.123-.184.246-.154.414-.092.169.062 1.07.505 1.254.597.184.092.307.138.353.215.046.077.046.447-.098.852z"/>
            </svg>
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </article>
  `;

  const standardCardsHtml = standardCourses.map((c) => `
    <article class="course-card motion-reveal is-revealed" id="course-${c.id}">
      <div class="course-card-top" style="background-image: url('${categoryImages[c.category] || './assets/images/training-lab-wide.jpg'}');">
        <span class="course-cat-badge">${c.categoryTitle || c.category.toUpperCase()}</span>
        <span class="course-dur-badge">${c.duration || "Verified Track"}</span>
      </div>
      <div class="course-card-body">
        <span class="course-level-tag">${c.level || "Professional Program"}</span>
        <h3 class="course-card-title">
          <a href="./course-detail.html?id=${c.id}">${c.name}</a>
        </h3>
        <p class="course-card-desc">
          ${c.description || "Industry accredited training curriculum designed for live practical execution."}
        </p>

        ${c.modules && c.modules.length > 0 ? `
          <div class="course-modules-teaser">
            ${c.modules.slice(0, 2).map(m => `
              <div class="course-teaser-item">
                <span class="bullet-dot">▸</span>
                <span>${m}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${c.tools && c.tools.length > 0 ? `
          <div class="course-card-tools">
            ${c.tools.slice(0, 4).map(t => `<span class="tool-chip">${t}</span>`).join('')}
            ${c.tools.length > 4 ? `<span class="tool-chip">+${c.tools.length - 4} more</span>` : ''}
          </div>
        ` : ''}
      </div>

      <div class="course-card-footer">
        <a href="./course-detail.html?id=${c.id}" class="btn btn-navy btn-sm">
          <span>View Syllabus</span>
        </a>
        <button type="button" class="btn btn-outline btn-sm" data-modal="${c.id}" style="padding: 0 10px;" title="Quick Overview">
          <span>Quick Preview</span>
        </button>
        <a href="${siteConfig.whatsappUrl}?text=${encodeURIComponent('Hello G-TEC Ottappalam, I would like to know more about the ' + c.name + ' course. Please share admission details.')}" 
           target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Enquire about ${c.name} on WhatsApp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.12-.533-1.821-.756-2.986-2.614-3.076-2.735-.09-.12-0.739-.983-.739-1.874 0-.891.468-1.328.635-1.507.167-.179.366-.224.488-.224.122 0 .245.002.35.008.113.006.262-.042.411.314.155.371.531 1.296.577 1.39.046.094.077.204.015.327-.061.123-.092.199-.183.307-.091.107-.193.24-.276.323-.092.092-.188.193-.081.378.107.184.475.786 1.021 1.272.703.627 1.296.822 1.48.914.184.092.292.077.4-.046.108-.123.461-.537.584-.722.123-.184.246-.154.414-.092.169.062 1.07.505 1.254.597.184.092.307.138.353.215.046.077.046.447-.098.852z"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');

  grid.innerHTML = spotlightHtml + standardCardsHtml;

  // Attach modal trigger listeners
  grid.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-modal');
      openCourseModal(id);
    });
  });

  updateStatusBar(filtered.length);
}

// 2. Set Category
export function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    const isTarget = btn.getAttribute('data-category') === cat;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });
  renderCourses();
}

// 3. Course Modal Logic
export function openCourseModal(courseId) {
  const course = courseMap[courseId];
  if (!course) return;

  const backdrop = document.getElementById('course-modal-backdrop');
  const dialog = document.getElementById('course-modal-dialog');
  if (!backdrop || !dialog) return;

  const waMsg = `Hello G-TEC Education Ottappalam, I would like to enquire about the ${course.name} course at your Ottappalam centre. Please share syllabus and batch schedules.`;
  const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(waMsg)}`;

  dialog.innerHTML = `
    <div style="padding: 24px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
          <span class="course-cat-badge" style="position: static;">${course.category.toUpperCase()}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--color-slate-muted);">${course.duration || "Verified Track"}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--color-gtec-blue); margin-top: 8px; margin-bottom: 6px;">${course.name}</h2>
        <p style="font-size: 14px; color: var(--color-slate-body); max-width: 540px;">${course.description || "Industry accredited training program designed for practical execution."}</p>
      </div>
      <button type="button" id="modal-close-x" style="background: none; border: none; font-size: 26px; cursor: pointer; color: var(--color-slate-dark);" aria-label="Close modal">&times;</button>
    </div>

    <div style="padding: 24px;">
      ${course.eligibility ? `
        <div style="margin-bottom: 20px; background: var(--color-gtec-blue-light); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--color-gtec-blue-border);">
          <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-gtec-blue);">Eligibility:</strong>
          <span style="font-size: 14px; color: var(--color-slate-body); margin-left: 6px;">${course.eligibility}</span>
        </div>
      ` : ''}

      ${course.tools && course.tools.length > 0 ? `
        <div style="margin-bottom: 22px;">
          <h4 style="font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; color: var(--color-gtec-blue);">Software & Tools Covered</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${course.tools.map(t => `<span class="tool-chip" style="font-size: 12px; padding: 4px 10px;">${t}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${course.modules && course.modules.length > 0 ? `
        <div>
          <h4 style="font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: var(--color-gtec-blue);">Curriculum Modules</h4>
          <div style="display: grid; gap: 8px;">
            ${course.modules.map((m, idx) => `
              <div style="display: flex; gap: 10px; align-items: flex-start; padding: 10px 14px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                <span style="font-family: var(--font-display); font-size: 11px; font-weight: 700; color: var(--color-gtec-blue); margin-top: 3px;">0${idx+1}.</span>
                <span style="font-size: 13.5px; color: var(--color-slate-body); font-weight: 500;">${m}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <div style="padding: 16px 24px; background: var(--bg-subtle); border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div style="font-size: 13px; color: var(--color-slate-muted);">
        Verified Curriculum • JRJ Complex, Ottappalam
      </div>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <a href="./course-detail.html?id=${course.id}" class="btn btn-navy btn-sm">
          <span>Full Syllabus Page &rarr;</span>
        </a>
        <a href="${siteConfig.phoneTel}" class="btn btn-outline btn-sm">
          <span>Call 9995955501</span>
        </a>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  `;

  document.getElementById('modal-close-x')?.addEventListener('click', closeCourseModal);
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeCourseModal() {
  const backdrop = document.getElementById('course-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 4. Mobile Drawer Toggling
export function toggleMobileDrawer(open) {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

// 5. App Initialization on DOM Ready or Immediate if Loaded
function initApp() {
  initMotionEngine();
  renderCourses();

  // Category Filter Pills
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat) setCategory(cat);
    });
  });

  // Discipline & Footer Filter Links
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-filter');
      if (cat) {
        setCategory(cat);
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ========================================================================
  // 7. ROBUST ADMISSIONS & SYLLABUS REQUEST DESK ENGINE
  // ========================================================================
  const admissionsForm = document.getElementById('admissions-form');
  const confirmationCard = document.getElementById('admissions-confirmation');
  const nameInput = document.getElementById('student-name');
  const phoneInput = document.getElementById('student-phone');
  const courseInput = document.getElementById('course-interest');
  const timingInput = document.getElementById('batch-timing');
  const notesInput = document.getElementById('student-notes');

  const groupName = document.getElementById('group-student-name');
  const groupPhone = document.getElementById('group-student-phone');
  const groupCourse = document.getElementById('group-course-interest');

  const confirmNameEl = document.getElementById('confirm-name');
  const confirmPhoneEl = document.getElementById('confirm-phone');
  const confirmCourseEl = document.getElementById('confirm-course');
  const confirmTimingEl = document.getElementById('confirm-timing');
  const launchWaBtn = document.getElementById('btn-launch-wa');
  const copyBtn = document.getElementById('btn-copy-enquiry');
  const copyBtnText = document.getElementById('copy-btn-text');
  const resetFormBtn = document.getElementById('btn-reset-form');
  const submitBtn = document.getElementById('btn-submit-admissions');

  let lastPreparedMessage = '';

  // Real-time Field Validation Helpers
  function validateName() {
    if (!nameInput || !groupName) return true;
    const val = nameInput.value.trim();
    const isValid = val.length >= 2;
    if (!isValid) {
      groupName.classList.add('is-invalid');
      nameInput.classList.add('has-error');
      nameInput.setAttribute('aria-invalid', 'true');
    } else {
      groupName.classList.remove('is-invalid');
      nameInput.classList.remove('has-error');
      nameInput.removeAttribute('aria-invalid');
    }
    return isValid;
  }

  function validatePhone() {
    if (!phoneInput || !groupPhone) return true;
    const rawVal = phoneInput.value.trim();
    const digitsOnly = rawVal.replace(/\D/g, '');
    const isValid = digitsOnly.length >= 10 && digitsOnly.length <= 15;
    if (!isValid) {
      groupPhone.classList.add('is-invalid');
      phoneInput.classList.add('has-error');
      phoneInput.setAttribute('aria-invalid', 'true');
    } else {
      groupPhone.classList.remove('is-invalid');
      phoneInput.classList.remove('has-error');
      phoneInput.removeAttribute('aria-invalid');
    }
    return isValid;
  }

  function validateCourse() {
    if (!courseInput || !groupCourse) return true;
    const isValid = courseInput.value.trim() !== '';
    if (!isValid) {
      groupCourse.classList.add('is-invalid');
      courseInput.classList.add('has-error');
      courseInput.setAttribute('aria-invalid', 'true');
    } else {
      groupCourse.classList.remove('is-invalid');
      courseInput.classList.remove('has-error');
      courseInput.removeAttribute('aria-invalid');
    }
    return isValid;
  }

  // Attach live event listeners to clear errors on user typing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (groupName && groupName.classList.contains('is-invalid')) validateName();
    });
    nameInput.addEventListener('blur', validateName);
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (groupPhone && groupPhone.classList.contains('is-invalid')) validatePhone();
    });
    phoneInput.addEventListener('blur', validatePhone);
  }

  if (courseInput) {
    courseInput.addEventListener('change', validateCourse);
  }

  // Form Submission Handler
  if (admissionsForm) {
    admissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isCourseValid = validateCourse();

      if (!isNameValid) {
        nameInput?.focus();
        return;
      }
      if (!isPhoneValid) {
        phoneInput?.focus();
        return;
      }
      if (!isCourseValid) {
        courseInput?.focus();
        return;
      }

      // Read sanitized values
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const course = courseInput.value;
      const timing = timingInput ? timingInput.value : 'Flexible Timing';
      const notes = notesInput ? notesInput.value.trim() : '';

      // Format structured message for G-TEC Ottappalam admissions desk
      let message = `*G-TEC EDUCATION OTTAPPALAM — ADMISSIONS ENQUIRY*\n`;
      message += `--------------------------------------\n`;
      message += `• *Candidate Name:* ${name}\n`;
      message += `• *Contact Mobile:* ${phone}\n`;
      message += `• *Program of Interest:* ${course}\n`;
      message += `• *Preferred Batch:* ${timing}\n`;
      if (notes) {
        message += `• *Questions/Notes:* ${notes}\n`;
      }
      message += `--------------------------------------\n`;
      message += `Kindly share the certified syllabus PDF, upcoming batch calendar, and fee schedule. Thank you!`;

      lastPreparedMessage = message;
      const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;

      // Update Confirmation Dossier in UI
      if (confirmNameEl) confirmNameEl.textContent = name;
      if (confirmPhoneEl) confirmPhoneEl.textContent = phone;
      if (confirmCourseEl) confirmCourseEl.textContent = course;
      if (confirmTimingEl) confirmTimingEl.textContent = timing;
      if (launchWaBtn) launchWaBtn.href = waUrl;

      // Provide visual submission progress
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Preparing WhatsApp Desk... ⌛</span>';
      }

      setTimeout(() => {
        // Hide form and activate confirmation card
        admissionsForm.style.display = 'none';
        if (confirmationCard) {
          confirmationCard.classList.add('is-active');
          confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Admissions Enquiry via WhatsApp &rarr;</span>';
        }

        // Open WhatsApp in a clean new tab
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 350);
    });
  }

  // Copy Summary to Clipboard
  if (copyBtn && copyBtnText) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && lastPreparedMessage) {
          await navigator.clipboard.writeText(lastPreparedMessage);
          copyBtnText.textContent = 'Copied to Clipboard! ✓';
          setTimeout(() => {
            copyBtnText.textContent = 'Copy Summary to Clipboard 📋';
          }, 2400);
        } else {
          // Fallback selection copy
          copyBtnText.textContent = 'Text Ready ✓';
        }
      } catch (err) {
        console.warn('Clipboard write error:', err);
      }
    });
  }

  // Reset / Submit Another Enquiry Button
  if (resetFormBtn && admissionsForm && confirmationCard) {
    resetFormBtn.addEventListener('click', () => {
      confirmationCard.classList.remove('is-active');
      admissionsForm.reset();
      admissionsForm.style.display = 'flex';
      nameInput?.focus();
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Search input binding
  const searchInput = document.getElementById('course-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      renderCourses();
    });
  }

  // Search Clear Button
  const searchClearBtn = document.getElementById('search-clear-btn');
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      currentSearchTerm = '';
      renderCourses();
    });
  }

  // Quick Trending Search Suggestion Chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query && searchInput) {
        searchInput.value = query;
        currentSearchTerm = query;
        renderCourses();
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Status Bar Reset Filters Button
  const statusResetBtn = document.getElementById('courses-reset-btn');
  if (statusResetBtn) {
    statusResetBtn.addEventListener('click', resetFilters);
  }

  // Campus Facility Tabs
  const facilityTabs = document.querySelectorAll('.facility-tab-btn');
  const facilityPanels = document.querySelectorAll('.facility-panel');
  facilityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetIdx = tab.getAttribute('data-facility');
      facilityTabs.forEach(t => {
        const isMatch = t.getAttribute('data-facility') === targetIdx;
        t.classList.toggle('is-active', isMatch);
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      facilityPanels.forEach(panel => {
        panel.classList.toggle('is-active', panel.id === `facility-panel-${targetIdx}`);
      });
    });
  });

  // Career Discipline Tabs
  const careerTabs = document.querySelectorAll('.career-tab-btn');
  const careerPanels = document.querySelectorAll('.career-discipline-panel');
  careerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCareer = tab.getAttribute('data-career');
      careerTabs.forEach(t => {
        const isMatch = t.getAttribute('data-career') === targetCareer;
        t.classList.toggle('is-active', isMatch);
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      careerPanels.forEach(panel => {
        panel.classList.toggle('is-active', panel.id === `career-panel-${targetCareer}`);
      });
    });
  });

  // Modal Backdrop Click
  const backdrop = document.getElementById('course-modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCourseModal();
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCourseModal();
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleMobileDrawer(true));
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => toggleMobileDrawer(false));
  }
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileDrawer(false));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
