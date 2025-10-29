# 🌦️ WeatherNow — Real-Time Weather Dashboard

**Live Demo:** [https://weathernow-kappa.vercel.app/](https://weathernow-kappa.vercel.app/)

WeatherNow is a clean, responsive, and interactive weather dashboard built using **React** and the **Open-Meteo API**.  
It allows users to search for any city around the world and instantly view the **current temperature**, **wind speed**, **wind direction**, and **weather condition** — all with an elegant, modern UI.

---

## 🚀 Project Overview

**User Persona:**  
**Name:** Jamie  
**Occupation:** Outdoor Enthusiast  
**Need:** Jamie wants to check the current weather conditions quickly for any city.

**Solution:**  
WeatherNow provides a fast, user-friendly interface to find and display real-time weather details for any location globally.

---

## 🧩 Features

| Feature | Description |
|----------|-------------|
| 🌍 **City Search** | Search any global city using Open-Meteo’s Geocoding API |
| ☁️ **Current Weather Data** | Displays temperature, weather condition, wind speed, and direction |
| 🌡️ **Unit Selector** | Switch between Celsius (°C) and Fahrenheit (°F) |
| 💨 **Wind Details** | Shows both wind direction and speed dynamically |
| 🧭 **Timezone Support** | Displays city timezone and formatted local time |
| 🎨 **Dynamic UI** | Background gradient and weather icons adapt to temperature and condition |
| 📱 **Responsive Design** | Works seamlessly across desktop and mobile |
| ⚠️ **Error Handling** | Graceful fallback messages for invalid input or API issues |

---

## 🧠 Working with AI (Level 1)

This project was designed and refined in collaboration with **ChatGPT (GPT-5)** for:
- Interpreting user requirements from the Take-Home Challenge  
- Structuring components and APIs  
- Writing React + TailwindCSS code  
- Improving responsiveness, debouncing, and prop validation  

**ChatGPT Collaboration Link:** (this conversation)

---

## 🛠️ Tech Stack

**Frontend:** [React.js](https://react.dev/)  
**Styling:** [Tailwind CSS](https://tailwindcss.com/)  
**Icons:** [Lucide Icons](https://lucide.dev/icons/)  
**Deployment:** [Vercel](https://vercel.com/)  
**APIs Used:**
- 🌍 **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search`
- ☁️ **Weather Forecast API:** `https://api.open-meteo.com/v1/forecast`

---

## 📦 Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<nandini1214>/weathernow.git
cd weathernow
