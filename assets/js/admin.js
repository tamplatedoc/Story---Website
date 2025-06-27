document.getElementById('story-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('story-title').value;
  const author = document.getElementById('story-author').value;
  const genre = document.getElementById('story-genre').value;
  const content = document.getElementById('story-content').value;
  const meta = document.getElementById('story-meta').value;
  const thumbnail = document.getElementById('thumbnail-url')?.value || "";

  const story = {
    title,
    author,
    genre,
    content,
    meta,
    thumbnail,
    createdAt: new Date().toISOString()
  };

  const db = window.firebaseDatabase;
  const storiesRef = firebase.database().ref(db, 'stories');

  firebase.database().push(storiesRef, story).then(() => {
    alert("Cerita berhasil disimpan!");
    this.reset();
  });
});
