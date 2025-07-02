function getLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || 'ua'; // ua — за замовчуванням
}

function loadLang(lang) {
  fetch(`translations/${lang}.json`)
    .then(res => {
      if (!res.ok) throw new Error(`Could not load ${lang}.json`);
      return res.json();
    })
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.textContent = data[key];
        }
      });
      document.getElementById('langSwitcher').value = lang;
      document.documentElement.lang = lang;
    })
    .catch(err => console.error(err));
}

document.getElementById('langSwitcher').addEventListener('change', function () {
  const selectedLang = this.value;
  const url = new URL(window.location);
  url.searchParams.set('lang', selectedLang);
  history.replaceState(null, '', url);
  loadLang(selectedLang);
});

const currentLang = getLangFromUrl();
loadLang(currentLang);