const mainContent = document.getElementById("main-content");
const navLinks = document.querySelectorAll("[data-link]");

async function loadPage(page) {
  try {
    const response = await fetch(`/src/components/html/${page}.html`)

    if (!response.ok) throw new error('gagal memuat component');
    const html = await response.text();
    mainContent.innerHTML = html;
    try {
      const module = await import(`/src/components/js/${page}.js`);
      if (typeof module.init === "function") {
        module.init();
      }

      /*
       navLinks.forEach((link) => {
      if (link.dataset.link === page) {
        // Aktif
        link.style.color = "blue";
      }
    });
    */

    } catch (err) {
      console.warn(`tidak ada JS untuk halaman ${page}`)
    }
  }catch (err) {
    mainContent.innerHTML = `<p>Gagal memuat halaman<b>${page}</b></p>`;
    console.error(err);
  }
}


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const page = link.dataset.link;
    loadPage(page);
    history.pushState({ page }, "", `?page=${page}`);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const page = params.get("page") || "dashboard";
  loadPage(page);
});

window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "dashboard";
  loadPage(page);
});

// untuk listener terload di setiap file
window.loadPage = loadPage;
