function getData() {
    var defaults = {
        profile: { name:'DevApps', role:'', badge:'🚀 Witaj w moim świecie aplikacji', headline:'Tworzę |nowoczesne| aplikacje', subtitle:'Projektuję i rozwijam aplikacje webowe, mobilne i desktopowe. Sprawdź moje projekty i przekonaj się sam.', aboutTitle:'Pasjonat technologii i tworzenia', aboutText1:'', aboutText2:'' },
        apps: [],
        contact: { email:'', location:'', hours:'', github:'', linkedin:'', twitter:'', discord:'' },
        stats: { stat1Value:12, stat1Label:'Projektów', stat2Value:5000, stat2Label:'Użytkowników', stat3Value:3, stat3Label:'Lata doświadczenia' }
    };
    try {
        var saved = localStorage.getItem('siteData');
        if (saved) {
            var parsed = JSON.parse(saved);
            return {
                profile: Object.assign({}, defaults.profile, parsed.profile || {}),
                apps: parsed.apps || [],
                contact: Object.assign({}, defaults.contact, parsed.contact || {}),
                stats: Object.assign({}, defaults.stats, parsed.stats || {})
            };
        }
    } catch(e) {}
    return defaults;
}

function saveData(data) { localStorage.setItem('siteData', JSON.stringify(data)); }

function showPage(pageId) {
    document.querySelectorAll('.admin-page').forEach(function(p) { p.classList.remove('active'); });
    var target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    document.querySelectorAll('.sidebar-btn').forEach(function(b) {
        b.classList.remove('active');
        var onclick = b.getAttribute('onclick');
        if (onclick && onclick.indexOf(pageId) !== -1) b.classList.add('active');
    });
    if (pageId === 'profile') loadProfile();
    if (pageId === 'apps') loadAppsList();
    if (pageId === 'contact-settings') loadContact();
    if (pageId === 'stats-settings') loadStats();
    if (pageId === 'dashboard') loadDashboard();
    if (pageId === 'add-app' && !document.getElementById('editingAppId').value) clearAppForm();
}

function showToast(message, type) {
    var toast = document.getElementById('toast');
    var icons = { success:'fas fa-check-circle', error:'fas fa-exclamation-circle', info:'fas fa-info-circle' };
    toast.className = 'toast toast-' + (type || 'success');
    toast.innerHTML = '<i class="' + icons[type||'success'] + '"></i> ' + message;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

function loadDashboard() {
    var data = getData();
    document.getElementById('dashAppCount').textContent = data.apps.length;
    document.getElementById('dashProfileStatus').textContent = data.profile.name ? '✅' : '❌';
    document.getElementById('dashContactStatus').textContent = data.contact.email ? '✅' : '❌';
}

function loadProfile() {
    var data = getData();
    document.getElementById('profileName').value = data.profile.name || '';
    document.getElementById('profileRole').value = data.profile.role || '';
    document.getElementById('profileBadge').value = data.profile.badge || '';
    document.getElementById('profileHeadline').value = data.profile.headline || '';
    document.getElementById('profileSubtitle').value = data.profile.subtitle || '';
    document.getElementById('aboutTitle').value = data.profile.aboutTitle || '';
    document.getElementById('aboutText1').value = data.profile.aboutText1 || '';
    document.getElementById('aboutText2').value = data.profile.aboutText2 || '';
}

function saveProfile() {
    var data = getData();
    data.profile.name = document.getElementById('profileName').value;
    data.profile.role = document.getElementById('profileRole').value;
    data.profile.badge = document.getElementById('profileBadge').value;
    data.profile.headline = document.getElementById('profileHeadline').value;
    data.profile.subtitle = document.getElementById('profileSubtitle').value;
    data.profile.aboutTitle = document.getElementById('aboutTitle').value;
    data.profile.aboutText1 = document.getElementById('aboutText1').value;
    data.profile.aboutText2 = document.getElementById('aboutText2').value;
    saveData(data);
    showToast('Profil zapisany!', 'success');
}

function loadContact() {
    var data = getData();
    document.getElementById('contactEmail').value = data.contact.email || '';
    document.getElementById('contactLocation').value = data.contact.location || '';
    document.getElementById('contactHours').value = data.contact.hours || '';
    document.getElementById('socialGithub').value = data.contact.github || '';
    document.getElementById('socialLinkedin').value = data.contact.linkedin || '';
    document.getElementById('socialTwitter').value = data.contact.twitter || '';
    document.getElementById('socialDiscord').value = data.contact.discord || '';
}

function saveContact() {
    var data = getData();
    data.contact.email = document.getElementById('contactEmail').value;
    data.contact.location = document.getElementById('contactLocation').value;
    data.contact.hours = document.getElementById('contactHours').value;
    data.contact.github = document.getElementById('socialGithub').value;
    data.contact.linkedin = document.getElementById('socialLinkedin').value;
    data.contact.twitter = document.getElementById('socialTwitter').value;
    data.contact.discord = document.getElementById('socialDiscord').value;
    saveData(data);
    showToast('Dane kontaktowe zapisane!', 'success');
}

function loadStats() {
    var data = getData();
    document.getElementById('stat1Value').value = data.stats.stat1Value || '';
    document.getElementById('stat1Label').value = data.stats.stat1Label || '';
    document.getElementById('stat2Value').value = data.stats.stat2Value || '';
    document.getElementById('stat2Label').value = data.stats.stat2Label || '';
    document.getElementById('stat3Value').value = data.stats.stat3Value || '';
    document.getElementById('stat3Label').value = data.stats.stat3Label || '';
}

function saveStats() {
    var data = getData();
    data.stats.stat1Value = parseInt(document.getElementById('stat1Value').value) || 0;
    data.stats.stat1Label = document.getElementById('stat1Label').value;
    data.stats.stat2Value = parseInt(document.getElementById('stat2Value').value) || 0;
    data.stats.stat2Label = document.getElementById('stat2Label').value;
    data.stats.stat3Value = parseInt(document.getElementById('stat3Value').value) || 0;
    data.stats.stat3Label = document.getElementById('stat3Label').value;
    saveData(data);
    showToast('Statystyki zapisane!', 'success');
}

var currentTags = [];
var selectedIcon = 'fas fa-code';
var selectedColor = 'linear-gradient(135deg, #667eea, #764ba2)';
var selectedBadge = 'none';

function loadAppsList() {
    var data = getData();
    var container = document.getElementById('appsList');
    if (data.apps.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#64748b;"><i class="fas fa-inbox" style="font-size:3rem;margin-bottom:16px;display:block;"></i><p>Nie masz jeszcze żadnych aplikacji.</p></div>';
        return;
    }
    var categoryLabels = { web:'Web App', mobile:'Mobile App', desktop:'Desktop App', ai:'AI / ML' };
    var html = '';
    data.apps.forEach(function(app, index) {
        html += '<div class="app-list-item"><div class="app-list-icon" style="background:' + app.color + '"><i class="' + app.icon + '"></i></div><div class="app-list-info"><div class="app-list-name">' + app.name + '</div><div class="app-list-cat">' + (categoryLabels[app.category]||app.category) + '</div></div><div class="app-list-actions"><button class="btn btn-sm btn-cancel" onclick="editApp(' + index + ')" title="Edytuj"><i class="fas fa-pen"></i></button><button class="btn btn-sm btn-danger" onclick="deleteApp(' + index + ')" title="Usuń"><i class="fas fa-trash"></i></button></div></div>';
    });
    container.innerHTML = html;
}

function selectIcon(el) {
    document.querySelectorAll('.icon-option').forEach(function(o) { o.classList.remove('selected'); });
    el.classList.add('selected');
    selectedIcon = el.dataset.icon;
    updatePreview();
}

function selectColor(el) {
    document.querySelectorAll('.color-option').forEach(function(o) { o.classList.remove('selected'); });
    el.classList.add('selected');
    selectedColor = el.dataset.color;
    updatePreview();
}

function selectBadge(el) {
    document.querySelectorAll('.badge-option').forEach(function(o) { o.classList.remove('selected'); });
    el.classList.add('selected');
    selectedBadge = el.dataset.badge;
}

document.getElementById('techInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var value = this.value.trim();
        if (value && currentTags.indexOf(value) === -1) {
            currentTags.push(value);
            renderTags();
            updatePreview();
        }
        this.value = '';
    }
});

function renderTags() {
    var container = document.getElementById('techTags');
    var input = document.getElementById('techInput');
    container.querySelectorAll('.tag-item').forEach(function(t) { t.remove(); });
    currentTags.forEach(function(tag, index) {
        var tagEl = document.createElement('div');
        tagEl.className = 'tag-item';
        tagEl.innerHTML = tag + ' <button class="tag-remove" onclick="removeTag(' + index + ')">×</button>';
        container.insertBefore(tagEl, input);
    });
}

function removeTag(index) {
    currentTags.splice(index, 1);
    renderTags();
    updatePreview();
}

function updatePreview() {
    var name = document.getElementById('appName').value || 'Nazwa aplikacji';
    var desc = document.getElementById('appDesc').value || 'Opis Twojej aplikacji pojawi się tutaj...';
    var cat = document.getElementById('appCategory');
    document.getElementById('previewTitle').textContent = name;
    document.getElementById('previewDesc').textContent = desc;
    document.getElementById('previewCat').textContent = cat.options[cat.selectedIndex].text;
    document.getElementById('previewImage').style.background = selectedColor;
    document.getElementById('previewImage').innerHTML = '<i class="' + selectedIcon + '"></i>';
    var tagsHtml = '';
    currentTags.forEach(function(tag) { tagsHtml += '<span class="preview-tag">' + tag + '</span>'; });
    document.getElementById('previewTags').innerHTML = tagsHtml;
}

function saveApp() {
    var name = document.getElementById('appName').value.trim();
    var desc = document.getElementById('appDesc').value.trim();
    if (!name) { showToast('Podaj nazwę aplikacji!', 'error'); return; }
    if (!desc) { showToast('Podaj opis aplikacji!', 'error'); return; }

    var app = {
        name: name,
        category: document.getElementById('appCategory').value,
        desc: desc,
        icon: selectedIcon,
        color: selectedColor,
        badge: selectedBadge,
        tech: currentTags.slice(),
        demo: document.getElementById('appDemo').value.trim(),
        github: document.getElementById('appGithub').value.trim(),
        playstore: document.getElementById('appPlayStore').value.trim(),
        appstore: document.getElementById('appAppStore').value.trim(),
        rating: document.getElementById('appRating').value || '',
        downloads: document.getElementById('appDownloads').value || ''
    };

    var data = getData();
    var editId = document.getElementById('editingAppId').value;
    if (editId !== '') {
        data.apps[parseInt(editId)] = app;
        showToast('Aplikacja zaktualizowana!', 'success');
    } else {
        data.apps.push(app);
        showToast('Aplikacja dodana!', 'success');
    }
    saveData(data);
    clearAppForm();
    showPage('apps');
}

function editApp(index) {
    var data = getData();
    var app = data.apps[index];
    document.getElementById('appName').value = app.name;
    document.getElementById('appCategory').value = app.category;
    document.getElementById('appDesc').value = app.desc;
    document.getElementById('appDemo').value = app.demo || '';
    document.getElementById('appGithub').value = app.github || '';
    document.getElementById('appPlayStore').value = app.playstore || '';
    document.getElementById('appAppStore').value = app.appstore || '';
    document.getElementById('appRating').value = app.rating || '';
    document.getElementById('appDownloads').value = app.downloads || '';
    document.getElementById('editingAppId').value = index;
    document.getElementById('addAppPageTitle').textContent = 'Edytuj aplikację';
    document.getElementById('saveAppBtnText').textContent = 'Zapisz zmiany';

    selectedIcon = app.icon || 'fas fa-code';
    document.querySelectorAll('.icon-option').forEach(function(o) {
        o.classList.remove('selected');
        if (o.dataset.icon === selectedIcon) o.classList.add('selected');
    });

    selectedColor = app.color || 'linear-gradient(135deg, #667eea, #764ba2)';
    document.querySelectorAll('.color-option').forEach(function(o) {
        o.classList.remove('selected');
        if (o.dataset.color === selectedColor) o.classList.add('selected');
    });

    selectedBadge = app.badge || 'none';
    document.querySelectorAll('.badge-option').forEach(function(o) {
        o.classList.remove('selected');
        if (o.dataset.badge === selectedBadge) o.classList.add('selected');
    });

    currentTags = (app.tech || []).slice();
    renderTags();
    updatePreview();
    showPage('add-app');
}

function deleteApp(index) {
    if (confirm('Na pewno chcesz usunąć tę aplikację?')) {
        var data = getData();
        data.apps.splice(index, 1);
        saveData(data);
        loadAppsList();
        showToast('Aplikacja usunięta!', 'info');
    }
}

function clearAppForm() {
    document.getElementById('appName').value = '';
    document.getElementById('appCategory').value = 'web';
    document.getElementById('appDesc').value = '';
    document.getElementById('appDemo').value = '';
    document.getElementById('appGithub').value = '';
    document.getElementById('appPlayStore').value = '';
    document.getElementById('appAppStore').value = '';
    document.getElementById('appRating').value = '';
    document.getElementById('appDownloads').value = '';
    document.getElementById('editingAppId').value = '';
    document.getElementById('addAppPageTitle').textContent = 'Dodaj aplikację';
    document.getElementById('saveAppBtnText').textContent = 'Dodaj aplikację';
    selectedIcon = 'fas fa-code';
    selectedColor = 'linear-gradient(135deg, #667eea, #764ba2)';
    selectedBadge = 'none';
    currentTags = [];
    document.querySelectorAll('.icon-option').forEach(function(o,i) { o.classList.toggle('selected', i===0); });
    document.querySelectorAll('.color-option').forEach(function(o,i) { o.classList.toggle('selected', i===0); });
    document.querySelectorAll('.badge-option').forEach(function(o,i) { o.classList.toggle('selected', i===0); });
    renderTags();
    updatePreview();
}

function exportData() {
    var data = getData();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'site-data-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Dane wyeksportowane!', 'success');
}

function resetData() {
    if (confirm('Na pewno chcesz usunąć WSZYSTKIE dane?')) {
        localStorage.removeItem('siteData');
        showToast('Dane usunięte!', 'info');
        loadDashboard();
    }
}

loadDashboard();