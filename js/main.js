function getSiteData() {
    try {
        var saved = localStorage.getItem('siteData');
        if (saved) return JSON.parse(saved);
    } catch(e) {}
    return null;
}

function applySiteData() {
    var data = getSiteData();
    if (!data) return;

    if (data.profile) {
        var p = data.profile;
        if (p.name) {
            document.querySelectorAll('.nav-logo span, .footer-brand span').forEach(function(el) { el.textContent = p.name; });
        }
        var badge = document.querySelector('.hero-badge');
        if (badge && p.badge) badge.textContent = p.badge;

        if (p.headline) {
            var title = document.querySelector('.hero-title');
            if (title) {
                var parts = p.headline.split('|');
                if (parts.length === 3) {
                    title.innerHTML = parts[0] + '<span class="gradient-text">' + parts[1] + '</span>' + parts[2];
                } else {
                    title.textContent = p.headline;
                }
            }
        }
        var sub = document.querySelector('.hero-subtitle');
        if (sub && p.subtitle) sub.textContent = p.subtitle;

        var aboutTitle = document.querySelector('.about-content .section-title');
        if (aboutTitle && p.aboutTitle) aboutTitle.innerHTML = p.aboutTitle;

        var aboutTexts = document.querySelectorAll('.about-text');
        if (p.aboutText1 && aboutTexts[0]) aboutTexts[0].textContent = p.aboutText1;
        if (p.aboutText2 && aboutTexts[1]) aboutTexts[1].textContent = p.aboutText2;
    }

    if (data.stats) {
        var sn = document.querySelectorAll('.stat-number');
        var sl = document.querySelectorAll('.stat-label');
        if (sn[0]) sn[0].dataset.target = data.stats.stat1Value || 0;
        if (sn[1]) sn[1].dataset.target = data.stats.stat2Value || 0;
        if (sn[2]) sn[2].dataset.target = data.stats.stat3Value || 0;
        if (sl[0]) sl[0].textContent = data.stats.stat1Label || '';
        if (sl[1]) sl[1].textContent = data.stats.stat2Label || '';
        if (sl[2]) sl[2].textContent = data.stats.stat3Label || '';
    }

    if (data.contact) {
        var c = data.contact;
        var cp = document.querySelectorAll('.contact-card p');
        if (c.email && cp[0]) cp[0].textContent = c.email;
        if (c.location && cp[1]) cp[1].textContent = c.location;
        if (c.hours && cp[2]) cp[2].textContent = c.hours;
        var slinks = document.querySelectorAll('.social-link');
        if (c.github && slinks[0]) slinks[0].href = c.github;
        if (c.linkedin && slinks[1]) slinks[1].href = c.linkedin;
        if (c.twitter && slinks[2]) slinks[2].href = c.twitter;
        if (c.discord && slinks[3]) slinks[3].href = c.discord;
    }

    if (data.apps && data.apps.length > 0) {
        var grid = document.getElementById('appsGrid');
        if (grid) {
            grid.innerHTML = '';
            var catLabels = { web:'Web App', mobile:'Mobile App', desktop:'Desktop App', ai:'AI / ML' };
            var badgeHTML = { 'new':'<span class="app-badge badge-new">Nowa</span>', 'popular':'<span class="app-badge badge-popular">Popularna</span>', 'beta':'<span class="app-badge badge-beta">Beta</span>' };

            data.apps.forEach(function(app) {
                var techTags = '';
                if (app.tech) app.tech.forEach(function(t) { techTags += '<span class="tech-tag">' + t + '</span>'; });

                var badge = (app.badge && app.badge !== 'none') ? (badgeHTML[app.badge] || '') : '';
                var demoLink = app.demo ? '<a href="' + app.demo + '" class="overlay-btn" target="_blank"><i class="fas fa-eye"></i> Demo</a>' : '';
                var githubLink = app.github ? '<a href="' + app.github + '" class="overlay-btn" target="_blank"><i class="fab fa-github"></i> Kod</a>' : '';
                var playLink = app.playstore ? '<a href="' + app.playstore + '" class="overlay-btn" target="_blank"><i class="fab fa-google-play"></i> Play</a>' : '';
                var appStoreLink = app.appstore ? '<a href="' + app.appstore + '" class="overlay-btn" target="_blank"><i class="fab fa-app-store"></i> iOS</a>' : '';
                var ratingHtml = app.rating ? '<span><i class="fas fa-star"></i> ' + app.rating + '</span>' : '';
                var downloadsHtml = app.downloads ? '<span><i class="fas fa-download"></i> ' + app.downloads + '</span>' : '';

                var card = document.createElement('div');
                card.className = 'app-card';
                card.dataset.category = app.category;
                card.innerHTML =
                    '<div class="app-image">' +
                        '<div class="app-placeholder" style="background:' + app.color + ';"><i class="' + app.icon + '"></i></div>' +
                        '<div class="app-overlay">' + demoLink + githubLink + playLink + appStoreLink + '</div>' +
                        badge +
                    '</div>' +
                    '<div class="app-content">' +
                        '<div class="app-category">' + (catLabels[app.category] || app.category) + '</div>' +
                        '<h3 class="app-title">' + app.name + '</h3>' +
                        '<p class="app-desc">' + app.desc + '</p>' +
                        '<div class="app-tech">' + techTags + '</div>' +
                        '<div class="app-footer">' +
                            '<div class="app-stats-row">' + ratingHtml + downloadsHtml + '</div>' +
                            (app.demo ? '<a href="' + app.demo + '" class="app-link" target="_blank">Szczegóły <i class="fas fa-arrow-right"></i></a>' : '') +
                        '</div>' +
                    '</div>';
                grid.appendChild(card);
            });
            initFilters();
        }
    }
    updateFilterButtons();
}

function updateFilterButtons() {
    var data = getSiteData();
    if (!data || !data.apps || data.apps.length === 0) return;
    var cats = ['all'];
    data.apps.forEach(function(app) { if (cats.indexOf(app.category) === -1) cats.push(app.category); });
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.style.display = (btn.dataset.filter === 'all' || cats.indexOf(btn.dataset.filter) !== -1) ? '' : 'none';
    });
}

function createParticles() {
    var container = document.getElementById('particles');
    var count = window.innerWidth < 768 ? 20 : 50;
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.classList.add('particle');
        var size = Math.random() * 4 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 20 + 10) + 's';
        p.style.animationDelay = (Math.random() * 20) + 's';
        p.style.opacity = Math.random() * 0.4 + 0.1;
        var colors = ['#6366f1','#ec4899','#06b6d4','#8b5cf6','#10b981'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(p);
    }
}
createParticles();

var navbar = document.getElementById('navbar');
var navToggle = document.getElementById('navToggle');
var navMenu = document.getElementById('navMenu');
var navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function updateActiveNav() {
    var sections = document.querySelectorAll('section[id], .hero');
    var scrollPos = window.scrollY + 150;
    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

function initFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        var newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            newBtn.classList.add('active');
            var filter = newBtn.dataset.filter;
            document.querySelectorAll('.app-card').forEach(function(card, index) {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease ' + (index * 0.1) + 's both';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
initFilters();

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function(counter) {
        var target = parseInt(counter.dataset.target) || 0;
        var duration = 2000;
        var increment = target / (duration / 16);
        var current = 0;
        function update() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.textContent = target >= 1000 ? (target/1000).toFixed(1)+'k' : target.toLocaleString();
            }
        }
        update();
    });
}

function revealOnScroll() {
    var elements = document.querySelectorAll('.app-card, .tech-item, .contact-card, .about-content, .about-image, .section-header');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(function(el) { el.classList.add('reveal'); observer.observe(el); });
}

var heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    var co = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) { if (entry.isIntersecting) { animateCounters(); co.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    co.observe(heroStats);
}

var scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', function() { scrollTopBtn.classList.toggle('visible', window.scrollY > 500); });
scrollTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

var contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Wysłano!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; contactForm.reset(); }, 2500);
    }, 1500);
});

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Inline Edit Mode
var editMode = false;
var editBar = null;

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        editMode = !editMode;
        toggleEditMode();
    }
});

function toggleEditMode() {
    if (editMode) {
        editBar = document.createElement('div');
        editBar.style.cssText = 'position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 24px;text-align:center;z-index:99999;font-family:Inter,sans-serif;font-size:0.9rem;font-weight:600;display:flex;align-items:center;justify-content:center;gap:16px;';
        editBar.innerHTML = '✏️ TRYB EDYCJI - Klikaj na teksty! <button onclick="saveInlineEdits()" style="padding:8px 20px;background:white;color:#6366f1;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;">💾 Zapisz</button> <button onclick="toggleEditModeOff()" style="padding:8px 20px;background:rgba(255,255,255,0.2);color:white;border:1px solid rgba(255,255,255,0.3);border-radius:8px;font-weight:600;cursor:pointer;font-family:inherit;">✕ Zamknij</button>';
        document.body.prepend(editBar);
        document.body.style.paddingTop = '52px';
        var sel = '.hero-badge,.hero-title,.hero-subtitle,.section-title,.section-desc,.section-tag,.app-title,.app-desc,.app-category,.about-text,.highlight span,.contact-card h3,.contact-card p,.stat-label';
        document.querySelectorAll(sel).forEach(function(el) {
            el.contentEditable = true;
            el.style.outline = '2px dashed rgba(99,102,241,0.4)';
            el.style.outlineOffset = '4px';
            el.style.cursor = 'text';
        });
    } else {
        if (editBar) editBar.remove();
        document.body.style.paddingTop = '';
        document.querySelectorAll('[contenteditable="true"]').forEach(function(el) {
            el.contentEditable = false;
            el.style.outline = '';
            el.style.outlineOffset = '';
            el.style.cursor = '';
        });
    }
}

function toggleEditModeOff() { editMode = false; toggleEditMode(); }

function saveInlineEdits() {
    var data = getSiteData() || {};
    if (!data.profile) data.profile = {};
    var badge = document.querySelector('.hero-badge');
    if (badge) data.profile.badge = badge.textContent;
    var title = document.querySelector('.hero-title');
    if (title) data.profile.headline = title.textContent;
    var subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) data.profile.subtitle = subtitle.textContent;
    var aboutTitle = document.querySelector('.about-content .section-title');
    if (aboutTitle) data.profile.aboutTitle = aboutTitle.innerHTML;
    var aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts[0]) data.profile.aboutText1 = aboutTexts[0].textContent;
    if (aboutTexts[1]) data.profile.aboutText2 = aboutTexts[1].textContent;
    localStorage.setItem('siteData', JSON.stringify(data));
    var notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:16px 24px;background:linear-gradient(135deg,#10b981,#059669);color:white;border-radius:12px;font-family:Inter,sans-serif;font-weight:600;z-index:99999;box-shadow:0 10px 40px rgba(0,0,0,0.3);';
    notif.textContent = '✅ Zmiany zapisane!';
    document.body.appendChild(notif);
    setTimeout(function() { notif.remove(); }, 2500);
}

applySiteData();
revealOnScroll();