<template>

<div class="title-container">
    <h1 class="title-section">
        <span>Personalisation</span>
    </h1>
    <p class="description" style="font-size: larger;">Personalise your sun protection recommendations based on your skin tone and UV exposure level.</p>
</div>

<div class="skin-container">
    <div class="row">
    <div class="col-md-7">
        <h3 class="title">Select your skin type:</h3>

        <div class="grid-conatiner">
            <button
              v-for="tone in skinTones"
              :key="tone"
              :style="{ backgroundColor: tone.color }"
              class="skin-tone-button"
              :class="{ selected: selectedTone.label === tone.label }"
              @click="selectSkinTone(tone)"
            ></button>
        </div>
    </div>
    <div class="col-md-5">
        <img src="https://i.imgur.com/spCEVUN.png"  class="img-fluid h-100 w-100" style="object-fit: contain; margin-left: 1px; max-width: 400px;" alt="Skin tone face">
    </div>
    </div>
</div>

<div class="uv-container">
    <div class="row">
    <div class="col-md-5">
    <div class="illustration">
        <img src="https://i.imgur.com/fNhO14e.png"  class="img-fluid h-100 w-100" style="object-fit: contain; margin-left: 1px; max-width: 400px;" alt="UV illustration">
    </div>
    </div>

    <div class="col-md-7">
    <div class="selection-area">
        <h2 class="title" >Select your UV exposure level:</h2>
        <div class="uv-buttons">
            <button
              v-for="level in uvLevels"
              :key="level.value"
              class="uv-button"
              :class="{ selected: selectedUV === level.value }"
              @click="selectUV(level.value)"
            >
              {{ level.label }}
            </button>
        </div>
        <!-- <button class="cta-button">Get Recommendations</button> -->
    </div>
    </div>
    </div>
</div>

<div class="recommendation-container">
    <div class="row">
        <div class="col-md-6">
            <div class = "wear-card">
                <h3>Wearing Recommendations</h3>
                <p>For <strong>{{ selectedTone?.label }}</strong> skin tone under <strong>{{ selectedUV }}</strong> UV level:</p>
                <p class="recommendation-text">{{ wearRecommendation }}</p>
            </div>
        </div>
        <div class="col-md-6">
            <div class = "vitamin-card">
                <h3>Vitamin D Advice</h3>
                <p>For <strong>{{ selectedTone?.label }}</strong> skin tone:</p>
                <p class="recommendation-text">{{ vitaminDRecommendation }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const skinTones = [
  { color: "rgb(255, 224, 189)", label: "Light" },
  { color: "rgb(241, 194, 125)", label: "Fair" },
  { color: "rgb(241, 194, 125)", label: "Medium" },
  { color: "rgb(198, 134, 66)", label: "Tan" },
  { color: "rgb(141, 85, 36)", label: "Dark" },
  { color: "rgb(141, 85, 36)", label: "Deep" },
];

const uvLevels = [
  { label: "Low (1-2) 🌤", value: "low" },
  { label: "Moderate (3-5) ☁️", value: "moderate" },
  { label: "High (6-7) 🌞", value: "high" },
  { label: "Very High (8-10) 🔥", value: "very_high" },
  { label: "Extreme (11+) ☀️", value: "extreme" },
];

const vitaminDRecommendations = {
  Light: "10-15 minutes of sun exposure daily",
  Fair: "15-20 minutes daily",
  Medium: "20-30 minutes daily",
  Tan: "30-40 minutes daily",
  Dark: "40-50 minutes daily",
  Deep: "50+ minutes daily",
};

const wearRecommendations = {
  Light: {
    low: "SPF 15+, sunglasses, light clothing",
    moderate: "SPF 30+, hat, sunglasses",
    high: "SPF 50+, protective clothing, shade",
    very_high: "SPF 50+, long-sleeves, avoid midday sun",
    extreme: "Stay indoors, SPF 50+, full coverage clothing",
  },
  Fair: {
    low: "SPF 15+, sunglasses, hat recommended",
    moderate: "SPF 30+, hat, sunglasses, seek shade",
    high: "SPF 50+, long-sleeves, high UV protection",
    very_high: "SPF 50+, avoid sun from 10 AM - 4 PM",
    extreme: "Stay indoors or wear full coverage clothing",
  },
  Medium: {
    low: "SPF 15+, sunglasses, optional hat",
    moderate: "SPF 30+, hat and sunglasses recommended",
    high: "SPF 50+, protective clothing, avoid direct sunlight",
    very_high: "SPF 50+, long sleeves and shade advised",
    extreme: "Avoid sun exposure, full protective gear needed",
  },
  Tan: {
    low: "SPF 15+, sunglasses, hat optional",
    moderate: "SPF 30+, sunglasses and hat recommended",
    high: "SPF 50+, wear protective clothing, stay in shade",
    very_high: "SPF 50+, avoid peak sun hours",
    extreme: "Limit outdoor activity, full coverage advised",
  },
  Dark: {
    low: "Minimal sunscreen needed, sunglasses recommended",
    moderate: "SPF 15+, hat, sunglasses recommended",
    high: "SPF 30+, long-sleeved shirt and shade",
    very_high: "SPF 50+, seek shade, limit sun exposure",
    extreme: "Stay indoors, protective gear recommended",
  },
  Deep: {
    low: "Sunglasses recommended, SPF optional",
    moderate: "SPF 15+, sunglasses and hat suggested",
    high: "SPF 30+, shade and protective clothing needed",
    very_high: "SPF 50+, avoid prolonged sun exposure",
    extreme: "Stay indoors or wear full protective clothing",
  },
};

const selectedUV = ref(null);

const selectedTone = ref(null)

const selectSkinTone = (tone) => {
    selectedTone.value = tone
}

const selectUV = (level) => {
  selectedUV.value = level;
};

const wearRecommendation = computed(() => {
  if (!selectedTone.value || !selectedUV.value) return "Select skin tone & UV level";
  return wearRecommendations[selectedTone.value.label]?.[selectedUV.value] || "No data available";
});

const vitaminDRecommendation = computed(() => {
  if (!selectedTone.value) return "Select a skin tone";
  return vitaminDRecommendations[selectedTone.value.label] || "No data available";
});

</script>

<style scoped>

.skin-container {
    padding: 2rem;
    margin: auto;
    max-width: 900px;
}

.title {
    padding-left: 10%;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 15px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: center;
}

.skin-tone-button {
    width: 70px; 
    height: 70px;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-color: #fff;
}

.skin-tone-button:hover {
    transform: scale(1.1);
}

.skin-tone-button.selected {
    border-color: #7bd9f8;
    transform: scale(1.2);
    z-index: 1000;
}

.uv-container {
    padding: 2rem;
    margin: auto;
    max-width: 900px;
}

.selection-area {
    flex: 1;
    text-align: center;
}

.uv-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.uv-button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
    border: 2px solid #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}


.uv-button:hover {
    transform: scale(1.1);
}

.uv-button.selected {
    background-color: #c3e6f2 !important;
    border-color: black;
    transform: scale(1.1) !important;
}

.cta-button {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 10px;
    border: 2px solid #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #c3e6f2;
    color: black;
}

.recommendation-container {
    padding: 2rem;
    margin: auto;
    max-width: 900px;
}

.wear-card, .vitamin-card {
    max-width: 300px;
    height: 210px;
  background: #c3e6f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title-container {
    padding: 2rem;
    margin: auto;
    max-width: 900px;
}
</style>