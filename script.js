/* ===================================================
   WEB AUDIO API (Bọc an toàn tránh lỗi chặn âm thanh)
   =================================================== */
let audioCtx = null;

function getAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    return null;
  }
}

function playTickSound() {
  try {
    const ctxA = getAudioContext();
    if (!ctxA) return;

    const osc = ctxA.createOscillator();
    const gain = ctxA.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(560, ctxA.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctxA.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, ctxA.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctxA.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctxA.destination);

    osc.start();
    osc.stop(ctxA.currentTime + 0.035);
  } catch (e) {}
}

function playVictorySound() {
  try {
    const ctxA = getAudioContext();
    if (!ctxA) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctxA.createOscillator();
      const gain = ctxA.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctxA.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.15, ctxA.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, ctxA.currentTime + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctxA.destination);

      osc.start(ctxA.currentTime + idx * 0.09);
      osc.stop(ctxA.currentTime + idx * 0.09 + 0.35);
    });
  } catch (e) {}
}

/* ===================================================
   DATABASE: 100+ MÓN ĂN & 100+ ĐỊA ĐIỂM HÀ NỘI
   =================================================== */
const DATABASE = {
  food: {
    title: "Ăn Uống",
    categories: {
      allFood: {
        label: "🔥 TẤT CẢ (102 Món)",
        items: []
      },
      phoBunXoi: {
        label: "🍜 Phở, Bún & Xôi (25)",
        items: [
          "Phở Bát Đàn (Phố Cổ)", "Phở Thìn Lò Đúc", "Phở Gà Châm Yên Ninh", "Phở Lý Quốc Sư",
          "Phở Khôi Hói Hàng Vải", "Phở Bò Gốc Gạo", "Phở Cuốn Hương Mai Ngũ Xã", "Phở Chiên Phồng Ngũ Xã",
          "Bún Chả Hàng Quạt", "Bún Chả Hương Liên", "Bún Chả Đắc Kim", "Bún Đậu Hàng Khay",
          "Bún Đậu Ngõ Gạch", "Bún Đậu Trung Hương Ngõ Phất Lộc", "Bún Thang Cầu Gỗ", "Bún Thang Hàng Hòm",
          "Bún Dọc Mùng Bát Đàn", "Bún Ngan Nhàn Ngõ Trung Yên", "Bún Ngan Cháy Tỏi Hàng Thiếc", "Bún Riêu Cua Hàng Bạc",
          "Bún Riêu Quang Trung", "Bún Ốc Giang Lương Ngọc Quyến", "Bún Ốc Nguội Ô Quan Chưởng", "Xôi Xéo Bát Đàn",
          "Xôi Yến Nguyễn Hữu Huân"
        ]
      },
      lauNuongNhao: {
        label: "🍲 Lẩu, Nướng & Nhậu (26)",
        items: [
          "Lẩu Ếch Phó Đức Chính", "Lẩu Ếch Trúc Bạch", "Lẩu Riêu Cua Hàng Tre", "Lẩu Riêu Bắp Bò Phó Đức Chính",
          "Lẩu Bò Nhúng Dấm 555", "Lẩu Ốc Bà Tảo Khương Thượng", "Lẩu Gà Lá É Đội Cấn", "Lẩu Dê Nhất Ly",
          "Lẩu Nấm Gia Khánh", "Nướng Ngói Gầm Cầu", "Nướng Vỉa Hè Phố Mã Mây", "Nướng Bơ Xuân Kiên",
          "Chân Gà Nướng Bà Triệu", "Chân Gà Nướng Ngõ Gạch", "Cánh Gà Nướng Thụy Khuê", "Ốc Hà Trang Đinh Liệt",
          "Ốc Nóng Tôn Thất Tùng", "Ốc Oanh Hàm Long", "Chả Cá Lã Vọng", "Chả Cá Thăng Long",
          "Lòng Rán Nhất Quán Nguyễn Siêu", "Nõn Đuôi Rán Hàng Gà", "Dạ Dày Nướng Gầm Cầu", "Bia Hơi Hải Xồm",
          "Bia Hơi Lan Chín", "Bia Hơi Cường Hói"
        ]
      },
      anVatBanh: {
        label: "🍢 Ăn Vặt & Bánh Truyền Thống (26)",
        items: [
          "Nem Chua Rán Tạm Thương", "Bánh Gối Lý Quốc Sư", "Bánh Tôm Cô Ầm Đồng Xuân", "Bánh Tôm Thanh Niên",
          "Nộm Bò Khô Bờ Hồ", "Nộm Bò Khô Long Vi Quán", "Nộm Chim Quay Hàm Long", "Tào Phớ Nghĩa Tân",
          "Tào Phớ Cột Điện Yên Hòa", "Trứng Chén Nướng Đội Cấn", "Bánh Rán Mặn Lạc Long Quân", "Bánh Rán Ngọt Ô Quan Chưởng",
          "Bò Bía Ngọt Ven Hồ Tây", "Bánh Giò Đông Các", "Bánh Giò Thụy Khuê", "Bánh Cuốn Bà Hoành",
          "Bánh Cuốn Gia An", "Bánh Cuốn Nóng Hàng Gà", "Bánh Mì Lãn Ông", "Bánh Mì Dân Tổ",
          "Bánh Mì Trâm Đình Ngang", "Bánh Mì Chảo Cột Điện", "Bánh Mì Nem Khoai Ngõ Tự Do", "Bánh Tráng Cuốn Thịt Heo Hoàng Bèo",
          "Bánh Đúc Nóng Lê Ngọc Hân", "Bánh Xèo Đội Cấn"
        ]
      },
      demKhuyaChe: {
        label: "☕ Đêm Khuya & Tráng Miệng (25)",
        items: [
          "Cháo Sườn Sụn Đồng Xuân", "Cháo Sườn Bách Khoa", "Cháo Trai Trần Xuân Soạn", "Cháo Gà Bà Mỹ Lý Quốc Sư",
          "Mì Gà Tần Hàng Bồ", "Mì Tim Cật Chùa Vua", "Phở Xào Bắp Bò Bát Đàn", "Cơm Tấm Sườn Đào Duy Từ",
          "Cafe Trứng Giảng Nguyễn Hữu Huân", "Cafe Đinh Ngắm Hồ Gươm", "Yên Cafe Quán Thánh", "Loading T Chân Cầm",
          "Trà Chanh Chợ Gạo", "Trà Chanh Nhà Thờ Lớn", "Trà Đào Cam Sả Ven Hồ Tây", "Cafe Ban Công Đinh Liệt",
          "Trà Sen Tây Hồ", "Chè 4 Mùa Hàng Cân", "Chè Xoài Nguyễn Trường Tộ", "Chè Khúc Bạch Hàng Tre",
          "Kem Tràng Tiền", "Kem Bơ Cột Điện Bà Triệu", "Sữa Chua Dẻo Hàng Than", "Sữa Chua Trân Châu Hạ Long",
          "Nước Mía Trân Châu Hàng Điếu"
        ]
      }
    }
  },
  places: {
    title: "Đi Chơi",
    categories: {
      allPlaces: {
        label: "🔥 TẤT CẢ (101 Điểm)",
        items: []
      },
      vanHoaDiTich: {
        label: "🏛️ Check-in & Di Tích (25)",
        items: [
          "Di tích Nhà Tù Hỏa Lò", "Bảo tàng Dân tộc học", "Bảo tàng Mỹ thuật Việt Nam", "Hoàng thành Thăng Long",
          "Văn Miếu - Quốc Tử Giám", "Bảo tàng Lịch sử Quân sự VN", "Lăng Bác & Quảng trường Ba Đình", "Nhà hát Lớn Hà Nội",
          "Cầu Long Biên Đón Gió", "Phố Bích Họa Phùng Hưng", "Phố Sách 19/12 Hà Nội", "Nhà Thờ Lớn Hà Nội",
          "Chùa Trấn Quốc Hồ Tây", "Chùa Một Cột", "Đền Ngọc Sơn Hồ Gươm", "Tháp Nước Hàng Đậu",
          "Làng Gốm Bát Tràng", "Làng Lụa Vạn Phúc", "Làng Nón Chuông", "Làng Hương Quảng Phú Cầu",
          "Bảo tàng Thiên Nhiên VN", "Cột Cờ Hà Nội", "Cửa Bắc Hoàng Thành", "Ô Quan Chưởng",
          "Nhà Cổ 87 Mã Mây"
        ]
      },
      gameTraiNghiem: {
        label: "🎯 Trò Chơi & Vận Động (25)",
        items: [
          "Đua xe Go-Kart (VS Racing)", "Bắn Cung Target Archery", "Leo Núi Nhân Tạo Vietclimb", "Tổ Hợp Board Game Phố Cổ",
          "Phòng Nhảy Bạt Nhún Jump Arena", "Sân Trượt Băng Royal City", "Thủy Cung Lotte Mall Tây Hồ", "Thủy Cung Vinpearl Times City",
          "Trải nghiệm Escape Room Hà Nội", "Bida Club Phố Cổ", "Axe Throwing Ném Rìu", "Bắn Súng Laser Tag",
          "Bắn Súng Sơn Paintball Tây Hồ", "Workshop Làm Đồ Da Thủ Công", "Workshop Gốm Tự Nặn Bát Tràng", "Workshop Nến Thơm & Tranh Vẽ",
          "Bowling Times City Mega Mall", "Bowling Aeon Mall Hà Đông", "Sân Golf 3D Trong Nhà", "Phòng Đập Phá Đồ Xả Stress",
          "Khu Vui Chơi Wolfoo City", "Bể Bơi Vô Cực Khách Sạn Thắng Lợi", "Bể Bơi Bốn Mùa Khăn Quàng Đỏ", "Đạp Xe Quanh Vòng Hồ Tây",
          "Chèo Thuyền SUP Bến Sâm Hồ Tây"
        ]
      },
      chillThienNhien: {
        label: "🌿 Chill & Ngắm Cảnh (26)",
        items: [
          "Ngắm Hoàng Hôn Bến Hàn Quốc", "Đạp Vịt Hồ Trúc Bạch", "Lượn Đường Phan Đình Phùng", "Dạo Quanh Phố Đi Bộ Hồ Gươm",
          "Ngồi Trà Chanh Ngắm Nhà Thờ", "Trải Nghiệm Ga Cát Linh - Hà Đông", "Cắm Trại Công Viên Yên Sở", "Vườn Hoa Bãi Đá Sông Hồng",
          "Thung Lũng Hoa Hồ Tây", "Camping Bãi Giữa Sông Hồng", "Hóng Mát Bờ Kè Hồ Tây", "Vườn Bách Thảo Hà Nội",
          "Công Viên Thủ Lệ", "Công Viên Cầu Giấy", "Công Viên Hòa Bình", "Khu Đô Thị Ecopark Xanh Mát",
          "Check-in Cầu Nhật Tân Chiều Tà", "Rạp Chiếu Phim Quốc Gia", "Rạp Beta Chiếu Phim", "Cà Phê Đường Tàu Phùng Hưng",
          "Chill Rooftop Cà Phê Ngắm Trọn Thành Phố", "Hồ Đồng Đò Sóc Sơn", "Núi Hàm Lợn Cắm Trại", "Thung Lũng Bản Rõm Sóc Sơn",
          "Vườn Quốc Gia Ba Vì", "Làng Cổ Đường Lâm"
        ]
      },
      nightlifeGiaiTri: {
        label: "🌙 Nightlife & Đêm Muộn (25)",
        items: [
          "Quẩy Xuyên Đêm Phố Bia Tạ Hiện", "Nghe Nhạc Jazz Bình Minh Jazz Club", "Acoustic Live Music Bar Phố Cổ", "Dạo Chợ Đêm Phố Cổ Đồng Xuân",
          "Hóng Gió Đêm Cầu Nhật Tân", "Food Tour Đêm Chợ Long Biên", "Chill Rooftop Bar Khách Sạn Lotte", "Pub Nhẹ Nhàng Khu Quảng An",
          "Trà Chanh Đêm Chợ Gạo", "Tour Đêm Giải Mã Hoàng Thành", "Tour Đêm Nhà Tù Hỏa Lò", "Hát Karaoke Tụ Tập Bạn Bè",
          "Đài Quan Sát Lotte Center 65F", "Lượn Xe Một Vòng Hồ Tây Lúc 0h", "Xem Lễ Hạ Cờ 21h Quảng Trường Ba Đình", "Xem Lễ Thượng Cờ 6h Sáng Lăng Bác",
          "Phòng Chiếu Phim Đêm CGV Lotte", "Bar Speakeasy Bí Mật Phố Cổ", "Quán Nhậu Xuyên Đêm Gầm Cầu", "Ngắm Bình Minh Cầu Vĩnh Tuy",
          "Ghé Chợ Hoa Đêm Quảng Bá", "Check-in Phố Đi Bộ Trần Nhân Tông", "Dạo Phố Đi Bộ Thành Cổ Sơn Tây", "Chợ Đêm Sinh Viên Dịch Vọng",
          "Chợ Đêm Phùng Khoang"
        ]
      }
    }
  }
};

// Tự động gộp toàn bộ danh sách vào mục TẤT CẢ (>100 món / >100 điểm)
DATABASE.food.categories.allFood.items = [
  ...DATABASE.food.categories.phoBunXoi.items,
  ...DATABASE.food.categories.lauNuongNhao.items,
  ...DATABASE.food.categories.anVatBanh.items,
  ...DATABASE.food.categories.demKhuyaChe.items
];

DATABASE.places.categories.allPlaces.items = [
  ...DATABASE.places.categories.vanHoaDiTich.items,
  ...DATABASE.places.categories.gameTraiNghiem.items,
  ...DATABASE.places.categories.chillThienNhien.items,
  ...DATABASE.places.categories.nightlifeGiaiTri.items
];

const WHEEL_PALETTE = [
  "#d97706", "#dc2626", "#b45309", "#059669",
  "#9333ea", "#2563eb", "#ea580c", "#0891b2"
];

/* ===================================================
   TỰ ĐỘNG LÀM MỚI BỘ NHỚ LOCALSTORAGE (Tránh dính 10 món cũ)
   =================================================== */
const APP_VERSION = "hanoi_super_100_v1";
if (localStorage.getItem("hanoi_app_ver") !== APP_VERSION) {
  localStorage.clear();
  localStorage.setItem("hanoi_app_ver", APP_VERSION);
}

let currentMode = "food";
let currentCategoryKey = "allFood";
let options = [];
let startAngle = 0;
let isSpinning = false;
let lastTickIndex = -1;

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultTitle = document.getElementById("resultTitle");
const resultAdvice = document.getElementById("resultAdvice");
const gmapLink = document.getElementById("gmapLink");
const itemsWrapper = document.getElementById("itemsWrapper");
const counterText = document.getElementById("counterText");
const addForm = document.getElementById("addForm");
const itemInput = document.getElementById("itemInput");
const resetAllBtn = document.getElementById("resetAllBtn");
const modeBtns = document.querySelectorAll(".mode-btn");
const presetGroup = document.getElementById("presetGroup");

// DOM elements cho Modal Popup & Confetti
const winnerModal = document.getElementById("winnerModal");
const modalWinnerName = document.getElementById("modalWinnerName");
const modalWinnerSub = document.getElementById("modalWinnerSub");
const modalGmapLink = document.getElementById("modalGmapLink");
const closeModalBtn = document.getElementById("closeModalBtn");
const confettiCanvas = document.getElementById("confettiCanvas");

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    winnerModal.classList.add("hidden");
  });
}

/* ===================================================
   HIỆU ỨNG PHÁO HOA GIẤY (CONFETTI CANVAS)
   =================================================== */
function triggerConfetti() {
  if (!confettiCanvas) return;
  const cctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#ec4899", "#fbbf24", "#8b5cf6"];

  for (let i = 0; i < 110; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 8 + 4,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 18,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      dr: Math.random() * 10 - 5
    });
  }

  let frameCount = 0;
  function renderConfetti() {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38;
      p.rotation += p.dr;

      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate((p.rotation * Math.PI) / 180);
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cctx.restore();
    });

    frameCount++;
    if (frameCount < 130) {
      requestAnimationFrame(renderConfetti);
    } else {
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  requestAnimationFrame(renderConfetti);
}

/* ===================================================
   QUẢN LÝ PRESET & DANH MỤC
   =================================================== */
function setupPresets() {
  presetGroup.innerHTML = "";
  const categories = DATABASE[currentMode].categories;
  const keys = Object.keys(categories);

  if (!keys.includes(currentCategoryKey)) {
    currentCategoryKey = keys[0];
  }

  keys.forEach((key) => {
    const btn = document.createElement("button");
    btn.className = `preset-tag ${key === currentCategoryKey ? "active" : ""}`;
    btn.textContent = categories[key].label;
    btn.addEventListener("click", () => {
      if (isSpinning) return;
      document.querySelectorAll(".preset-tag").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      currentCategoryKey = key;
      loadCategoryData();
    });
    presetGroup.appendChild(btn);
  });
}

function loadCategoryData() {
  const defaultItems = DATABASE[currentMode].categories[currentCategoryKey].items;
  const storageKey = `hanoi_${currentMode}_${currentCategoryKey}`;
  options = JSON.parse(localStorage.getItem(storageKey)) || [...defaultItems];
  renderList();
}

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isSpinning) return;
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    currentCategoryKey = currentMode === "food" ? "allFood" : "allPlaces";
    setupPresets();
    loadCategoryData();
  });
});

/* ===================================================
   VẼ VÒNG QUAY CANVAS (TỐI ƯU KHI CÓ >100 NAN)
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

  // Tự động điều chỉnh font chữ và độ dài nhãn theo số lượng
  let fontSize = 13;
  let maxLen = 18;
  if (num > 20) { fontSize = 10; maxLen = 15; }
  if (num > 45) { fontSize = 8.5; maxLen = 12; }
  if (num > 80) { fontSize = 6.5; maxLen = 10; }

  for (let i = 0; i < num; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = WHEEL_PALETTE[i % WHEEL_PALETTE.length];
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + arc);
    ctx.lineTo(cx, cy);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";

    const label = options[i].length > maxLen ? options[i].substring(0, maxLen - 2) + ".." : options[i];
    ctx.fillText(label, radius - 14, 3);
    ctx.restore();
  }
}

/* ===================================================
   RENDER DANH SÁCH & LƯU LOCALSTORAGE
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

  const storageKey = `hanoi_${currentMode}_${currentCategoryKey}`;
  localStorage.setItem(storageKey, JSON.stringify(options));
  drawWheel();
}

window.removeItem = function(index) {
  if (isSpinning) return;
  options.splice(index, 1);
  renderList();
};

resetAllBtn.addEventListener("click", () => {
  if (isSpinning) return;
  options = [...DATABASE[currentMode].categories[currentCategoryKey].items];
  renderList();
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = itemInput.value.trim();
  if (val) {
    options.push(val);
    itemInput.value = "";
    renderList();
  }
});

/* ===================================================
   LOGIC QUAY BÁNH XE (EASING OUT CUBIC)
   =================================================== */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  if (!options || options.length < 2) {
    alert("Vui lòng có ít nhất 2 mục để bắt đầu quay!");
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;
  resultTitle.textContent = "Đang quay chọn kèo...";
  resultAdvice.textContent = "Bánh xe đang lướt qua khắp 36 phố phường Hà Nội...";
  gmapLink.classList.add("hidden");

  const totalRounds = 5 + Math.random() * 3;
  const extraAngle = Math.random() * 2 * Math.PI;
  const targetRotation = totalRounds * 2 * Math.PI + extraAngle;

  const duration = 4200;
  let startTime = null;
  const initialAngle = startAngle;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    startAngle = initialAngle + targetRotation * easedProgress;
    drawWheel();

    if (options.length > 0) {
      const arc = (2 * Math.PI) / options.length;
      let norm = (startAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      let currentSlice = Math.floor(norm / arc);
      if (currentSlice !== lastTickIndex) {
        playTickSound();
        lastTickIndex = currentSlice;
      }
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
   HIỂN THỊ KẾT QUẢ & POPUP PHÁO HOA
   =================================================== */
function announceResult() {
  const num = options.length;
  if (num === 0) return;

  const arc = (2 * Math.PI) / num;
  let normalizedAngle = (startAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  let arrowAngle = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
  const winningIndex = Math.floor(arrowAngle / arc);
  const selected = options[winningIndex];

  // Phát nhạc chúc mừng
  playVictorySound();

  // Cập nhật card nhỏ bên dưới vòng quay
  resultTitle.textContent = `🎯 ${selected}`;
  resultAdvice.textContent = currentMode === "food" 
    ? "Món ngon đã chốt, chuẩn bị lên phố lấp đầy chiếc bụng đói thôi!" 
    : "Điểm đến lý tưởng đã định, chuẩn bị đồ rồi lên đường quẩy thôi!";

  const gmapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected + " Hà Nội")}`;
  gmapLink.href = gmapUrl;
  gmapLink.classList.remove("hidden");

  // Hiển thị Modal Popup & Pháo hoa
  if (winnerModal && modalWinnerName) {
    modalWinnerName.textContent = selected;
    modalWinnerSub.textContent = currentMode === "food"
      ? "Kèo ăn uống đã chốt chuẩn vị, xách xe đi thưởng thức ngay thôi!"
      : "Địa điểm đã định, rủ ngay bạn bè lên đồ xuất phát!";
    modalGmapLink.href = gmapUrl;
    winnerModal.classList.remove("hidden");
    triggerConfetti();
  }
}

// Khởi chạy khi load trang
setupPresets();
loadCategoryData();
