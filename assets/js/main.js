// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav ul').classList.toggle('show');
});

// Genre dropdown
const genreDropdown = document.querySelector('.genre-dropdown');
if (genreDropdown) {
    genreDropdown.addEventListener('mouseenter', function() {
        this.querySelector('.dropdown-menu').style.display = 'block';
    });
    
    genreDropdown.addEventListener('mouseleave', function() {
        this.querySelector('.dropdown-menu').style.display = 'none';
    });
}

// Search functionality
document.querySelector('.search-box button').addEventListener('click', function() {
    const query = document.querySelector('.search-box input').value.trim();
    if (query) {
        alert(`Akan mencari: ${query}`);
        // Implementasi pencarian sebenarnya
    }
});

// Lazy loading untuk gambar
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    };
    
    lazyLoad();
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
});

// Analytics tracking
window.addEventListener('load', function() {
    // Kode untuk melacak kunjungan halaman
    console.log('Halaman dimuat - kirim data analytics');
});
