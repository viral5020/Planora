# PLANORA — Full Web App & Mobile App

> **"Your city. Your people. Your plans."**  
> A hyperlocal social gathering & community curation platform built from the Google Stitch prototype.

---

## 🌟 Highlights

1. **Full Responsive Desktop Web App**:
   - Modern dark neon aesthetic (`#0e0f15`, `#13141b` with `#9333ea` to `#ec4899` gradient accents).
   - Left Navigation Sidebar with live badge counts (Pending Approvals, Unread Messages, Matching Locals).
   - Multi-column card grids for gatherings, communities, and profiles.
   - Right Context Sidebar with Surat Live Activity Radar, spotlight gathering, and top curators.

2. **Native Mobile App & PWA Ready**:
   - **Mobile Simulator**: Test inside an iPhone 16 Pro device chassis with Dynamic Island and status bar.
   - **Progressive Web App (PWA)**: Includes `manifest.json` and mobile meta tags. On iOS Safari tap *Share ➔ Add to Home Screen*; on Android Chrome tap *Menu ➔ Install App*.
   - **Capacitor Mobile Setup**: `capacitor.config.json` pre-configured to build Android APKs or iOS IPAs (`npx cap add android`).

3. **21 Connected Screens & State**:
   - **Onboarding Flow**: Splash ➔ Hero Landing ➔ Phone & OTP Verification ➔ 10+ Interests Picker ➔ Location Radar.
   - **Discovery**: Surat Main Feed, Live Heat Map modal, Vibe-Matching People cards, Recurring Community Circles.
   - **Gathering & Booking**: Event Detail page with dynamic RSVP states (Request to Join ➔ Pending ➔ Confirmed QR Entry Pass).
   - **Host Operations Suite**: Multi-step event creator (Type ➔ Details ➔ Curation) + Broadcast Virality Kit + Host Console with interactive guest approvals (Approve / Decline) and Host Emergency Shield.
   - **Social & Chat**: Unified Inbox and real-time Event Group Chat with interactive message input.
   - **Profile & Safety**: Reputation badges (Top Host, Verified ID), My Passes, and granular neighborhood privacy toggles.

---

## 🚀 Running the Project

### Local Development
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### Production Build
```bash
npm run build
```

### Packaging into Native Android / iOS App
```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap copy
npx cap open android
```

