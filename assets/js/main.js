// ================== Mobile menu toggle ==================
document.querySelector('.mobile-menu-btn')?.addEventListener('click', function () {
  document.querySelector('.main-nav ul')?.classList.toggle('show');
});

// ================== Genre dropdown ==================
const genreDropdown = document.querySelector('.genre-dropdown');
if (genreDropdown) {
  genreDropdown.addEventListener('mouseenter', function () {
    this.querySelector('.dropdown-menu').style.display = 'block';
  });
  genreDropdown.addEventListener('mouseleave', function () {
    this.querySelector('.dropdown-menu').style.display = 'none';
  });
}

// ================== Search functionality ==================
document.querySelector('.search-box button')?.addEventListener('click', function () {
  const query = document.querySelector('.search-box input')?.value.trim();
  if (query) {
    alert(`Akan mencari: ${query}`);
    // Tambahkan logika pencarian jika perlu
  }
});

// ================== Lazy loading gambar ==================
document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoad = function () {
    lazyImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      }
    });
  };

  lazyLoad(); // Load saat pertama
  window.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);
});

// ================== Analytics tracking ==================
window.addEventListener('load', function () {
  console.log('Halaman dimuat - kirim data analytics');
  // Misal kirim ke Firebase Analytics (jika digunakan)
});

// ================== Ambil semua cerita dari Firebase ==================
function loadStories() {
  const storiesRef = database.ref('stories'); // 'database' sudah didefinisikan di HTML
  storiesRef.on('value', (snapshot) => {
    const stories = snapshot.val();
    const storyGrid = document.querySelector('.story-grid');
    if (!storyGrid) return;

    storyGrid.innerHTML = '';

    for (const [key, story] of Object.entries(stories || {})) {
      const storyCard = `
        <article class="story-card" data-genre="${story.genre}">
          <a href="stories/detail.html?id=${key}">
            <img src="${story.thumbnail}" alt="${story.title}" class="story-thumb">
            <h3>${story.title}</h3>
            <p class="author">By: ${story.author}</p>
            <p class="excerpt">${story.content.substring(0, 100)}...</p>
          </a>
        </article>
      `;
      storyGrid.innerHTML += storyCard;
    }
  });
}

window.addEventListener('DOMContentLoaded', loadStories);
