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

// Form submission
document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validasi form
    const title = document.getElementById('story-title').value;
    const content = document.getElementById('story-content').value;
    
    if (!title || !content) {
        alert('Judul dan isi cerita harus diisi');
        return;
    }
    
    // Simulasi pengiriman data
    console.log('Data cerita:', {
        title: title,
        author: document.getElementById('story-author').value,
        genre: document.getElementById('story-genre').value,
        content: content,
        meta: document.getElementById('story-meta').value
    });
    
    alert('Cerita berhasil disimpan!');
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
        // Redirect ke halaman login
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
            // Bisa ditambahkan preview thumbnail di sini
            console.log('Thumbnail dipilih:', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});
