/* ===================================================
   WEB AUDIO API
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

function playTickSound() {
  try {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(560, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.035);
  } catch (e) {}
}

function playVictorySound() {
  try {
    initAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.09);
      osc.stop(audioCtx.currentTime + idx * 0.09 + 0.35);
    });
  } catch (e) {}
}

/* ===================================================
   DATABASE: TỔNG HỢP 60+ MÓN ĂN & 60+ ĐỊA ĐIỂM HÀ NỘI
   =================================================== */
const DATABASE = {
  food: {
    title: "Ăn Uống",
    categories: {
      sangTrua: {
        label: "🍜 Sáng & Trưa Chuẩn Vị",
        items: [
          "Phở Bát Đàn (Phố Cổ)", "Phở Thìn Lò Đúc", "Phở Gà Châm Yên Ninh",
          "Bún Chả Hàng Quạt", "Bún Chả Hương Liên", "Bún Đậu Hàng Khay",
          "Bún Đậu Ngõ Gạch", "Bánh Cuốn Bà Hoành", "Bún Thang Cầu Gỗ",
          "Bún Dọc Mùng Bát Đàn", "Xôi Xéo Bát Đàn", "Xôi Yến Nguyễn Hữu Huân",
          "Bún Ngan Nhàn Ngõ Trung Yên", "Bún Riêu Cua Hàng Bạc", "Bánh Đa Cua Hàng Chĩnh", "Cơm Tấm Phố Cổ"
        ]
      },
      toiDem: {
        label: "🍲 Lẩu, Nướng & Đêm Muộn",
        items: [
          "Lẩu Ếch Phó Đức Chính", "Lẩu Riêu Cua Hàng Tre", "Lẩu Bò Nhúng Dấm 555",
          "Lẩu Ốc Bà Tảo Khương Thượng", "Nướng Ngói Gầm Cầu", "Chân Gà Nướng Bà Triệu",
          "Ốc Hà Trang Đinh Liệt", "Ốc Nóng Tôn Thất Tùng", "Cháo Sườn Sụn Đồng Xuân",
          "Mì Gà Tần Hàng Bồ", "Bánh Mì Sốt Vang Đình Ngang", "Phở Xào Bắp Bò Bát Đàn",
          "Chả Cá Lã Vọng", "Cháo Gà Bà Mỹ Lý Quốc Sư", "Lòng Rán Nhất Quán"
        ]
      },
      anVat: {
        label: "🍢 Ăn Vặt Ngõ Phố",
        items: [
          "Nem Chua Rán Tạm Thương", "Bánh Gối Lý Quốc Sư", "Bánh Tôm Hồ Tây",
          "Nộm Bò Khô Bờ Hồ", "Nộm Chim Quay Hàm Long", "Tào Phớ Nghĩa Tân",
          "Trứng Chén Nướng Đội Cấn", "Bánh Rán Mặn Lạc Long Quân", "Bánh Rán Ngọt Ô Quan Chưởng",
          "Bò Bía Ngọt Ven Hồ Tây", "Kem Tràng Tiền", "Sữa Chua Dẻo Hàng Than",
          "Bánh Giò Đông Các", "Chè 4 Mùa Hàng Cân", "Bánh Tráng Cuốn Thịt Heo"
        ]
      },
      doUong: {
        label: "☕ Cà Phê & Trà Quán",
        items: [
          "Cafe Trứng Giảng Nguyễn Hữu Huân", "Cafe Đinh Ngắm Hồ Gươm", "Yên Cafe Quán Thánh",
          "Loading T Chân Cầm", "Trà Chanh Chợ Gạo", "Trà Đào Cam Sả Hồ Tây",
          "Cafe Ban Công Đinh Liệt", "Cộng Cafe Nhà Thờ", "Trà Sen Tây Hồ",
          "Chè Khúc Bạch Hàng Tre", "Sữa Chua Trân Châu Hạ Long", "Kem Bơ Cột Điện Bà Triệu",
          "Nước Mía Hàng Điếu", "Trà Sữa Oolong Đậm Vị", "Nước Sấu Đá Phố Cổ"
        ]
      }
    }
  },
  places: {
    title: "Đi Chơi",
    categories: {
      vanHoa: {
        label: "🏛️ Check-in & Di Tích",
        items: [
          "Di tích Nhà Tù Hỏa Lò", "Bảo tàng Dân tộc học", "Bảo tàng Mỹ thuật Việt Nam",
          "Hoàng thành Thăng Long", "Văn Miếu - Quốc Tử Giám", "Bảo tàng Lịch sử Quân sự VN",
          "Lăng Bác & Quảng trường Ba Đình", "Nhà hát Lớn Hà Nội", "Cầu Long Biên Đón Gió",
          "Phố Bích Họa Phùng Hưng", "Phố Sách 19/12 Hà Nội", "Nhà Thờ Lớn Hà Nội",
          "Làng Gốm Bát Tràng", "Thung Lũng Hoa Hồ Tây", "Chùa Trấn Quốc & Trúc Bạch"
        ]
      },
      giaiTri: {
        label: "🎯 Game & Trải Nghiệm",
        items: [
          "Đua xe Go-Kart (VS Racing)", "Bắn Cung Target Archery", "Leo Núi Nhân Tạo Vietclimb",
          "Tổ Hợp Board Game Phố Cổ", "Phòng Nhảy Bạt Nhún Jump Arena", "Sân Trượt Băng Royal City",
          "Thủy Cung Lotte Mall Tây Hồ", "Escape Room Thử Thách", "Bida Club Phố Cổ",
          "Axe Throwing Ném Rìu", "Bắn Súng Laser Tag", "Bắn Súng Sơn Paintball",
          "Workshop Tự Làm Đồ Da", "Workshop Làm Gốm Tự Nặn", "Workshop Nến Thơm & Tranh Vẽ"
        ]
      },
      chillPho: {
        label: "🌿 Dạo Phố & Hẹn Hò",
        items: [
          "Ngắm Hoàng Hôn Bến Hàn Quốc", "Đạp Vịt Hồ Trúc Bạch", "Lượn Đường Phan Đình Phùng",
          "Dạo Quanh Hồ Gươm Cuối Tuần", "Ngồi Trà Chanh Ngắm Nhà Thờ", "Chill Cà Phê Ven Hồ Tây",
          "Trải Nghiệm Ga Cát Linh - Hà Đông", "Cắm Trại Công Viên Yên Sở", "Vườn Hoa Bãi Đá Sông Hồng",
          "Xem Phim Rạp Quốc Gia", "Rạp Beta Chiếu Phim", "Cắm Trại Bãi Giữa Sông Hồng",
          "Hóng Mát Bờ Kè Hồ Tây", "Thăm Phố Cổ Ngõ Hẹp Đồng Xuân", "Check-in Cầu Nhật Tân Chiều Tà"
        ]
      },
      nightlife: {
        label: "🌙 Nightlife & Xuyên Đêm",
        items: [
          "Quẩy Xuyên Đêm Phố Bia Tạ Hiện", "Nghe Nhạc Jazz Bình Minh Jazz Club", "Thưởng Thức Acoustic Bar Phố Cổ",
          "Dạo Chợ Đêm Phố Cổ Đồng Xuân", "Hóng Gió Đêm Cầu Nhật Tân", "Food Tour Đêm Chợ Long Biên",
          "Chill Rooftop Bar Toàn Cảnh", "Ghé Pub Đường Tàu Phùng Hưng", "Trà Chanh Đêm Chợ Gạo",
          "Tour Đêm Giải Mã Hoàng Thành", "Tour Đêm Nhà Tù Hỏa Lò", "Hát Karaoke Cùng Hội Bạn",
          "Đài Quan Sát Lotte Center 65F", "Lượn Xe Một Vòng Hồ Tây 0h", "Xem Lễ Hạ Cờ 21h Lăng Bác"
        ]
      }
    }
  }
};

const WHEEL_PALETTE = [
  "#d97706", "#dc2626", "#b45309", "#059669",
  "#9333ea", "#2563eb", "#ea580c", "#0891b2"
];

/* ===================================================
   STATE MANAGEMENT
   =================================================== */
let currentMode = "food"; // "food" hoặc "places"
let currentCategoryKey = "sangTrua";
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

/* ===================================================
   SWITCH MODE & BUILD PRESET BUTTONS
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
    setupPresets();
    loadCategoryData();
  });
});

/* ===================================================
   CANVAS DRAWING
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

  let fontSize = 13;
  if (num > 10) fontSize = 11.5;
  if (num > 14) fontSize = 10;

  for (let i = 0; i < num; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = WHEEL_PALETTE[i % WHEEL_PALETTE.length];
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + arc);
    ctx.lineTo(cx, cy);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";

    const label = options[i].length > 19 ? options[i].substring(0, 17) + "..." : options[i];
    ctx.fillText(label, radius - 16, 4);
    ctx.restore();
  }
}

/* ===================================================
   RENDER LIST & LOCALSTORAGE
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
   SPIN LOGIC
   =================================================== */
spinBtn.addEventListener("click", () => {
  if (isSpinning || options.length < 2) {
    if (options.length < 2) alert("Vui lòng có ít nhất 2 mục để bắt đầu quay!");
    return;
  }

  initAudioContext();
  isSpinning = true;
  spinBtn.disabled = true;
  resultTitle.textContent = "Đang quay chọn kèo...";
  resultAdvice.textContent = "Bánh xe đang lướt qua khắp các phố phường Hà Nội...";
  gmapLink.classList.add("hidden");

  const totalRounds = 6 + Math.random() * 3;
  const extraAngle = Math.random() * 2 * Math.PI;
  const targetRotation = totalRounds * 2 * Math.PI + extraAngle;

  const duration = 4500;
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
   RESULT ANNOUNCEMENT
   =================================================== */
function announceResult() {
  const num = options.length;
  const arc = (2 * Math.PI) / num;

  let normalizedAngle = (startAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  let arrowAngle = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
  const winningIndex = Math.floor(arrowAngle / arc);
  const selected = options[winningIndex];

  playVictorySound();

  resultTitle.textContent = `🎯 ${selected}`;
  resultAdvice.textContent = currentMode === "food" 
    ? "Món ngon đã chốt, chuẩn bị lên phố lấp đầy chiếc bụng đói thôi!" 
    : "Điểm đến lý tưởng đã định, chuẩn bị đồ rồi lên đường quẩy thôi!";
  
  gmapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected + " Hà Nội")}`;
  gmapLink.classList.remove("hidden");
}

// Khởi tạo ban đầu
setupPresets();
loadCategoryData();
