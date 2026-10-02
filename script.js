/* ===================================================
   WEB AUDIO API (Hiệu ứng âm thanh không cần file ngoài)
   =================================================== */
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Âm click khi kim lướt qua nan quạt
function playTickSound() {
  try {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Tránh chặn UI nếu trình duyệt tắt audio
  }
}

// Âm chuông vui mừng khi trúng giải
function playVictorySound() {
  try {
    initAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C cao
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.1);
      osc.stop(audioCtx.currentTime + idx * 0.1 + 0.4);
    });
  } catch (e) {}
}

/* ===================================================
   PRESETS MÓN ĂN & ĐỊA ĐIỂM CHUẨN HÀ NỘI
   =================================================== */
const HANOI_PRESETS = {
  sangTrua: [
    "Phở Bát Đàn",
    "Phở Thìn Lò Đúc",
    "Bún Chả Hàng Quạt",
    "Bún Đậu Hàng Khay",
    "Bánh Cuốn Bà Hoành",
    "Bún Thang Cầu Gỗ",
    "Bún Dọc Mùng Bát Đàn",
    "Xôi Xéo Bát Đàn",
    "Bún Ngan Nhàn",
    "Cơm Tấm Phố Cổ"
  ],
  toiDem: [
    "Lẩu Ếch Phó Đức Chính",
    "Nướng Gầm Cầu",
    "Ốc Đinh Liệt Phố Cổ",
    "Cháo Sườn Đồng Xuân",
    "Mì Gà Tần Hàng Bồ",
    "Lẩu Riêu Cua Hàng Tre",
    "Phở Xào Bát Đàn",
    "Lẩu Bò Nhúng Dấm 555",
    "Chân Gà Nướng Bà Triệu",
    "Bánh Mì Sốt Vang Đình Ngang"
  ],
  anVat: [
    "Nem Chua Rán Tạm Thương",
    "Bánh Gối Lý Quốc Sư",
    "Nộm Bò Khô Bờ Hồ",
    "Tào Phớ Nghĩa Tân",
    "Trứng Chén Nướng Đội Cấn",
    "Bánh Rán Mặn Lạc Long Quân",
    "Bò Bía Ngọt Bến Hàn Quốc",
    "Kem Tràng Tiền",
    "Sữa Chua Dẻo Hàng Than"
  ],
  choiCafe: [
    "Ngắm Hoàng Hôn Hồ Tây",
    "Cafe Trứng Giảng",
    "Dạo Phố Đi Bộ Hồ Gươm",
    "Check-in Nhà Thờ Lớn",
    "Xem Phim Rạp Quốc Gia",
    "Lượn Phố Phan Đình Phùng",
    "Bắn Cung Target Archery",
    "Nghe Jazz Bình Minh Club",
    "Uống Trà Chanh Chợ Gạo"
  ]
};

// Bảng màu nan quạt ấm cúng Hà Nội (Gold, Brick, Amber, Ruby, Warm Cyan)
const WHEEL_PALETTE = [
  "#d97706", "#dc2626", "#b45309", "#059669",
  "#9333ea", "#2563eb", "#ea580c", "#0891b2"
];

/* ===================================================
   STATE & DOM ELEMENTS
   =================================================== */
let currentCategory = "sangTrua";
let options = JSON.parse(localStorage.getItem("hanoi_wheel_items")) || [...HANOI_PRESETS.sangTrua];
let startAngle = 0;
let isSpinning = false;
let lastTickIndex = -1;

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultAdvice = document.getElementById("resultAdvice");
const gmapLink = document.getElementById("gmapLink");
const itemsWrapper = document.getElementById("itemsWrapper");
const counterText = document.getElementById("counterText");
const addForm = document.getElementById("addForm");
const itemInput = document.getElementById("itemInput");
const resetAllBtn = document.getElementById("resetAllBtn");
const presetTags = document.querySelectorAll(".preset-tag");

/* ===================================================
   VẼ VÒNG QUAY (HTML5 CANVAS)
   =================================================== */
function drawWheel() {
  const num = options.length;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = cx - 12;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (num === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#1e1b29";
    ctx.fill();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Hãy thêm ít nhất 2 mục!", cx, cy);
    return;
  }

  const arc = (2 * Math.PI) / num;

  for (let i = 0; i < num; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = WHEEL_PALETTE[i % WHEEL_PALETTE.length];
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + arc);
    ctx.lineTo(cx, cy);
    ctx.fill();

    // Viền nhẹ mỗi nan quạt
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Vẽ chữ hiển thị
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13.5px 'Plus Jakarta Sans', sans-serif";
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";

    // Rút gọn chữ nếu tên quán quá dài
    const label = options[i].length > 18 ? options[i].substring(0, 16) + "..." : options[i];
    ctx.fillText(label, radius - 20, 5);
    ctx.restore();
  }
}

/* ===================================================
   RENDER DANH SÁCH & LOCALSTORAGE
   =================================================== */
function renderList() {
  itemsWrapper.innerHTML = "";
  counterText.textContent = `Danh sách: ${options.length} lựa chọn`;

  options.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "item-chip";
    const color = WHEEL_PALETTE[index % WHEEL_PALETTE.length];

    li.innerHTML = `
      <div class="item-chip-title">
        <span class="color-dot" style="background:${color}"></span>
        <span>${item}</span>
      </div>
      <button class="del-btn" onclick="removeItem(${index})" title="Xóa">
        <i class="ph ph-trash"></i>
      </button>
    `;
    itemsWrapper.appendChild(li);
  });

  localStorage.setItem("hanoi_wheel_items", JSON.stringify(options));
  drawWheel();
}

// Xóa 1 phần tử
window.removeItem = function(index) {
  if (isSpinning) return;
  options.splice(index, 1);
  renderList();
};

// Đặt lại mặc định theo Preset đang active
resetAllBtn.addEventListener("click", () => {
  if (isSpinning) return;
  options = [...HANOI_PRESETS[currentCategory]];
  renderList();
});

// Thêm lựa chọn từ Form
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = itemInput.value.trim();
  if (val) {
    options.push(val);
    itemInput.value = "";
    renderList();
  }
});

// Chọn Preset
presetTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    if (isSpinning) return;
    presetTags.forEach((t) => t.classList.remove("active"));
    tag.classList.add("active");
    currentCategory = tag.dataset.preset;
    options = [...HANOI_PRESETS[currentCategory]];
    renderList();
  });
});

/* ===================================================
   LOGIC QUAY VÒNG & HIỆU ỨNG GIẢM TỐC
   =================================================== */
spinBtn.addEventListener("click", () => {
  if (isSpinning || options.length < 2) {
    if (options.length < 2) alert("Vui lòng có ít nhất 2 mục để bắt đầu quay!");
    return;
  }

  initAudioContext();
  isSpinning = true;
  spinBtn.disabled = true;
  resultTitle.textContent = "Đang chọn quán ngon...";
  resultAdvice.textContent = "Bánh xe định mệnh đang lăn qua các con ngõ Hà Nội...";
  gmapLink.classList.add("hidden");

  // Số vòng quay ngẫu nhiên: 6 đến 9 vòng + góc ngẫu nhiên
  const totalRounds = 6 + Math.random() * 3;
  const extraAngle = Math.random() * 2 * Math.PI;
  const targetRotation = totalRounds * 2 * Math.PI + extraAngle;

  const duration = 4500; // 4.5 giây
  const startTime = performance.now();
  const initialAngle = startAngle;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    startAngle = initialAngle + targetRotation * easedProgress;
    drawWheel();

    // Phát âm thanh khi vượt qua mỗi nan quạt
    const arc = (2 * Math.PI) / options.length;
    let norm = (startAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    let currentSlice = Math.floor(norm / arc);
    if (currentSlice !== lastTickIndex) {
      playTickSound();
      lastTickIndex = currentSlice;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      spinBtn.disabled = false;
      announceResult();
    }
  }

  requestAnimationFrame(animate);
});

/* ===================================================
   XỬ LÝ KẾT QUẢ & GOOGLE MAPS
   =================================================== */
function announceResult() {
  const num = options.length;
  const arc = (2 * Math.PI) / num;

  // Chuẩn hóa góc quay hiện tại
  let normalizedAngle = (startAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

  // Vị trí kim chỉ ở đỉnh vòng quay (góc 3*PI/2)
  let arrowAngle = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
  const winningIndex = Math.floor(arrowAngle / arc);
  const selectedPlace = options[winningIndex];

  // Phát chuông chúc mừng
  playVictorySound();

  // Hiển thị kết quả & link Google Maps
  resultTitle.textContent = `🎯 ${selectedPlace}`;
  resultAdvice.textContent = "Chốt kèo liền tay, xách xe lên và cùng xuất phát thôi!";
  
  gmapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace + " Hà Nội")}`;
  gmapLink.classList.remove("hidden");
}

// Khởi chạy ban đầu
renderList();