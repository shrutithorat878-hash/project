// ══════════════════════════════════════════════
//  CineBook — script.js
//  Movie Ticket Booking System
//  All 6 internship tasks logic here
// ══════════════════════════════════════════════

// ─── MOVIE DATA ─────────────────────────────────────
const MOVIES = [
  {
    id: 1,
    title: "Pushpa 2: The Rule",
    genre: "Action",
    lang: "Telugu",
    rating: 8.4,
    duration: "3h 20m",
    poster: "/static/images/pushpa_2.webp",
    trailer: "https://www.youtube.com/embed/wKLtDKaHxNE",
    desc: "Pushpa Raj expands his smuggling empire while facing a fierce rivalry with SP Shekhawat in this explosive sequel.",
    price: 280,
    shows: ["10:00 AM", "1:30 PM", "5:00 PM", "9:15 PM"],
    theater: "PVR Cinemas, Mumbai"
  },
  {
    id: 2,
    title: "Kalki 2898 AD",
    genre: "Sci-Fi",
    lang: "Telugu",
    rating: 7.9,
    duration: "2h 51m",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ2MjkzYjctZGE5My00ZjRlLWIyNGQtMGIzY2I5Y2NhNjY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/pXMFtNpSAbs",
    desc: "A futuristic sci-fi epic blending Hindu mythology with dystopian world-building, set in the year 2898 AD.",
    price: 320,
    shows: ["11:00 AM", "2:30 PM", "6:00 PM", "10:00 PM"],
    theater: "INOX Megaplex, Pune"
  },
  {
    id: 3,
    title: "Fighter",
    genre: "Attack",
    lang: "Hindi",
    rating: 6.8,
    duration: "2h 46m",
    poster: "https://m.media-amazon.com/images/M/MV5BOTY5NDk4NWEtNDIxYS00MTAxLWIxMjMtMzZiZTZlNGRlODE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/VEzT3mR7fH8",
    desc: "India's Air Force takes on cross-border terrorism in this high-octane aerial action thriller.",
    price: 260,
    shows: ["9:30 AM", "12:45 PM", "4:15 PM", "8:30 PM"],
    theater: "Cinépolis, Delhi"
  },
  {
    id: 4,
    title: "Stree 2",
    genre: "Comedy",
    lang: "Hindi",
    rating: 8.1,
    duration: "2h 15m",
    poster: "https://m.media-amazon.com/images/M/MV5BZDNhMDliYWYtNWI0Zi00MmIzLTkyYzMtZWFmNTBiZDllMjk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/y0G6J5NQRKA",
    desc: "Chanderi is haunted once again — this time by a terrifying new female entity in this comedy-horror sequel.",
    price: 240,
    shows: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
    theater: "Carnival Cinemas, Bangalore"
  },
  {
    id: 5,
    title: "Inception 2",
    genre: "Sci-Fi",
    lang: "English",
    rating: 8.7,
    duration: "2h 58m",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    desc: "Dom Cobb returns to the world of dreams in this mind-bending sequel that pushes the boundaries of reality.",
    price: 350,
    shows: ["11:30 AM", "3:00 PM", "6:45 PM", "10:30 PM"],
    theater: "PVR IMAX, Mumbai"
  },
  {
    id: 6,
    title: "Animal",
    genre: "Drama",
    lang: "Hindi",
    rating: 7.2,
    duration: "3h 21m",
    poster: "https://m.media-amazon.com/images/M/MV5BYmU2ODI5ZWItYjBhNy00NzRlLTgwYzktNDU1Y2ZiMmFiNThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/E6-ZUr3OAx0",
    desc: "A son's obsessive love for his father spirals into a tale of violence, power and vengeance.",
    price: 270,
    shows: ["10:00 AM", "1:45 PM", "5:15 PM", "9:30 PM"],
    theater: "Miraj Cinemas, Pune"
  },
  {
    id: 7,
    title: "Jailer 2",
    genre: "Thriller",
    lang: "Hindi",
    rating: 7.8,
    duration: "2h 49m",
    poster: "https://m.media-amazon.com/images/M/MV5BM2YzOWMzZWQtODYyZi00YzljLWE5YTgtNWI3ODg5ZTZhMjk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/QHTPZM7KJ_w",
    desc: "A prison warden engineers a series of heists to bring justice to those failed by the system.",
    price: 290,
    shows: ["9:00 AM", "12:30 PM", "4:00 PM", "8:00 PM"],
    theater: "PVR Cinemas, Chennai"
  },
  {
    id: 8,
    title: "Dunki",
    genre: "Drama",
    lang: "Hindi",
    rating: 6.9,
    duration: "2h 41m",
    poster: "https://m.media-amazon.com/images/M/MV5BMzJhNTAzNTMtMGY5OS00YWFiLWE5NjgtNmI1ZGI2MjJhNDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/pMG8Hp69oiQ",
    desc: "Four friends dream of emigrating abroad and take the perilous 'donkey route' in this heartfelt comedy-drama.",
    price: 250,
    shows: ["10:45 AM", "2:15 PM", "5:45 PM", "9:45 PM"],
    theater: "INOX, Hyderabad"
  }
];

const THEATERS = [
  "PVR Cinemas, Juhu",
  "INOX Megaplex, Koregaon",
  "Cinépolis, Vasant Kunj",
  "Carnival Cinemas, Whitefield"
];

const TIMES   = ["10:00 AM", "12:30 PM", "3:00 PM", "6:15 PM", "9:30 PM"];
const ROWS    = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const COLS    = 10;

// ─── APP STATE ───────────────────────────────────────
const state = {
  genreFilter:   null,
  langFilter:    null,
  currentMovie:  null,
  currentShow:   null,
  selectedSeats: [],
  bookedSeats:   [],
  reservedSeats: [],
  timerInterval: null,
  timerSecs:     300,       // 5 minutes
  payMethod:     'card',
  bookingId:     null
};

// ══════════════════════════════
//  TASK 1 — GENRE & LANGUAGE FILTERS
// ══════════════════════════════

/**
 * Toggle a filter chip on/off.
 * Only one chip per group can be active at a time.
 */
function toggleChip(el, type) {
  const groupId = type === 'genre' ? 'genreChips' : 'langChips';
  const group   = document.getElementById(groupId);

  // Deactivate all chips in this group
  group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));

  // Activate clicked chip
  el.classList.add('active');

  // Update state
  if (type === 'genre') {
    state.genreFilter = el.dataset.val || null;
  } else {
    state.langFilter = el.dataset.val || null;
  }

  filterMovies();
}

/** Filter movies by search text + genre + language */
function filterMovies() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const genre  = document.querySelector('#genreChips .chip.active')?.dataset.val || '';
  const lang   = document.querySelector('#langChips .chip.active')?.dataset.val  || '';

  const filtered = MOVIES.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search);
    const matchGenre  = !genre || m.genre === genre;
    const matchLang   = !lang  || m.lang  === lang;
    return matchSearch && matchGenre && matchLang;
  });

  renderMovies(filtered);
}

// ══════════════════════════════
//  RENDER MOVIES GRID
// ══════════════════════════════

function renderMovies(list) {
  const grid = document.getElementById('moviesGrid');
  if (!list.length) {
    grid.innerHTML = `<div class="no-movies"><span>🎬</span>Try some another way.</div>`;
    return;
  }

  grid.innerHTML = list.map(m => `
    <div class="movie-card" onclick="openMovieModal(${m.id})">
      <div class="movie-poster-wrap">
        <img
          src="${m.poster}"
          alt="${m.title}"
          loading="lazy"
          onerror="this.src='https://placehold.co/200x300/0d0d14/e50914?text=${encodeURIComponent(m.title)}'"
        />
        <span class="movie-rating-badge">⭐ ${m.rating}</span>
        <span class="movie-lang-badge">${m.lang}</span>
      </div>
      <div class="movie-info">
        <div class="movie-title">${m.title}</div>
        <div class="movie-meta">
          <span>🕐 ${m.duration}</span>
          <span class="dot"></span>
          <span>₹${m.price}</span>
        </div>
        <div class="movie-genre-tag">${m.genre}</div>
        <button class="movie-book-btn" onclick="event.stopPropagation(); openMovieModal(${m.id})">
          🎟 Book Now
        </button>
      </div>
    </div>
  `).join('');
}

// ══════════════════════════════
//  TASK 3 — MOVIE DETAIL + YOUTUBE TRAILER
// ══════════════════════════════

function openMovieDetail(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  state.currentMovie = movie;

  // Fill modal content
  document.getElementById('mdTitle').textContent = movie.title;
  document.getElementById('mdDesc').textContent  = movie.desc;
  document.getElementById('mdTags').innerHTML = `
    <span class="tag">${movie.genre}</span>
    <span class="tag lang">${movie.lang}</span>
    <span class="tag">⭐ ${movie.rating}</span>
    <span class="tag">₹${movie.price} / seat</span>
  `;

  // Embed YouTube trailer (autoplay + mute)
  document.getElementById('trailerFrame').src = `${movie.trailer}?autoplay=1&mute=1`;

  // Generate showtimes
  const showEl = document.getElementById('mdShowtimes');
  showEl.innerHTML = THEATERS.slice(0, 2).map(theater =>
    TIMES.slice(0, 3).map(time => `
      <button class="showtime-btn" onclick="openSeatSelection('${theater}', '${time}')">
        <span class="time">${time}</span>
        <span class="theater">${theater.split(',')[0]}</span>
      </button>
    `).join('')
  ).join('');

  openModal('movieModal');
}

// ══════════════════════════════
//  TASK 5 — SEAT SELECTION + RESERVATION TIMEOUT
// ══════════════════════════════

function openSeatSelection(theater, time) {
  // Close movie detail first (stops trailer)
  closeModal('movieModal');
  document.getElementById('trailerFrame').src = '';

  // Store show info
  state.currentShow  = { theater, time };
  state.selectedSeats = [];

  // Set modal headers
  document.getElementById('seatMovieTitle').textContent = state.currentMovie.title;
  document.getElementById('seatShowInfo').textContent   = `${theater} · ${time}`;

  // Pre-generate booked & reserved seats randomly
  state.bookedSeats   = getRandomSeats(8, []);
  state.reservedSeats = getRandomSeats(4, state.bookedSeats);

  // Build the seat grid
  buildSeatGrid();

  // Reset UI
  document.getElementById('reservationTimer').style.display  = 'none';
  document.getElementById('bookingSummary').style.display    = 'none';
  document.getElementById('proceedPayBtn').disabled          = true;

  openModal('seatModal');
}

/** Generate N random unique seat IDs, avoiding 'exclude' list */
function getRandomSeats(n, exclude) {
  const seats = [];
  let safety  = 0;
  while (seats.length < n && safety < 300) {
    const row  = ROWS[Math.floor(Math.random() * ROWS.length)];
    const col  = Math.floor(Math.random() * COLS) + 1;
    const sid  = row + col;
    if (!seats.includes(sid) && !exclude.includes(sid)) {
      seats.push(sid);
    }
    safety++;
  }
  return seats;
}

/** Render the seat grid into #seatGrid */
function buildSeatGrid() {
  const grid = document.getElementById('seatGrid');
  grid.innerHTML = '';

  ROWS.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';

    // Row label
    const label = document.createElement('span');
    label.className   = 'row-label';
    label.textContent = row;
    rowDiv.appendChild(label);

    for (let c = 1; c <= COLS; c++) {
      // Add gap in the middle
      if (c === 6) {
        const gap = document.createElement('div');
        gap.className = 'seat-gap';
        rowDiv.appendChild(gap);
      }

      const sid        = row + c;
      const isBooked   = state.bookedSeats.includes(sid);
      const isReserved = state.reservedSeats.includes(sid);

      const seat       = document.createElement('div');
      seat.className   = 'seat' + (isBooked ? ' booked' : isReserved ? ' reserved' : '');
      seat.id          = 'seat-' + sid;
      seat.textContent = c;
      seat.onclick     = () => toggleSeat(sid, isBooked || isReserved);

      rowDiv.appendChild(seat);
    }

    grid.appendChild(rowDiv);
  });
}

/** Toggle seat selection on/off */
function toggleSeat(sid, isDisabled) {
  if (isDisabled) return;

  const el  = document.getElementById('seat-' + sid);
  const idx = state.selectedSeats.indexOf(sid);

  if (idx === -1) {
    // Select
    if (state.selectedSeats.length >= 8) {
      showToast('Maximum 8 seats can be selected at once', 'error');
      return;
    }
    state.selectedSeats.push(sid);
    el.classList.add('selected');

    // Start 5-minute timer on first selection (TASK 5)
    if (state.selectedSeats.length === 1 && !state.timerInterval) {
      startReservationTimer();
    }
  } else {
    // Deselect
    state.selectedSeats.splice(idx, 1);
    el.classList.remove('selected');

    // Stop timer if no seats selected
    if (state.selectedSeats.length === 0) {
      clearTimer();
    }
  }

  updateBookingSummary();
}

/** Update the booking summary panel */
function updateBookingSummary() {
  const hasSeats = state.selectedSeats.length > 0;
  const summary  = document.getElementById('bookingSummary');
  const payBtn   = document.getElementById('proceedPayBtn');

  summary.style.display = hasSeats ? 'block' : 'none';
  payBtn.disabled       = !hasSeats;

  if (!hasSeats) return;

  const price = state.currentMovie.price;
  const total = price * state.selectedSeats.length;

  document.getElementById('sumMovie').textContent = state.currentMovie.title;
  document.getElementById('sumShow').textContent  = `${state.currentShow.theater} · ${state.currentShow.time}`;
  document.getElementById('sumSeats').textContent = state.selectedSeats.join(', ');
  document.getElementById('sumPrice').textContent = '₹' + price;
  document.getElementById('sumTotal').textContent = '₹' + total;
}

// ── Seat Reservation Timer (TASK 5) ──

/** Start the 5-minute countdown timer */
function startReservationTimer() {
  state.timerSecs = 300; // 5 minutes

  document.getElementById('reservationTimer').style.display = 'flex';
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timerSecs--;
    updateTimerDisplay();

    if (state.timerSecs <= 0) {
      // Time's up — release seats automatically
      clearTimer();
      closeModal('seatModal');
      state.selectedSeats = [];
      showToast('⏰ Seat reservation timed out! Please select seats again.', 'error');
    }
  }, 1000);
}

/** Update the countdown display */
function updateTimerDisplay() {
  const mins = Math.floor(state.timerSecs / 60);
  const secs = state.timerSecs % 60;
  const el   = document.getElementById('timerDisplay');

  el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  el.className   = 'timer-count' + (state.timerSecs <= 60 ? ' urgent' : '');
}

/** Stop and reset the timer */
function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  document.getElementById('reservationTimer').style.display = 'none';
}

// ══════════════════════════════
//  TASK 4 — PAYMENT GATEWAY INTEGRATION
// ══════════════════════════════

function openPayment() {
  if (state.selectedSeats.length === 0) return;

  const total = state.currentMovie.price * state.selectedSeats.length;

  document.getElementById('payInfo').textContent  = `${state.currentMovie.title} · ${state.selectedSeats.length} seat(s)`;
  document.getElementById('payTotal').textContent = `Total: ₹${total}`;

  // Reset to card form by default
  renderCardForm();

  openModal('paymentModal');
}

/** Highlight selected payment method and update form */
function selectPayment(el, method) {
  document.querySelectorAll('.payment-method').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
  state.payMethod = method;

  const form = document.getElementById('payForm');

  switch (method) {
    case 'upi':
      form.innerHTML = `
        <input type="text" placeholder="Enter UPI ID (e.g. name@okaxis)"/>
      `;
      break;

    case 'razorpay':
      form.innerHTML = `
        <div style="background:rgba(46,196,182,0.07);border:1px solid rgba(46,196,182,0.2);
          border-radius:10px;padding:18px;text-align:center;color:var(--teal);font-size:0.9rem;line-height:1.6">
          ⚡ You will be redirected to<br><strong>Razorpay Secure Checkout</strong>
        </div>
      `;
      break;

    case 'wallet':
      form.innerHTML = `
        <input type="text"     placeholder="Registered Mobile Number"/>
        <input type="text"     placeholder="Enter Wallet OTP"/>
      `;
      break;

    default:
      renderCardForm();
  }
}

/** Render the default credit/debit card form */
function renderCardForm() {
  document.getElementById('payForm').innerHTML = `
    <input type="text"     id="cardName" placeholder="Cardholder Name"/>
    <input type="text"     id="cardNum"  placeholder="Card Number (16 digits)" maxlength="19" oninput="formatCard(this)"/>
    <div class="pay-row">
      <input type="text"     id="cardExp"  placeholder="MM / YY" maxlength="5" oninput="formatExp(this)"/>
      <input type="password" id="cardCvv"  placeholder="CVV" maxlength="3"/>
    </div>
  `;
}

/** Format card number with spaces every 4 digits */
function formatCard(el) {
  el.value = el.value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
    .slice(0, 19);
}

/** Format expiry date as MM/YY */
function formatExp(el) {
  el.value = el.value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
}

/** Simulate payment processing (success/failure handling) */
function processPayment() {
  const loading = document.getElementById('loadingOverlay');
  document.getElementById('loadingText').textContent = 'Processing payment securely...';
  loading.classList.add('open');

  // Simulate API delay (Razorpay / Stripe latency)
  setTimeout(() => {
    loading.classList.remove('open');

    // Simulate ~90% success rate
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      closeModal('paymentModal');
      clearTimer();
      showBookingConfirmation();
    } else {
      showToast('❌ Payment failed. Please check your details and try again.', 'error');
    }
  }, 2200);
}

// ══════════════════════════════
//  TASK 2 — TICKET EMAIL CONFIRMATION
// ══════════════════════════════

function showBookingConfirmation() {
  // Generate unique booking ID
  state.bookingId = 'CB' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const total   = state.currentMovie.price * state.selectedSeats.length;
  const today   = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  // Fill ticket details
  document.getElementById('tcMovie').textContent   = state.currentMovie.title;
  document.getElementById('tcTheater').textContent = state.currentShow.theater;
  document.getElementById('tcId').textContent      = '#' + state.bookingId;
  document.getElementById('tcDate').textContent    = today;
  document.getElementById('tcTime').textContent    = state.currentShow.time;
  document.getElementById('tcSeats').textContent   = state.selectedSeats.join(', ');
  document.getElementById('tcAmount').textContent  = '₹' + total;

  // Email confirmation (TASK 2)
  document.getElementById('confirmEmail').textContent = 'user@email.com';

  openModal('successModal');
  showToast('✅ Payment successful! Booking confirmed.');
}

/** Simulate ticket PDF download */
function downloadTicket() {
  showToast('📄 Ticket downloaded as PDF!');
}

/** Reset booking state after modal closes */
function resetBooking() {
  state.selectedSeats = [];
  state.currentMovie  = null;
  state.currentShow   = null;
  state.bookingId     = null;
}

// ══════════════════════════════
//  TASK 6 — ADMIN DASHBOARD CHARTS
// ══════════════════════════════

const REVENUE_DATA = [
  { l: 'Mon', v: 62000 },
  { l: 'Tue', v: 48000 },
  { l: 'Wed', v: 71000 },
  { l: 'Thu', v: 55000 },
  { l: 'Fri', v: 89000 },
  { l: 'Sat', v: 112000 },
  { l: 'Sun', v: 98000 }
];

const TICKETS_DATA = [
  { l: 'Mon', v: 198 },
  { l: 'Tue', v: 152 },
  { l: 'Wed', v: 231 },
  { l: 'Thu', v: 178 },
  { l: 'Fri', v: 289 },
  { l: 'Sat', v: 364 },
  { l: 'Sun', v: 318 }
];

/** Build both bar charts for the admin dashboard */
function buildCharts() {
  buildBarChart('revenueChart', REVENUE_DATA, 'red',
    v => '₹' + (v / 1000).toFixed(0) + 'k');

  buildBarChart('ticketsChart', TICKETS_DATA, 'teal',
    v => String(v));
}

/**
 * Render a bar chart into a container element.
 * @param {string} containerId - ID of the .bar-chart div
 * @param {Array}  data        - Array of { l: label, v: value }
 * @param {string} colorClass  - CSS class ('red' or 'teal')
 * @param {Function} formatter - Value formatter function
 */
function buildBarChart(containerId, data, colorClass, formatter) {
  const container = document.getElementById(containerId);
  const maxVal    = Math.max(...data.map(d => d.v));

  container.innerHTML = data.map(d => `
    <div class="bar-wrap">
      <span class="bar-val">${formatter(d.v)}</span>
      <div class="bar ${colorClass === 'teal' ? 'teal' : ''}"
           style="height:${Math.round((d.v / maxVal) * 100)}px">
      </div>
      <span class="bar-label">${d.l}</span>
    </div>
  `).join('');
}

// ══════════════════════════════
//  PAGE SWITCHING
// ══════════════════════════════

function showPage(pageName, btnEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  document.getElementById(pageName).classList.add('active');

  // Update nav button active state
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Build charts when admin page opens
  if (pageName === 'admin') {
    buildCharts();
  }
}

// ══════════════════════════════
//  MODAL HELPERS
// ══════════════════════════════

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // Stop trailer when movie modal closes
  if (id === 'movieModal') {
    document.getElementById('trailerFrame').src = '';
  }
}

// ══════════════════════════════
//  TOAST NOTIFICATION
// ══════════════════════════════

let toastTimer = null;

/**
 * Show a toast notification.
 * @param {string} message - Toast text
 * @param {string} type    - '' (success) or 'error'
 */
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className   = 'toast show' + (type === 'error' ? ' error' : '');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ══════════════════════════════
//  INIT — Run on page load
// ══════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  renderMovies(MOVIES);
  buildCharts(); // your existing chart render
});
