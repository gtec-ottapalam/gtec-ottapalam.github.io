/**
 * G-TEC Ottapalam - Interactive Application Controller
 * Handles Course Explorer, Live Search, Category/Level Filters, Modals & WhatsApp Lead Gen
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    selectedCategory: 'all',
    selectedLevel: 'all',
    searchQuery: '',
    visibleCount: 24,
    pageSize: 24,
    activeCourse: null
  };

  // DOM Elements
  const coursesGrid = document.getElementById('courses-grid');
  const courseCountBadge = document.getElementById('course-count-badge');
  const emptyState = document.getElementById('empty-state');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const searchInput = document.getElementById('course-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const heroSearchInput = document.getElementById('hero-search-input');
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const levelChips = document.querySelectorAll('.level-chip-btn');

  // Modals
  const courseModal = document.getElementById('course-detail-modal');
  const courseModalClose = document.getElementById('course-modal-close');
  const courseModalBody = document.getElementById('course-modal-body');
  
  const enquiryModal = document.getElementById('enquiry-modal');
  const enquiryModalClose = document.getElementById('enquiry-modal-close');
  const enquiryForm = document.getElementById('enquiry-form');
  const enquiryCourseSelect = document.getElementById('enquiry-course-select');

  // Mobile Menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  // Prepopulate Course Select in Enquiry Modal
  function populateEnquiryOptions() {
    if (!enquiryCourseSelect || typeof GTEC_COURSES === 'undefined') return;
    
    // Group courses by category
    const categoriesMap = {};
    GTEC_COURSES.forEach(c => {
      if (!categoriesMap[c.categoryName]) {
        categoriesMap[c.categoryName] = [];
      }
      categoriesMap[c.categoryName].push(c);
    });

    let html = '<option value="">-- Choose a Course / Domain --</option>';
    for (const [catName, list] of Object.entries(categoriesMap)) {
      html += `<optgroup label="${catName}">`;
      list.forEach(c => {
        html += `<option value="${c.title}">${c.title} (${c.levelDisplay || c.level} - ${c.duration})</option>`;
      });
      html += `</optgroup>`;
    }
    html += '<option value="Other / General Career Counselling">Other / Career Counselling Guidance</option>';
    enquiryCourseSelect.innerHTML = html;
  }

  // Filter & Search Logic
  function getFilteredCourses() {
    if (typeof GTEC_COURSES === 'undefined') return [];

    return GTEC_COURSES.filter(course => {
      // Category match
      const matchCat = state.selectedCategory === 'all' || course.categoryKey === state.selectedCategory;
      
      // Level match
      const matchLevel = state.selectedLevel === 'all' || 
        (state.selectedLevel === 'Certificate' && course.level === 'Certificate') ||
        (state.selectedLevel === 'Diploma' && course.level === 'Diploma') ||
        (state.selectedLevel === 'Master' && course.level === 'Master') ||
        (state.selectedLevel === 'SAP Global' && course.level === 'SAP Global');

      // Search match (title, category, tools, tags)
      const query = state.searchQuery.trim().toLowerCase();
      const matchSearch = !query || 
        course.title.toLowerCase().includes(query) ||
        course.categoryName.toLowerCase().includes(query) ||
        (course.subCategory && course.subCategory.toLowerCase().includes(query)) ||
        (course.tools && course.tools.toLowerCase().includes(query)) ||
        (course.tags && course.tags.some(t => t.toLowerCase().includes(query)));

      return matchCat && matchLevel && matchSearch;
    });
  }

  // Render Course Cards
  function renderCourses() {
    const filtered = getFilteredCourses();
    const toShow = filtered.slice(0, state.visibleCount);

    if (courseCountBadge) {
      courseCountBadge.textContent = `Showing ${toShow.length} of ${filtered.length} Courses`;
    }

    if (filtered.length === 0) {
      coursesGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    const html = toShow.map((c, index) => {
      // Category badge color styling (high-contrast token system)
      let catBadgeClass = 'bg-[#EEF3FB] text-[#142B4D] border border-[#D5DFEC]';

      let levelBadgeClass = 'badge-level-certificate';
      if (c.level === 'Diploma') levelBadgeClass = 'badge-level-diploma';
      if (c.level === 'Master') levelBadgeClass = 'badge-level-master';
      if (c.level === 'SAP Global') levelBadgeClass = 'badge-level-sap';

      return `
        <div class="course-card group p-6 flex flex-col justify-between" data-course-id="${c.id}">
          <div>
            <!-- Top Badges -->
            <div class="flex items-center justify-between gap-2 mb-3.5">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full ${catBadgeClass}">
                ${c.badge}
              </span>
              <span class="badge-level ${levelBadgeClass}">
                ${c.levelDisplay || c.level}
              </span>
            </div>

            <!-- Course Title -->
            <h3 class="text-xl font-black text-[#142B4D] group-hover:text-[#1D4ED8] transition-colors line-clamp-2 mb-1.5 leading-snug">
              ${c.title}
            </h3>

            <!-- Sub Category / Specialization -->
            <p class="text-xs text-[#475569] mb-3.5 font-semibold">
              ${c.subCategory}
            </p>

            <!-- Tools & Software Covered (High Contrast Defined Box) -->
            <div class="mb-4 p-3.5 rounded-xl bg-[#EEF3FB] border border-[#BFDBFE] text-xs">
              <div class="flex items-center gap-1.5 text-[#1D4ED8] font-bold mb-1">
                <svg class="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Tools & Software Covered:</span>
              </div>
              <p class="text-[#142B4D] font-bold leading-relaxed">${c.tools}</p>
            </div>

            <!-- Duration & Mode -->
            <div class="grid grid-cols-2 gap-2 text-xs text-[#475569] mb-4 pt-2 border-t border-[#D5DFEC]">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Duration: <strong class="text-[#142B4D] font-bold">${c.duration}</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="truncate font-bold text-[#142B4D]">100% Practical Lab</span>
              </div>
            </div>

            <!-- Software Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${(c.toolsList || []).map(t => `
                <span class="text-[11px] font-bold bg-[#EEF3FB] text-[#1D4ED8] px-2.5 py-1 rounded-md border border-[#BFDBFE]">#${t}</span>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-4 border-t border-[#D5DFEC] flex items-center justify-between gap-2">
            <button 
              type="button" 
              class="view-details-btn text-sm font-bold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors flex items-center gap-1.5"
              data-id="${c.id}"
            >
              <span>View Syllabus</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <button 
              type="button" 
              class="quick-apply-btn btn-primary-blue text-xs font-bold px-4 py-2 shadow-sm transition-all"
              data-title="${c.title}"
            >
              Enquire ↗
            </button>
          </div>
        </div>
      `;
    }).join('');

    coursesGrid.innerHTML = html;
    if (window.lucide) {
      lucide.createIcons();
    }

    // Load More Visibility
    if (loadMoreBtn) {
      if (toShow.length >= filtered.length) {
        loadMoreBtn.classList.add('hidden');
      } else {
        loadMoreBtn.classList.remove('hidden');
      }
    }

    // Attach Event Listeners to rendered cards
    attachCardListeners();
  }

  // Attach card click handlers
  function attachCardListeners() {
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openCourseDetailModal(id);
      });
    });

    document.querySelectorAll('.quick-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        openEnquiryModal(title);
      });
    });
  }

  // Course Detail Modal
  function openCourseDetailModal(courseId) {
    if (typeof GTEC_COURSES === 'undefined') return;
    const course = GTEC_COURSES.find(c => c.id === courseId);
    if (!course) return;

    state.activeCourse = course;

    const highlightsList = course.highlights || [
      "100% Practical Hands-on Labs with individual workstation.",
      "Certified Expert Faculty with corporate industry experience.",
      "Dedicated Placement Cell with resume building & mock interviews.",
      "Globally Validated Certification verifiable online via QR code."
    ];

    courseModalBody.innerHTML = `
      <div class="p-6 md:p-8 text-[#142B4D]">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="text-xs font-bold px-3 py-1 bg-[#EEF3FB] text-[#142B4D] border border-[#D5DFEC] rounded-full">
                ${course.categoryName}
              </span>
              <span class="text-xs font-bold px-3 py-1 bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A] rounded-full">
                ${course.levelDisplay || course.level}
              </span>
              <span class="text-xs font-bold px-3 py-1 bg-[#EEF3FB] text-[#1D4ED8] border border-[#D5DFEC] rounded-full">
                Duration: ${course.duration}
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-[#142B4D] leading-tight">
              ${course.title}
            </h2>
            <p class="text-sm text-[#475569] mt-1 font-semibold">
              ${course.subCategory}
            </p>
          </div>
        </div>

        <!-- Tools & Software Covered (High Contrast Defined Box) -->
        <div class="my-5 p-4 rounded-2xl bg-[#EEF3FB] border border-[#D5DFEC]">
          <div class="flex items-center gap-2 text-[#1D4ED8] font-bold text-xs uppercase tracking-wider mb-2">
            <svg class="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Official Tools & Software Covered</span>
          </div>
          <p class="text-[#142B4D] font-bold text-base leading-snug">${course.tools}</p>
          <div class="flex flex-wrap gap-1.5 mt-2.5">
            ${(course.toolsList || []).map(t => `<span class="text-xs bg-white text-[#142B4D] border border-[#D5DFEC] px-2.5 py-0.5 rounded-lg font-semibold shadow-xs">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Course Quick Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 my-4 p-4 bg-[#EEF3FB] rounded-2xl border border-[#D5DFEC]">
          <div>
            <span class="text-xs text-[#475569] font-medium block">Duration</span>
            <span class="text-sm font-bold text-[#142B4D]">${course.duration}</span>
          </div>
          <div>
            <span class="text-xs text-[#475569] font-medium block">Training Mode</span>
            <span class="text-sm font-bold text-[#142B4D]">${course.mode}</span>
          </div>
          <div>
            <span class="text-xs text-[#475569] font-medium block">Certification</span>
            <span class="text-sm font-bold text-[#142B4D]">${course.certified}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-[#475569] text-sm leading-relaxed mb-5">
          ${course.description || ''}
        </p>

        <!-- Highlights & What You Will Learn -->
        <div class="space-y-3 text-[#475569] text-sm leading-relaxed mb-6">
          <h4 class="font-bold text-[#142B4D] text-base">Key Program Highlights:</h4>
          <ul class="space-y-2">
            ${highlightsList.map(h => `
              <li class="flex items-start gap-2.5">
                <svg class="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="text-[#142B4D] font-medium">${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Action Buttons in Modal -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#D5DFEC]">
          <button 
            type="button" 
            class="modal-enquire-btn flex-1 btn-primary-blue text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md text-center justify-center"
            data-title="${course.title}"
          >
            Enquire for Admission
          </button>
          <a 
            href="https://wa.me/919995955501?text=${encodeURIComponent(`Hi G-TEC Ottapalam, I am interested in the "${course.title}" course (${course.tools}). Please share fee structure and next batch timings.`)}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md text-center"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
            <span>Ask via WhatsApp</span>
          </a>
        </div>
      </div>
    `;

    courseModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook up internal modal enquire button
    const modalEnquireBtn = courseModalBody.querySelector('.modal-enquire-btn');
    if (modalEnquireBtn) {
      modalEnquireBtn.addEventListener('click', () => {
        closeCourseDetailModal();
        openEnquiryModal(course.title);
      });
    }
  }

  function closeCourseDetailModal() {
    courseModal.classList.remove('active');
    document.body.style.overflow = '';
    state.activeCourse = null;
  }

  // Enquiry Modal
  function openEnquiryModal(preselectedCourse = '') {
    if (enquiryCourseSelect && preselectedCourse) {
      // Find if course exists in options or add it temporarily
      let found = false;
      for (let i = 0; i < enquiryCourseSelect.options.length; i++) {
        if (enquiryCourseSelect.options[i].value.toLowerCase().includes(preselectedCourse.toLowerCase())) {
          enquiryCourseSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        const opt = new Option(preselectedCourse, preselectedCourse, true, true);
        enquiryCourseSelect.add(opt);
      }
    }

    enquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEnquiryModal() {
    enquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Enquiry Form Submit (WhatsApp + Notification)
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('enquiry-name').value.trim();
      const phone = document.getElementById('enquiry-phone').value.trim();
      const email = document.getElementById('enquiry-email').value.trim();
      const course = enquiryCourseSelect.value || 'General Enquiry';
      const batch = document.getElementById('enquiry-batch').value;
      const message = document.getElementById('enquiry-message').value.trim();

      // Format WhatsApp Message
      const waText = `*🎓 G-TEC Ottapalam Admission Enquiry*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email || 'Not provided'}\n` +
        `📚 *Course:* ${course}\n` +
        `⏰ *Preferred Batch:* ${batch}\n` +
        `💬 *Message:* ${message || 'Please send course details and admission criteria.'}\n\n` +
        `_Source: G-TEC Ottapalam Website_`;

      const waUrl = `https://wa.me/919995955501?text=${encodeURIComponent(waText)}`;

      // Fire festive celebration confetti (armor-bd style micro-interaction)
      if (typeof confetti !== 'undefined') {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#FBBF24', '#F59E0B', '#3B82F6', '#10B981']
        });
      }

      // Show feedback & open WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
        closeEnquiryModal();
        enquiryForm.reset();
      }, 500);
    });
  }

  // Event Listeners for Filters
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.selectedCategory = tab.getAttribute('data-category');
      state.visibleCount = 24;
      renderCourses();
    });
  });

  levelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      levelChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.selectedLevel = chip.getAttribute('data-level');
      state.visibleCount = 24;
      renderCourses();
    });
  });

  // Search Input Handlers
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        state.visibleCount = 24;
        renderCourses();

        if (clearSearchBtn) {
          if (e.target.value.length > 0) {
            clearSearchBtn.classList.remove('hidden');
          } else {
            clearSearchBtn.classList.add('hidden');
          }
        }
      }, 250);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderCourses();
      searchInput.focus();
    });
  }

  // Hero Search Bar Handlers
  if (heroSearchBtn && heroSearchInput) {
    const handleHeroSearch = () => {
      const q = heroSearchInput.value.trim();
      if (q) {
        state.searchQuery = q;
        if (searchInput) searchInput.value = q;
        if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
        renderCourses();

        // Smooth scroll to courses section
        const coursesSec = document.getElementById('courses-section');
        if (coursesSec) {
          coursesSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    heroSearchBtn.addEventListener('click', handleHeroSearch);
    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleHeroSearch();
    });
  }

  // Quick Tags in Hero (clicking "Python", "Tally Prime", etc.)
  document.querySelectorAll('.hero-quick-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const val = e.currentTarget.getAttribute('data-query');
      if (heroSearchInput) heroSearchInput.value = val;
      if (searchInput) searchInput.value = val;
      state.searchQuery = val;
      renderCourses();
      const coursesSec = document.getElementById('courses-section');
      if (coursesSec) {
        coursesSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.visibleCount += state.pageSize;
      renderCourses();
    });
  }

  // Modal Closures
  if (courseModalClose) courseModalClose.addEventListener('click', closeCourseDetailModal);
  if (enquiryModalClose) enquiryModalClose.addEventListener('click', closeEnquiryModal);

  [courseModal, enquiryModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeCourseDetailModal();
          closeEnquiryModal();
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCourseDetailModal();
      closeEnquiryModal();
    }
  });

  // Open Enquiry buttons globally
  document.querySelectorAll('.trigger-enquiry-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      openEnquiryModal();
    });
  });

  // Mobile Menu Drawer Handlers
  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('translate-x-full');
    });
  }

  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('translate-x-full');
    });
  }

  // Animated Numbers Counter on Scroll
  const statNumbers = document.querySelectorAll('.counter-number');
  let animatedStats = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          const updateNumber = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeOut;

            counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = target;
            }
          };

          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    countObserver.observe(statsSection);
  }

  // ==========================================================================
  // SCROLLYTELLING ENGINE (Inspired by armor-bd.com)
  // Lenis Smooth Scroll + GSAP ScrollTrigger Pinned Scrubbing + Cursor Follower
  // ==========================================================================

  function initScrollytelling() {
    // 1. Lenis Smooth Scroll Setup
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
      try {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0
        });
        window.lenis = lenis;

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }
      } catch (err) {
        console.warn('Lenis initialization notice:', err);
      }
    }

    // 2. Interactive Top Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress-bar');
    const updateProgressBar = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();

    // 3. Ambient Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let curX = mouseX;
      let curY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });

      const animateCursor = () => {
        curX += (mouseX - curX) * 0.15;
        curY += (mouseY - curY) * 0.15;
        cursorGlow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
      };
      requestAnimationFrame(animateCursor);
    }

    // 4. Act 1: Hero Device Scale on Scroll
    const laptopFrame = document.querySelector('.laptop-frame');
    const heroBackdrop = document.querySelector('.hero-backdrop-typography');
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && laptopFrame) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      })
      .to(laptopFrame, {
        scale: 1.05,
        y: 40,
        ease: 'none'
      })
      .to(heroBackdrop, {
        letterSpacing: '0.22em',
        opacity: 0,
        y: -60,
        ease: 'none'
      }, '<');
    }

    // 5. Act 2: Direct Sideways Scroll Student Transformation Carousel
    const journeyTrack = document.getElementById('journey-scroll-track');
    const journeyPrevBtn = document.getElementById('journey-prev-btn');
    const journeyNextBtn = document.getElementById('journey-next-btn');
    const stepIndicator = document.getElementById('story-step-indicator');
    const dots = [
      document.getElementById('dot-1'),
      document.getElementById('dot-2'),
      document.getElementById('dot-3')
    ];

    if (journeyTrack) {
      function getActiveSlideIndex() {
        const scrollLeft = journeyTrack.scrollLeft;
        const slideWidth = journeyTrack.clientWidth;
        if (!slideWidth) return 0;
        return Math.min(2, Math.max(0, Math.round(scrollLeft / slideWidth)));
      }

      function updateJourneyUI(index) {
        if (stepIndicator) {
          stepIndicator.textContent = `0${index + 1}`;
        }

        dots.forEach((dot, idx) => {
          if (dot) {
            if (idx === index) {
              dot.className = 'w-8 h-2.5 rounded-full bg-amber-300 shadow-md transition-all duration-300 cursor-pointer';
            } else {
              dot.className = 'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer';
            }
          }
        });

        if (journeyPrevBtn) {
          journeyPrevBtn.disabled = index === 0;
          journeyPrevBtn.style.opacity = index === 0 ? '0.35' : '1';
        }
        if (journeyNextBtn) {
          journeyNextBtn.disabled = index === 2;
          journeyNextBtn.style.opacity = index === 2 ? '0.35' : '1';
        }
      }

      function scrollToSlide(index) {
        const slideWidth = journeyTrack.clientWidth;
        journeyTrack.scrollTo({
          left: index * slideWidth,
          behavior: 'smooth'
        });
      }

      // Prev & Next Buttons
      if (journeyPrevBtn) {
        journeyPrevBtn.addEventListener('click', () => {
          const current = getActiveSlideIndex();
          if (current > 0) scrollToSlide(current - 1);
        });
      }

      if (journeyNextBtn) {
        journeyNextBtn.addEventListener('click', () => {
          const current = getActiveSlideIndex();
          if (current < 2) scrollToSlide(current + 1);
        });
      }

      // Dot Click Handlers
      dots.forEach((dot, idx) => {
        if (dot) {
          dot.addEventListener('click', () => {
            scrollToSlide(idx);
          });
        }
      });

      // Track Scroll Listener
      let journeyScrollTimer;
      journeyTrack.addEventListener('scroll', () => {
        clearTimeout(journeyScrollTimer);
        journeyScrollTimer = setTimeout(() => {
          const activeIndex = getActiveSlideIndex();
          updateJourneyUI(activeIndex);
        }, 40);
      }, { passive: true });

      // Mouse drag-to-scroll interaction
      let isJourneyDown = false;
      let journeyStartX = 0;
      let journeyScrollLeft = 0;

      journeyTrack.addEventListener('mousedown', (e) => {
        isJourneyDown = true;
        journeyTrack.classList.add('grabbing');
        journeyStartX = e.pageX - journeyTrack.offsetLeft;
        journeyScrollLeft = journeyTrack.scrollLeft;
      });

      journeyTrack.addEventListener('mouseleave', () => {
        isJourneyDown = false;
        journeyTrack.classList.remove('grabbing');
      });

      journeyTrack.addEventListener('mouseup', () => {
        isJourneyDown = false;
        journeyTrack.classList.remove('grabbing');
      });

      journeyTrack.addEventListener('mousemove', (e) => {
        if (!isJourneyDown) return;
        e.preventDefault();
        const x = e.pageX - journeyTrack.offsetLeft;
        const walk = (x - journeyStartX) * 1.5;
        journeyTrack.scrollLeft = journeyScrollLeft - walk;
      });

      // Wheel support: smoothly glide slides when mouse wheeling, but allow vertical escape at ends
      let isJourneyWheeling = false;
      journeyTrack.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Native horizontal scroll
        
        const isAtStart = journeyTrack.scrollLeft <= 10;
        const isAtEnd = journeyTrack.scrollLeft + journeyTrack.clientWidth >= journeyTrack.scrollWidth - 10;
        
        // Let user scroll vertically past section if at boundaries
        if ((e.deltaY < 0 && isAtStart) || (e.deltaY > 0 && isAtEnd)) {
          return;
        }

        e.preventDefault();
        if (isJourneyWheeling) return;
        isJourneyWheeling = true;

        const current = getActiveSlideIndex();
        if (e.deltaY > 0 && current < 2) {
          scrollToSlide(current + 1);
        } else if (e.deltaY < 0 && current > 0) {
          scrollToSlide(current - 1);
        }

        setTimeout(() => {
          isJourneyWheeling = false;
        }, 500);
      }, { passive: false });

      // Initialize UI state
      updateJourneyUI(0);
    }

    // 6. Act 3: Direct Sideways Scroll Stream Carousel (Arrow Controls + Drag-to-Scroll)
    const streamTrack = document.getElementById('stream-carousel-track');
    const scrollLeftBtn = document.getElementById('stream-scroll-left');
    const scrollRightBtn = document.getElementById('stream-scroll-right');

    if (streamTrack) {
      // Arrow button click handlers
      if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
          streamTrack.scrollBy({ left: -390, behavior: 'smooth' });
        });
      }
      if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
          streamTrack.scrollBy({ left: 390, behavior: 'smooth' });
        });
      }

      // Mouse drag-to-scroll interaction
      let isDown = false;
      let startX;
      let scrollLeft;

      streamTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        streamTrack.classList.add('grabbing');
        startX = e.pageX - streamTrack.offsetLeft;
        scrollLeft = streamTrack.scrollLeft;
      });

      streamTrack.addEventListener('mouseleave', () => {
        isDown = false;
        streamTrack.classList.remove('grabbing');
      });

      streamTrack.addEventListener('mouseup', () => {
        isDown = false;
        streamTrack.classList.remove('grabbing');
      });

      streamTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - streamTrack.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag scroll multiplier
        streamTrack.scrollLeft = scrollLeft - walk;
      });

      // Hook up "Explore Stream ↗" buttons on cards to auto-filter and smooth-scroll
      document.querySelectorAll('.explore-stream-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const catKey = btn.getAttribute('data-category');
          if (catKey) {
            const targetTab = document.querySelector(`.category-tab-btn[data-category="${catKey}"]`);
            if (targetTab) {
              targetTab.click();
            }
            const coursesSec = document.getElementById('courses-section');
            if (coursesSec) {
              coursesSec.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }
  }

  // ==========================================================================
  // CINEMATIC 3D LAPTOP INTRO & HERO REVEAL CONTROLLER (ARMOR-BD INSPIRATION)
  // ==========================================================================
  function initCinematicLaptopIntro() {
    const introStage = document.getElementById('cinematic-intro-stage');
    const skipBtn = document.getElementById('skip-intro-btn');
    const replayBtn = document.getElementById('replay-intro-btn');
    
    if (!introStage) return;

    if (typeof gsap === 'undefined') {
      introStage.style.display = 'none';
      return;
    }

    // Reference real hero elements to coordinate the Scene 4 reveal
    const heroElements = {
      announcement: document.getElementById('announcement-bar'),
      header: document.getElementById('main-header'),
      headline: document.querySelector('#hero h1'),
      subtitle: document.querySelector('#hero p.text-blue-100'),
      searchPill: document.querySelector('#hero .hero-search-pill'),
      studentPhoto: document.querySelector('#hero .relative.z-10.w-64'),
      cardLeft: document.querySelector('#hero .floating-card-left'),
      cardRight: document.querySelector('#hero .floating-card-right'),
      backdropText: document.querySelector('.hero-backdrop-typography')
    };

    function ensureHeroVisible() {
      gsap.set([
        heroElements.announcement, 
        heroElements.header, 
        heroElements.headline, 
        heroElements.subtitle, 
        heroElements.searchPill, 
        heroElements.studentPhoto, 
        heroElements.cardLeft, 
        heroElements.cardRight
      ].filter(Boolean), { 
        clearProps: 'all' 
      });
    }

    // Check if intro was already played in this browser session
    let introAlreadyPlayed = false;
    try {
      introAlreadyPlayed = sessionStorage.getItem('gtec_intro_played') === 'true';
    } catch (e) {}

    // IF ALREADY PLAYED: Skip loading animation on refresh, show hero immediately
    if (introAlreadyPlayed) {
      introStage.classList.add('intro-hidden');
      introStage.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      ensureHeroVisible();

      // Setup Replay button handler so user can still manually watch whenever they want
      if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          if (document.body) document.body.scrollTop = 0;
          document.documentElement.classList.remove('intro-skip');
          buildAndPlayIntro();
        });
      }
      return;
    }

    // DOM Elements inside the 3D Laptop Rig
    const laptopRig = document.getElementById('laptop-3d-rig');
    const laptopLid = document.getElementById('laptop-lid');
    const floorGlow = document.getElementById('laptop-floor-glow');
    const notchLed = document.getElementById('notch-led');
    const screenLogo = document.getElementById('screen-logo-img');
    const brandHalo = document.getElementById('brand-logo-halo');
    const screenTagline = document.getElementById('screen-brand-tagline');
    const powerLine = document.getElementById('system-power-line');
    const screenCenterBrand = document.getElementById('screen-center-brand');
    const chassisBase = document.getElementById('laptop-base');
    const screenBezel = document.getElementById('laptop-screen-bezel');

    let introTL = null;
    let isIntroPlaying = false;

    // Strict scroll enforcement so viewport can never drift or jump during intro
    const enforceHeroLock = () => {
      if (isIntroPlaying && (window.scrollY !== 0 || document.documentElement.scrollTop !== 0)) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
    };

    function buildAndPlayIntro() {
      isIntroPlaying = true;
      window.addEventListener('scroll', enforceHeroLock, { passive: true });

      // Ensure browser locks to top hero section and disables old scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;

      // Freeze scroll during cinematic sequence
      document.body.classList.add('overflow-hidden');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.stop();
      }

      // Clean previous state
      if (introTL) introTL.kill();

      // Reset intro stage
      introStage.classList.remove('intro-hidden');
      introStage.style.display = 'flex';
      introStage.style.opacity = '1';

      // Set initial hidden positions for real hero elements
      gsap.set([heroElements.announcement, heroElements.header].filter(Boolean), { y: -45, opacity: 0 });
      gsap.set([heroElements.headline, heroElements.subtitle, heroElements.searchPill].filter(Boolean), { y: 35, opacity: 0 });
      if (heroElements.studentPhoto) gsap.set(heroElements.studentPhoto, { scale: 0.82, opacity: 0 });
      if (heroElements.cardLeft) gsap.set(heroElements.cardLeft, { x: -45, scale: 0.9, opacity: 0 });
      if (heroElements.cardRight) gsap.set(heroElements.cardRight, { x: 45, scale: 0.9, opacity: 0 });

      // SCENE 1: Closed Laptop in Studio
      gsap.set(laptopRig, { 
        rotateX: 18, 
        rotateY: -3, 
        rotateZ: 0, 
        scale: 0.92,
        y: 15,
        z: 0,
        opacity: 1
      });
      gsap.set(laptopLid, { rotateX: -90 }); // Completely closed on base
      gsap.set([chassisBase, screenBezel], { opacity: 1 });
      gsap.set(floorGlow, { opacity: 0 });
      gsap.set(notchLed, { opacity: 0 });
      gsap.set(screenLogo, { opacity: 0, scale: 0.82, filter: 'brightness(2.2) blur(8px)' });
      gsap.set(brandHalo, { opacity: 0, scale: 0.8 });
      gsap.set(screenTagline, { opacity: 0, y: 10 });
      gsap.set(powerLine, { width: '0%' });
      gsap.set(screenCenterBrand, { y: 0, scale: 1, opacity: 1 });

      // Create Master Intro Timeline
      introTL = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: finishIntro
      });

      // SCENE 1 — CAMERA APPROACH (0.0s - 0.7s)
      introTL.to(laptopRig, {
        scale: 1.0,
        y: 10,
        duration: 0.7,
        ease: 'power1.out'
      });

      // SCENE 2 — LAPTOP OPENS NATURAL HINGE ROTATION (0.7s - 1.95s)
      // Base stays firmly anchored! Lid rotates around hinge.
      introTL.to(laptopLid, {
        rotateX: 0, // Opens to vertical display angle
        duration: 1.25,
        ease: 'power3.inOut'
      }, '+=0.05');

      // Camera gently levels out to frame the opening screen
      introTL.to(laptopRig, {
        rotateX: 10,
        rotateY: 0,
        y: 5,
        duration: 1.25,
        ease: 'power2.out'
      }, '<');

      // As lid passes 25 degrees, screen backlight glow ignites
      introTL.to(notchLed, {
        opacity: 1,
        duration: 0.35
      }, '<+=0.45');

      introTL.to(floorGlow, {
        opacity: 0.8,
        duration: 0.8,
        ease: 'power2.out'
      }, '<');

      // SCENE 3 — G-TEC LOGO REVEAL (1.95s - 2.85s)
      introTL.to(screenLogo, {
        opacity: 1,
        scale: 1,
        filter: 'brightness(1) blur(0px)',
        duration: 0.75,
        ease: 'power2.out'
      }, '-=0.25');

      introTL.to(brandHalo, {
        opacity: 0.85,
        scale: 1.2,
        duration: 0.7,
        ease: 'power2.out'
      }, '<');

      introTL.to(screenTagline, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.35');

      introTL.to(powerLine, {
        width: '100%',
        duration: 0.65,
        ease: 'power1.inOut'
      }, '-=0.4');

      // Restrained pause to admire brand presentation
      introTL.to({}, { duration: 0.4 });

      // SCENE 4 — TRANSFORM INTO THE REAL HERO (2.85s - 4.0s)
      // 1. Camera moves into display: scale expands screen to fill viewport
      introTL.to(laptopRig, {
        scale: 5.4,
        rotateX: 0,
        rotateY: 0,
        y: 70,
        z: 400,
        duration: 1.15,
        ease: 'expo.inOut'
      });

      // 2. Bezels and base expand beyond viewport edges
      introTL.to([chassisBase, screenBezel, floorGlow], {
        opacity: 0,
        duration: 0.65,
        ease: 'power2.in'
      }, '<+=0.2');

      // 3. Logo transitions naturally into hero composition
      introTL.to(screenCenterBrand, {
        y: -140,
        scale: 0.65,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in'
      }, '<+=0.25');

      // CRITICAL: Guarantee viewport is locked to top (0, 0) before overlay fades
      introTL.add(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      }, '-=0.4');

      // 4. Intro stage dissolves seamlessly, revealing the real hero
      introTL.to(introStage, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          introStage.style.display = 'none';
          introStage.classList.add('intro-hidden');
        }
      }, '-=0.35');

      // 5. Full hero section UI elements blossom in
      introTL.to([heroElements.announcement, heroElements.header].filter(Boolean), {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.3');

      introTL.to([heroElements.headline, heroElements.subtitle, heroElements.searchPill].filter(Boolean), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.6');

      if (heroElements.studentPhoto) {
        introTL.to(heroElements.studentPhoto, {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.3)'
        }, '-=0.65');
      }

      if (heroElements.cardLeft && heroElements.cardRight) {
        introTL.to([heroElements.cardLeft, heroElements.cardRight], {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.2)'
        }, '-=0.55');
      }
    }

    function finishIntro() {
      isIntroPlaying = false;
      window.removeEventListener('scroll', enforceHeroLock);

      // Save to sessionStorage so refresh will not replay
      try {
        sessionStorage.setItem('gtec_intro_played', 'true');
      } catch (e) {}

      // Force viewport directly to top of hero section
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;

      introStage.classList.add('intro-hidden');
      introStage.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
      
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.start();
      }

      // Guarantee all hero elements are 100% active, visible, and responsive
      ensureHeroVisible();
    }

    // Skip handler
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          sessionStorage.setItem('gtec_intro_played', 'true');
        } catch (err) {}
        if (introTL) {
          introTL.progress(1);
        } else {
          finishIntro();
        }
      });
    }

    // Keyboard ESC key handler
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !introStage.classList.contains('intro-hidden')) {
        try {
          sessionStorage.setItem('gtec_intro_played', 'true');
        } catch (err) {}
        if (introTL) {
          introTL.progress(1);
        } else {
          finishIntro();
        }
      }
    });

    // Replay handler
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        document.documentElement.classList.remove('intro-skip');
        buildAndPlayIntro();
      });
    }

    // Start Intro on Load
    buildAndPlayIntro();
  }

  // Initialize all controllers
  populateEnquiryOptions();
  renderCourses();
  initScrollytelling();
  initCinematicLaptopIntro();
});

