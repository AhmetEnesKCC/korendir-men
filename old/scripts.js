document.addEventListener("DOMContentLoaded", function () {
  const kalpIcon = document.getElementById("kalp-icon").querySelector("i");
  const isFilled = localStorage.getItem("kalpFilled") === "true";

  if (isFilled) {
    kalpIcon.classList.remove("far");
    kalpIcon.classList.add("fas");
  } else {
    kalpIcon.classList.remove("fas");
    kalpIcon.classList.add("far");
  }

  kalpIcon.addEventListener("click", function () {
    const filled = kalpIcon.classList.toggle("fas");
    kalpIcon.classList.toggle("far", !filled);
    localStorage.setItem("kalpFilled", filled);
  });

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    dropdown.addEventListener("mouseenter", () => {
      const rect = dropdown.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      if (rect.right + dropdownContent.offsetWidth > windowWidth) {
        dropdownContent.classList.add("right");
      } else {
        dropdownContent.classList.remove("right");
      }
    });
  });

  const scrollRange = document.getElementById("scrollRange");
  const spiderWeb = document.getElementById("spider-web");
  const welcomeText = document.querySelector(".hero-content h1");
  const rangeValue = document.getElementById("rangeValue"); // Değer göstergesi

  function updateAnimation(scrollPosition) {
    // Scroll pozisyonuna göre örümcek ağını görünür yap ve soldan çek
    if (scrollPosition > 50) {
      spiderWeb.style.opacity = Math.min(1, (scrollPosition - 50) / 300); // 50-300 arası geçiş
      spiderWeb.style.left = "50%"; // Soldan gelmesi için konum değiştir
      welcomeText.classList.add("pull-out"); // Yazıyı yukarı it
    } else {
      spiderWeb.style.opacity = 0; // Gizle
      spiderWeb.style.left = "-100px"; // Başlangıç konumuna geri döndür
      welcomeText.classList.remove("pull-out"); // Yazıyı eski konumuna getir
    }
  }

  // Range input için olay dinleyici
  scrollRange.addEventListener("input", function () {
    const scrollPosition = parseInt(scrollRange.value);
    rangeValue.textContent = scrollPosition; // Değer göstergesini güncelle
    updateAnimation(scrollPosition);
  });

  // Scroll için olay dinleyici
  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY; // Scroll pozisyonunu al
    scrollRange.value = Math.min(300, scrollPosition); // Scroll pozisyonunu range input'a ayarla
    rangeValue.textContent = scrollRange.value; // Değer göstergesini güncelle
    updateAnimation(scrollPosition);
  });

  // 3D örümcek ağı modeli oluşturma
  const spiderWebContainer = document.getElementById("spiderWebContainer");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, 400); // Yükseklik ayarı
  spiderWebContainer.appendChild(renderer.domElement);

  // Animasyon döngüsü
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Pencere boyutu değiştiğinde
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 400);
  });
});
