// Image data (replace URLs with your own images later)
const images = [
  { thumb: 'https://picsum.photos/id/1015/200', full: 'https://picsum.photos/id/1015/800', caption: 'Sunset' },
  { thumb: 'https://picsum.photos/id/1016/200', full: 'https://picsum.photos/id/1016/800', caption: 'Mountains' },
  { thumb: 'https://picsum.photos/id/1018/200', full: 'https://picsum.photos/id/1018/800', caption: 'River' },
  { thumb: 'https://picsum.photos/id/1020/200', full: 'https://picsum.photos/id/1020/800', caption: 'Forest' },
  { thumb: 'https://picsum.photos/id/1024/200', full: 'https://picsum.photos/id/1024/800', caption: 'Dog' }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

/* ===== Create thumbnails (lazy load) ===== */
images.forEach((img, index) => {
  const image = document.createElement("img");
  image.src = img.thumb;
  image.loading = "lazy";
  image.alt = img.caption;

  image.addEventListener("click", () => openLightbox(index));
  gallery.appendChild(image);
});

/* ===== Open lightbox ===== */
function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
}

/* ===== Update lightbox content ===== */
function updateLightbox() {
  lightboxImg.src = images[currentIndex].full;
  caption.textContent = images[currentIndex].caption;
  counter.textContent = `${currentIndex + 1} of ${images.length}`;
}

/* ===== Close lightbox ===== */
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

/* ===== Navigation ===== */
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

/* ===== Keyboard navigation ===== */
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "Escape") lightbox.classList.remove("active");
});
