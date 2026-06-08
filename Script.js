// My Image Gallery Project
// CodeAlpha Internship
// Made by: Niket Kumar Bhagat

// My images collection - added one by one
const images = [
    { id: 1, src: "images/tree.jpg", title: "Beautiful Nature", category: "nature" },
    { id: 2, src: "images/city1.jpg", title: "City Skyline", category: "city" },
    { id: 3, src: "images/mountain.jpg", title: "Mountain View", category: "nature" },
    { id: 4, src: "images/mountain2.jpg", title: "Mountain View 2", category: "nature" },
    { id: 5, src: "images/urban.jpg", title: "Urban Life", category: "city" },
    { id: 6, src: "images/wildanimal.jpg", title: "Wild Animals", category: "animals" },
    { id: 7, src: "images/forest-trail.jpg", title: "Forest Trail", category: "nature" },
    { id: 8, src: "images/puppy-love.jpg", title: "Puppy Love", category: "animals" },
    { id: 9, src: "images/sunset.jpg", title: "Sunset City", category: "city" },
    { id: 10, src: "images/animals.jpg", title: "Cute Animals", category: "nature" },
    { id: 11, src: "images/city-vibe.jpg", title: "City Vibe", category: "city" },
    { id: 12, src: "images/deer.jpg", title: "Beautiful Deer", category: "animals" },
    { id: 13, src: "images/panda.jpg", title: "Cute Panda", category: "animals" }
];

let currentImg = 0;
let currentFilterType = "none";
let currentCat = "all";

const galleryDiv = document.getElementById("galleryGrid");
const lightboxDiv = document.getElementById("lightbox");
const lightboxPicture = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close");
const prevButton = document.querySelector(".nav-prev");
const nextButton = document.querySelector(".nav-next");

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
            <img src="${img.src}" alt="${img.title}" class="${filterClass}">
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
}

function closeLightBox() {
    lightboxDiv.style.display = "none";
    document.body.style.overflow = "auto";
}

function nextImage() {
    currentImg = currentImg + 1;
    if (currentImg >= images.length) {
        currentImg = 0;
    }
    lightboxPicture.src = images[currentImg].src;
    updateLightboxFilter();
}

function previousImage() {
    currentImg = currentImg - 1;
    if (currentImg < 0) {
        currentImg = images.length - 1;
    }
    lightboxPicture.src = images[currentImg].src;
    updateLightboxFilter();
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

if (closeLightbox) closeLightbox.onclick = closeLightBox;
if (prevButton) prevButton.onclick = previousImage;
if (nextButton) nextButton.onclick = nextImage;

lightboxDiv.onclick = function(e) {
    if (e.target === lightboxDiv) {
        closeLightBox();
    }
};

document.onkeydown = function(e) {
    if (lightboxDiv.style.display === "block") {
        if (e.key === "Escape") closeLightBox();
        if (e.key === "ArrowLeft") previousImage();
        if (e.key === "ArrowRight") nextImage();
    }
};

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

const filterButtons = document.querySelectorAll(".filter-btn");
if (filterButtons.length > 0) {
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].onclick = function() {
            changeFilter(this.getAttribute("data-filter"));
        };
    }
}

displayGallery();