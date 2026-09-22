# Bharanatheril Sree Bhadra Bhagavathy Temple Website
**ഭരണത്തേരിൽ ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം, തുറയിൽക്കുന്ന്, കരുനാഗപ്പള്ളി**

Official modern React web application for **Bharanatheril Sree Bhadra Bhagavathy Temple**, located at Thurayilkunnu, Karunagappally, Kollam District, Kerala.

---

## ✨ Features

- **Kerala Temple Ambiance**: Designed with authentic Kerala traditional temple aesthetics — deep kumkum red, temple gold, sandalwood cream, and dark teak wood tones with Nilavilakku motifs and Kasavu borders.
- **Bilingual Experience**: Malayalam and English typography and titles throughout the application.
- **Live Darshan Timetable**: Real-time status indicator (Open / Closed based on IST temple hours) and full morning and evening pooja schedules.
- **Sacred Deities (Prathishta)**: Detailed profiles for presiding deity **Sree Bhadra Bhagavathy** and Upadevathas: **Lord Ganapathi**, **Nagaraja & Nagayakshi (Sarpa Kavu)**, **Brahmarakshas & Yogeeswaran**, and **Yakshi Amma**.
- **Interactive Vazhipadu (Pooja Offerings) Booking**: Search and filter offerings (*Kadumpayasam, Rakta Pushpanjali, Bhagavathy Seva, Maha Ganapathi Homam, Noorum Palum, etc.*), interactive selection cart, devotee details form (with 27 Malayalam birth stars / Nakshathrams), instant printable receipt, and simulated UPI QR code payment.
- **Festival Countdown & Calendar**: Live countdown to the grand **Annual Bharani Mahotsavam**, **Pongala Mahotsavam**, **Navaratri & Vidyarambham**, and **Karkidaka Masam**.
- **Audio Soundscapes**: Built-in Web Audio API synthesizer for realistic bronze temple bell chimes (*മണിനാദം*) and ambient meditative tanpura drone.
- **Visual Sanctuary & Gallery**: Filterable photo gallery with lightbox preview.
- **E-Kanikka & Donations Portal**: Contributions for Annadanam, temple renovation, and festival fund with UPI and bank transfer information.
- **Travel Guide & Devotee Helpdesk**: Step-by-step travel directions from Karunagappally Railway Station, KSRTC Bus Stand, and NH 66, with an interactive enquiry submission form.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
```bash
# Clone or navigate to the repository
cd bharanatheril-temple

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be running at `http://localhost:5174/` (or `http://localhost:5173/`).

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Modern Vanilla CSS Design System with CSS variables and responsive design
- **Icons**: Lucide React
- **Audio**: Web Audio API (Harmonic Bell Synthesizer & Tanpura Drone)
- **Effects**: Canvas Confetti for pooja confirmations
- **Typography**: Google Fonts (Cinzel, Plus Jakarta Sans, Noto Serif Malayalam)
