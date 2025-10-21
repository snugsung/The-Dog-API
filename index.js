import { DOG_API_BASE, DOG_HEADERS } from "./config.js";

const $ = (sel) => document.querySelector(sel);

const setStatus = (msg) => {
  $("#status").textContent = msg || "";
};

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: DOG_HEADERS });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

let BREEDS = [];
let currentBreedId = "";

const navRandomBtn = $("#nav-random");
const navBreedsBtn = $("#nav-breeds");

const imagePanel = $("#image-view");
const breedsPanel = $("#breeds-view");

const randomBtn = $("#btn-new-random");
const imgEl = $("#dog-img");
const imgBreedName = $("#img-breed-name");
const imgBreedTemp = $("#img-breed-temp");

const breedSelect = $("#breed-select");
const breedDetails = $("#breed-details");
const breedImgBtn = $("#btn-breed-image");
const breedImgEl = $("#breed-img");

const showPanel = (which) => {
  [imagePanel, breedsPanel].forEach((el) => el.classList.remove("active"));
  (which === "image" ? imagePanel : breedsPanel).classList.add("active");
};

const renderBreedDetails = (breed) => {
  if (!breed) {
    breedDetails.innerHTML = "";
    return;
  }

  const lines = [];
  if (breed.name) lines.push(`<div><strong>${breed.name}</strong></div>`);
  if (breed.temperament)
    lines.push(`<div>Temperament: ${breed.temperament}</div>`);
  if (breed.life_span) lines.push(`<div>Life span: ${breed.life_span}</div>`);
  if (breed.breed_group) lines.push(`<div>Group: ${breed.breed_group}</div>`);
  if (breed.origin) lines.push(`<div>Origin: ${breed.origin}</div>`);
  if (breed.weight?.imperial)
    lines.push(`<div>Weight (lbs): ${breed.weight.imperial}</div>`);
  if (breed.height?.imperial)
    lines.push(`<div>Height (in): ${breed.height.imperial}</div>`);

  breedDetails.innerHTML = lines.join("");
};

const loadBreeds = async () => {
  setStatus("Loading breeds…");
  try {
    BREEDS = await fetchJson(`${DOG_API_BASE}/breeds`);
    const options = ['<option value="">— choose a breed —</option>'].concat(
      BREEDS.map((b) => `<option value="${b.id}">${b.name}</option>`)
    );
    breedSelect.innerHTML = options.join("");
    setStatus("Breeds loaded.");
  } catch (err) {
    console.error(err);
    setStatus("Failed to load breeds.");
  }
};

const loadRandomImage = async () => {
  setStatus("Loading random image…");
  try {
    const images = await fetchJson(
      `${DOG_API_BASE}/images/search?limit=1&has_breeds=1`
    );
    const img = images[0];
    imgEl.src = img.url;
    const b = img.breeds?.[0];
    imgBreedName.textContent = b?.name ?? "Unknown breed";
    imgBreedTemp.textContent = b?.temperament
      ? `Temperament: ${b.temperament}`
      : "";
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus("Failed to load image.");
  }
};

const loadImageForBreed = async (breedId) => {
  if (!breedId) return;
  setStatus("Loading breed image…");
  try {
    const images = await fetchJson(
      `${DOG_API_BASE}/images/search?limit=1&breed_ids=${breedId}`
    );
    const img = images[0];
    breedImgEl.src = img?.url || "";
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus("Failed to load breed image.");
  }
};

navRandomBtn.addEventListener("click", () => {
  showPanel("image");
  loadRandomImage();
});

navBreedsBtn.addEventListener("click", () => {
  showPanel("breeds");
});

randomBtn.addEventListener("click", () => {
  loadRandomImage();
});

breedSelect.addEventListener("change", (e) => {
  currentBreedId = e.target.value;
  const breed = BREEDS.find((b) => String(b.id) === String(currentBreedId));
  renderBreedDetails(breed);
  breedImgBtn.disabled = !currentBreedId;
});

breedImgBtn.addEventListener("click", () => {
  if (currentBreedId) loadImageForBreed(currentBreedId);
});

(async () => {
  showPanel("image");
  await loadBreeds();
  await loadRandomImage();
})();