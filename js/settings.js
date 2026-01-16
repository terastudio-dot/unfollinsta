    const languageTexts = {
      id: {
        title: "Pengaturan",
        languageLabel: "Bahasa",
        themeLabel: "Tema",
        backLink: "Kembali"
      },
      en: {
        title: "Settings",
        languageLabel: "Language",
        themeLabel: "Theme",
        backLink: "Back"
      }
    };

    const langSelect = document.getElementById("languageSelect");
    const themeSelect = document.getElementById("themeSelect");

    function applyLanguage(lang) {
      const texts = languageTexts[lang];
      document.getElementById("title").textContent = texts.title;
      document.getElementById("languageLabel").textContent = texts.languageLabel;
      document.getElementById("themeLabel").textContent = texts.themeLabel;
      document.getElementById("backLink").textContent = texts.backLink;
    }

    function applyTheme(theme) {
      document.body.classList.toggle("dark-mode", theme === "dark");
    }

    // get settings
    const savedLang = localStorage.getItem("lang") || "id";
    const savedTheme = localStorage.getItem("theme") || "light";
    langSelect.value = savedLang;
    themeSelect.value = savedTheme;
    applyLanguage(savedLang);
    applyTheme(savedTheme);

    // choose language
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      localStorage.setItem("lang", lang);
      applyLanguage(lang);
    });

    // choose theme
    themeSelect.addEventListener("change", () => {
      const theme = themeSelect.value;
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });

    function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    const logo = document.getElementById("footerLogo");
      if (logo) {
      logo.src = theme === "dark" ? "icons/terastudio26white-nobg.png" : "icons/terastudio26black-nobg.png";
      }
    const youtubeIcon = document.getElementById("youtubeIcon");
      if (youtubeIcon) {
      youtubeIcon.src = theme === "dark"
      ? "icons/ytdark.png"
      : "icons/ytlight.png";
      }
    };

    function isMobileDevice() {
      return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    const youtubeLink = document.getElementById("youtubeLink");
    if (youtubeLink && isMobileDevice()) {
      youtubeLink.href = "youtube://www.youtube.com/@terastudiocilangkap";
    }