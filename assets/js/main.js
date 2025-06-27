window.addEventListener('DOMContentLoaded', () => {
  const db = window.firebaseDatabase;
  const storiesRef = firebase.database().ref(db, 'stories');

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
});
