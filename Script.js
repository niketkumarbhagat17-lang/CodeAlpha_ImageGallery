// My Image Gallery Project
// CodeAlpha Internship
// Made by: Niket Kumar Bhagat

// image section
const images = [
    // NATURE images
    { id: 1, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop", title: "Beautiful Nature", category: "nature" },
    { id: 2, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop", title: "Mountain View", category: "nature" },
    { id: 3, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop", title: "Forest Trail", category: "nature" },
    { id: 4, src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop", title: "Green Valley", category: "nature" },

    // CITY images
    { id: 5, src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop", title: "City Skyline", category: "city" },
    { id: 6, src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=300&fit=crop", title: "Urban Street", category: "city" },
    { id: 7, src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop", title: "Sunset City", category: "city" },
    { id: 8, src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=300&fit=crop", title: "City Buildings", category: "city" },

    // ANIMALS images
    { id: 9, src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=300&h=300&fit=crop", title: "Wild Tiger", category: "animals" },
    { id: 10, src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop", title: "Cute Puppy", category: "animals" },
    { id: 11, src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=300&h=300&fit=crop", title: "Beautiful Deer", category: "animals" },
    { id: 12, src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=300&fit=crop", title: "Cute Panda", category: "animals" }
];

let currentImg = 0;
let currentFilterType = "none";
let currentCat = "all";
let slideshowInterval = null;
let isZoomed = false;

const galleryDiv = document.getElementById("galleryGrid");
const lightboxDiv = document.getElementById("lightbox");
const lightboxPicture = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close");
const prevButton = document.querySelector(".nav-prev");
const nextButton = document.querySelector(".nav-next");

// image counter display
function updateCounter() {
    const currentSpan = document.getElementById("currentImgNum");
    const totalSpan = document.getElementById("totalImgNum");
    if (currentSpan) currentSpan.textContent = currentImg + 1;
    if (totalSpan) totalSpan.textContent = images.length;
}

function displayGallery() {
    let imagesToShow = [];

    if (currentCat === "all") {
        imagesToShow = images;
    } else {
        imagesToShow = images.filter(img => img.category === currentCat);
    }

    galleryDiv.innerHTML = "";

    for (let i = 0; i < imagesToShow.length; i++) {
        const img = imagesToShow[i];
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";

        let filterClass = "";
        if (currentFilterType === "bw") filterClass = "filter-bw";
        if (currentFilterType === "sepia") filterClass = "filter-sepia";
        if (currentFilterType === "blur") filterClass = "filter-blur";

        galleryItem.innerHTML = `
            <img src="${img.src}" alt="${img.title}" class="${filterClass}" loading="lazy">
            <div class="image-title">${img.title}</div>
        `;

        galleryItem.onclick = (function(imgObj) {
            return function() {
                const originalIndex = images.findIndex(x => x.id === imgObj.id);
                openLightBox(originalIndex);
            };
        })(img);

        galleryDiv.appendChild(galleryItem);
    }
}

function openLightBox(index) {
    currentImg = index;
    lightboxPicture.src = images[currentImg].src;
    lightboxDiv.style.display = "block";
    document.body.style.overflow = "hidden";
    updateLightboxFilter();
    updateCounter();
    resetZoom();
}

function closeLightBox() {
    lightboxDiv.style.display = "none";
    document.body.style.overflow = "auto";
    stopSlideshow();
    resetZoom();
}

function nextImage() {
    currentImg = currentImg + 1;
    if (currentImg >= images.length) {
        currentImg = 0;
    }
    lightboxPicture.src = images[currentImg].src;
    updateLightboxFilter();
    updateCounter();
    resetZoom();
}

function previousImage() {
    currentImg = currentImg - 1;
    if (currentImg < 0) {
        currentImg = images.length - 1;
    }
    lightboxPicture.src = images[currentImg].src;
    updateLightboxFilter();
    updateCounter();
    resetZoom();
}

function updateLightboxFilter() {
    lightboxPicture.classList.remove("filter-bw", "filter-sepia", "filter-blur");
    if (currentFilterType === "bw") lightboxPicture.classList.add("filter-bw");
    if (currentFilterType === "sepia") lightboxPicture.classList.add("filter-sepia");
    if (currentFilterType === "blur") lightboxPicture.classList.add("filter-blur");
}

function changeFilter(filterType) {
    currentFilterType = filterType;
    const allGalleryImages = document.querySelectorAll(".gallery-item img");

    for (let i = 0; i < allGalleryImages.length; i++) {
        const imgElement = allGalleryImages[i];
        imgElement.classList.remove("filter-bw", "filter-sepia", "filter-blur");

        if (filterType === "bw") imgElement.classList.add("filter-bw");
        if (filterType === "sepia") imgElement.classList.add("filter-sepia");
        if (filterType === "blur") imgElement.classList.add("filter-blur");
    }

    if (lightboxDiv.style.display === "block") {
        updateLightboxFilter();
    }
}

function changeCategory(category) {
    currentCat = category;
    displayGallery();
    setTimeout(function() {
        changeFilter(currentFilterType);
    }, 100);
}

//  Download Image
function downloadImage() {
    const link = document.createElement('a');
    link.href = images[currentImg].src;
    link.download = images[currentImg].title + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//  Slideshow 
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        const slideshowBtn = document.getElementById("slideshowBtn");
        if (slideshowBtn) {
            slideshowBtn.textContent = "▶ Slideshow";
            slideshowBtn.classList.remove("slideshow-active");
        }
    } else {
        slideshowInterval = setInterval(() => {
            nextImage();
        }, 3000);
        const slideshowBtn = document.getElementById("slideshowBtn");
        if (slideshowBtn) {
            slideshowBtn.textContent = "⏸ Stop";
            slideshowBtn.classList.add("slideshow-active");
        }
    }
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        const slideshowBtn = document.getElementById("slideshowBtn");
        if (slideshowBtn) {
            slideshowBtn.textContent = "▶ Slideshow";
            slideshowBtn.classList.remove("slideshow-active");
        }
    }
}

//  Fullscreen 
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        lightboxDiv.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Zoom In/Out 
function zoomIn() {
    isZoomed = true;
    lightboxPicture.classList.add("zoomed");
}

function zoomOut() {
    isZoomed = false;
    lightboxPicture.classList.remove("zoomed");
}

function resetZoom() {
    isZoomed = false;
    lightboxPicture.classList.remove("zoomed");
}

// key board support
document.onkeydown = function(e) {
    if (lightboxDiv.style.display === "block") {
        if (e.key === "Escape") {
            closeLightBox();
            stopSlideshow();
        }
        if (e.key === "ArrowLeft") previousImage();
        if (e.key === "ArrowRight") nextImage();
    }
};

// ===== Event Listeners for new buttons =====
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) downloadBtn.onclick = downloadImage;

const slideshowBtn = document.getElementById("slideshowBtn");
if (slideshowBtn) slideshowBtn.onclick = startSlideshow;

const fullscreenBtn = document.getElementById("fullscreenBtn");
if (fullscreenBtn) fullscreenBtn.onclick = toggleFullscreen;

const zoomInBtn = document.getElementById("zoomInBtn");
if (zoomInBtn) zoomInBtn.onclick = zoomIn;

const zoomOutBtn = document.getElementById("zoomOutBtn");
if (zoomOutBtn) zoomOutBtn.onclick = zoomOut;

// ===== Existing Event Listeners =====
if (closeLightbox) closeLightbox.onclick = closeLightBox;
if (prevButton) prevButton.onclick = previousImage;
if (nextButton) nextButton.onclick = nextImage;

lightboxDiv.onclick = function(e) {
    if (e.target === lightboxDiv) {
        closeLightBox();
        stopSlideshow();
    }
};

// ===== Category Buttons =====
const catButtons = document.querySelectorAll(".cat-btn");
if (catButtons.length > 0) {
    for (let i = 0; i < catButtons.length; i++) {
        catButtons[i].onclick = function() {
            for (let j = 0; j < catButtons.length; j++) {
                catButtons[j].classList.remove("active");
            }
            this.classList.add("active");
            changeCategory(this.getAttribute("data-category"));
        };
    }
}

// ===== Filter Buttons =====
const filterButtons = document.querySelectorAll(".filter-btn");
if (filterButtons.length > 0) {
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].onclick = function() {
            changeFilter(this.getAttribute("data-filter"));
        };
    }
}

// Initialize counter and start gallery
updateCounter();
displayGallery();
