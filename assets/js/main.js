window.addEventListener('DOMContentLoaded', () => {
  const db = window.firebaseDatabase;
  const storiesRef = firebase.database().ref(db, 'stories');

  // Mengambil data cerita dari Firebase
  storiesRef.on('value', snapshot => {
    const stories = snapshot.val();
    const storyGrid = document.querySelector('.story-grid');
    if (!storyGrid || !stories) return;

    storyGrid.innerHTML = '';
    for (const [key, story] of Object.entries(stories)) {
      const card = `
        <article class="story-card" data-genre="${story.genre}">
          <a href="stories/detail.html?id=${key}">
            <img src="${story.thumbnail}" alt="${story.title}" class="story-thumb">
            <h3>${story.title}</h3>
            <p class="author">By: ${story.author}</p>
            <p class="excerpt">${story.content.substring(0, 100)}...</p>
          </a>
        </article>
      `;
      storyGrid.innerHTML += card;
    }
  });

  // Tombol menu burger (mobile)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.main-nav ul');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Dropdown Genre
  const genreDropdown = document.querySelector('.genre-dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (genreDropdown && dropdownMenu) {
    genreDropdown.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownMenu.classList.toggle('show');
    });

    // Menutup dropdown & nav jika klik di luar
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navMenu.classList.remove('show');
      }
      if (!dropdownMenu.contains(event.target) && !genreDropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }
});
