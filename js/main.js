    function isMobileDevice() {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function extractUsernamesFromHTML(htmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      const usernames = new Set();

      doc.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        const match = href.match(/instagram\.com\/(?:_u\/)?([^\/?#]+)/i);
        if (match && match[1]) {
          usernames.add(match[1]);
        }
      });

      doc.body.innerText
        .split('\n')
        .map(line => line.trim())
        .forEach(line => {
          if (
            line &&
            !line.match(/\d{4}/) &&
            !line.includes('Jan') &&
            !line.includes(':')
          ) {
            usernames.add(line);
          }
        });

      return Array.from(usernames);
    }

    async function processZip() {
      const fileInput = document.getElementById('zipFile');
      const file = fileInput.files[0];
      if (!file) return;
      document.getElementById("processBtn").addEventListener("click", processZip);
      document.getElementById('result').innerHTML = languageTexts[lang].extracting;

      const zip = await JSZip.loadAsync(file);

      // followers & following file location
      const followersPath = 'connections/followers_and_following/followers_1.html';
      const followingPath = 'connections/followers_and_following/following.html';
      const followersFile = zip.file(followersPath);
      const followingFile = zip.file(followingPath);
      if (!followersFile || !followingFile) {
        document.getElementById('result').innerHTML = `<p style="color:red;">${languageTexts[lang].fileError}</p>`;
        return;
      }

      const followersHTML = await followersFile.async('string');
      const followingHTML = await followingFile.async('string');
      const followers = extractUsernamesFromHTML(followersHTML);
      const following = extractUsernamesFromHTML(followingHTML);
      const unfollowers = following.filter(user => !followers.includes(user));
      displayResults(unfollowers);
    }

    const languageTexts = {
    id: {
      upload: 'Lalu, unggahlah file ZIP-nya dibawah ini',
      process: 'Proses ZIP',
      total: 'Jumlah Unfollowers',
      allFollow: 'Semua orang yang kamu follow juga follow kamu balik.',
      fileError: 'File followers.html atau following.html tidak ditemukan di dalam ZIP.',
      description: 'Unfollinsta dapat mengetahui siapa saja unfollowers atau yang tidak mengikuti balik akun Instagram kamu.',
      tutorial: `Dapatkan file ZIP-nya terlebih dahulu (yang didapat dari Pusat Akun) agar bisa diproses!<br>
      <span class="tooltip-trigger" onclick="showTooltip()">Lihat Tutorial</span>`,
      extracting: 'Mengekstrak ZIP...',
      },
    en: {
      upload: 'Then, upload the ZIP file below',
      process: 'Process ZIP',
      total: 'Total Unfollowers',
      allFollow: 'Everyone you follow follows you back.',
      fileError: 'followers.html or following.html file not found in ZIP.',
      description: 'Unfollinsta can find out who are unfollowers or who do not follow back your Instagram account.',
      tutorial: `Get the ZIP file first (obtained from the Accounts Center) so that it can be processed!<br>
      <span class="tooltip-trigger" onclick="showTooltip()">See Tutorial</span>`,
      extracting: 'Extracting ZIP...',
      }
    };

    function showTooltip() {
      const content = {
        id: [
          "Buka Pusat Akun",
          "Masuk ke menu Informasi dan izin Anda",
          "Pilih Ekspor informasi Anda",
          "Pilih Buat ekspor",
          "Pilih akun Instagram kamu",
          "Pilih Ekspor ke perangkat".
          "Pilih Sesuaikan informasi",
          "Pilih Pengikut dan Mengikuti (Koneksi)",
          "Pilih Rentang tanggal (direkomendasikan pilih Sepanjang Waktu)",
          "Pilih format HTML",
          "Klik Mulai ekspor",
          "Tunggu permintaan hingga Instagram memberi file ZIP yang dapat kamu unduh",
          "Unduh file ZIP di menu Ekspor informasi Anda"
        ],
        en: [
          "Open Accounts Center",
          "Go to Your information and permissions",
          "Select Export your information",
          "Choose Create export",
          "Select your Instagram account",
          "Export to device",
          "Choose Customize information",
          "Select Followers and following (Connections)",
          "Choose Date range (recommended choose All time)",
          "Select HTML format",
          "Start export",
          "Wait requested until Instagram give the ZIP that you can download it",
          "Download the ZIP file from Export your information"
        ]
      };

      const steps = content[lang];

      const titles = {
        id: "Cara Mendapatkan File ZIP",
        en: "How to Get the ZIP File"
      };

      const html = `
        <h3 style="margin-top:0;">${titles[lang]}</h3>
        <ol>
          ${steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
      `;

      document.getElementById("tooltipContent").innerHTML = html;
      document.getElementById("centerTooltip").classList.remove("hidden");
      document.body.classList.add("modal-open");
    }

    function hideTooltip() {
      document.getElementById("centerTooltip").classList.add("hidden");
      document.body.classList.remove("modal-open");
    }

    const lang = localStorage.getItem('lang') || 'id';
    // runnin after showing the html elements
    document.addEventListener("DOMContentLoaded", () => {

      document.getElementById('uploadText').textContent =
        languageTexts[lang].upload;

      document.getElementById('descriptionText').textContent =
        languageTexts[lang].description;

      document.getElementById('tutorialText').innerHTML =
        languageTexts[lang].tutorial;

      const processBtn = document.getElementById('processBtn');
      processBtn.textContent = languageTexts[lang].process;
      processBtn.addEventListener("click", processZip);

    });

    function displayResults(unfollowers) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `<h3>${languageTexts[lang].total}: ${unfollowers.length}</h3>`;
      if (unfollowers.length === 0) {
        resultDiv.innerHTML += `<p>${languageTexts[lang].allFollow}</p>`;
        return;
      }

      const ol = document.createElement('ol');
      unfollowers.forEach(user => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `https://www.instagram.com/${user}/`;
        link.textContent = user;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        li.appendChild(link);
        ol.appendChild(li);
      });
      resultDiv.appendChild(ol);
    }
      const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("js/sw.js");
    }

