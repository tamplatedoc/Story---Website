// Firebase setup (pastikan Firebase sudah diinisialisasi di file HTML)
const db = getDatabase();

// Modal functionality
const modal = document.getElementById('story-modal');
const addStoryBtn = document.getElementById('add-story-btn');
const closeModal = document.querySelector('.close-modal');

addStoryBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Inisialisasi struktur database sekali saja saat halaman load
function initDatabaseStructure() {
    const dbRef = ref(db);
    
    get(dbRef).then((snapshot) => {
        if (!snapshot.exists()) {
            set(dbRef, {
                stories: {
                    story1: {
                        title: "Love in Jakarta",
                        author: "Sarah Wijaya",
                        genre: "romance",
                        content: "Cerita tentang...",
                        thumbnail: "",
                        createdAt: new Date().toISOString()
                    }
                },
                genres: ["romance", "fantasy", "horror"]
            }).then(() => {
                console.log("Struktur database berhasil dibuat!");
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', initDatabaseStructure);

// Fungsi simpan cerita ke Firebase
function saveStoryToFirebase(storyData) {
    const storiesRef = ref(db, 'stories');
    const newStoryRef = push(storiesRef);

    set(newStoryRef, storyData)
        .then(() => {
            alert('Cerita berhasil disimpan!');
        })
        .catch((error) => {
            console.error("Error saving story: ", error);
        });
}

// Form submission
document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('story-title').value;
    const content = document.getElementById('story-content').value;

    if (!title || !content) {
        alert('Judul dan isi cerita harus diisi');
        return;
    }

    const storyData = {
        title: title,
        author: document.getElementById('story-author').value,
        genre: document.getElementById('story-genre').value,
        content: content,
        thumbnail: "placeholder.jpg", // Ganti dengan URL thumbnail jika ada
        createdAt: new Date().toISOString()
    };

    saveStoryToFirebase(storyData);
    modal.style.display = 'none';
    this.reset();
});

// Meta description character counter
document.getElementById('story-meta').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('meta-count').textContent = count;
    
    if (count > 160) {
        document.querySelector('.char-count').style.color = 'red';
    } else {
        document.querySelector('.char-count').style.color = '#666';
    }
});

// Logout button
document.getElementById('logout-btn').addEventListener('click', function() {
    if (confirm('Anda yakin ingin logout?')) {
        window.location.href = 'login.html';
    }
});

// Table row actions
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const title = row.cells[0].textContent;
        alert(`Edit cerita: ${title}`);
    });
});

document.querySelectorAll('.seo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const title = row.cells[0].textContent;
        alert(`Atur SEO untuk: ${title}`);
    });
});

// Thumbnail preview
document.getElementById('story-thumbnail').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            console.log('Thumbnail dipilih:', event.target.result);
            // Tambahkan preview jika perlu
        };
        reader.readAsDataURL(file);
    }
});
