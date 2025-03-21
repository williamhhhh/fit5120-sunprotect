<template>
  <div class="desc-container">
    <div class="img-bg w-100" :style="backgroundStyle" alt="Sun illustration">
      <div class="welcome-content">
        <h1 class="welcome-title">
          Welcome to <br /><span class="highlight">SunAware</span>
        </h1>
        <p class="welcome-text col-md-6">
          SunAware is a web application that provides real-time UV index data
          for Australian suburbs. Type in a suburb and click search to find the real-time UV!
        </p>
      </div>

      <div class="search-box">
        <input
          type="text"
          v-model="query"
          @input="searchLocations"
          placeholder="Type a suburb..."
          class="search-input"
        />
        <button
          type="submit"
          class="search-btn"
          @click="handleSearch"
        >
          <img
            src="https://i.imgur.com/sijPEYJ.png"
            alt="Search"
          />
        </button>
      </div>
      <ul v-if="suggestions.length > 0" class="suggestions">
        <li
          v-for="(location, index) in suggestions"
          :key="index"
          @click="selectLocation(location)"
        >
          {{ location.display_name }}
        </li>
      </ul>
    </div>

    <div v-if="uvData" class="uv-container">
      <div class="uv-index-top">
        <div class="uv-index-display" :style="{ borderColor: getUvColor(uvData.now.uvi) }">
          <h2>Current UV Index</h2>
          <div class="uv-index-value">
            <span :style="{ color: getUvColor(uvData.now.uvi) }">{{ uvData.now.uvi }}</span>
          </div>
          <p class="uv-index-label" :style="{ color: getUvColor(uvData.now.uvi) }">
            {{ getUvLevel(uvData.now.uvi) }}
          </p>
        </div>

        <div class="uv-risk-scale">
          <h2>UV Risk Scale</h2>
          <div class="uv-risk-level" v-for="(level, index) in uvLevels" :key="index">
            <span class="uv-color-box" :style="{ backgroundColor: level.color }"></span>
            <span class="uv-level-text">{{ level.text }}</span>
          </div>
        </div>
      </div>

      <div class="uv-chart">
        <h2>UV Index Chart</h2>
        <canvas ref="uvChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  methods: {
    scrollToBottom() {
      const footer = this.$refs.uvChart;
      footer.scrollIntoView({ behavior: 'smooth' }); 
    },
  },
  setup() {
    const query = ref(""); 
    const suggestions = ref([]);
    const selectedLocation = ref(null);
    const uvData = ref(null); 
    const chartInstance = ref(null);
    const uvChart = ref(null); 

    const backgrounds = [
      "https://media-public.canva.com/PaCm0/MAFqXFPaCm0/1/s2.jpg",
      "https://media-public.canva.com/a7yEE/MAFqXFa7yEE/1/s2.jpg",
      "https://media-public.canva.com/km9GA/MAFqXMkm9GA/1/s2.jpg",

    ];
    const index = ref(0);

    const backgroundStyle = computed(() => ({
      backgroundImage: `url(${backgrounds[index.value]})`,
    }));

    const uvLevels = [
      { color: "#00FF00", text: "Low (0-2)" },
      { color: "#FFFF00", text: "Moderate (3-5)" },
      { color: "#FFA500", text: "High (6-7)" },
      { color: "#FF4500", text: "Very High (8-10)" },
      { color: "#9400D3", text: "Extreme (11+)" },
    ];

    const getUvColor = (uvi) => {
      if (uvi <= 2) return "#00FF00";
      if (uvi <= 5) return "#FFFF00";
      if (uvi <= 7) return "#FFA500";
      if (uvi <= 10) return "#FF4500";
      return "#9400D3";
    };

    const getUvLevel = (uvi) => {
      if (uvi <= 2) return "Low";
      if (uvi <= 5) return "Moderate";
      if (uvi <= 7) return "High";
      if (uvi <= 10) return "Very High";
      return "Extreme";
    };

    const searchLocations = async () => {
      if (query.value.length < 3) {
        suggestions.value = [];
        return;
      }
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query.value,
              format: "json",
              countrycodes: "au",
              limit: 5,
            },
          }
        );
        suggestions.value = response.data;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const selectLocation = (location) => {
      selectedLocation.value = location;
      query.value = location.display_name;
      suggestions.value = [];
    };

    const fetchUvIndex = async () => {
      if (!selectedLocation.value) {
        console.error("No location selected for fetching UV index.");
        return;
      }
      const latitude = selectedLocation.value.lat;
      const longitude = selectedLocation.value.lon;

      try {
        const response = await axios.get(
          "https://t9icxjys0j.execute-api.ap-southeast-2.amazonaws.com/dev/api/v1/uvi",
          {
            params: { latitude, longitude },
          }
        );
        uvData.value = response.data;

        console.log("Current UV Index:", uvData.value.now.uvi);

        await nextTick();
        drawChart();
      } catch (error) {
        console.error("Error fetching UV index:", error);
      }
    };

    const handleSearch = () => {
      if (!selectedLocation.value) {
        alert("Please select a location.");
        return;
      }
      fetchUvIndex();
    };

    const drawChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      const ctx = uvChart.value?.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      const forecastData = uvData.value.forecast.map((d) => ({
        x: new Date(d.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        y: d.uvi,
      }));

      chartInstance.value = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "UV Index",
              data: forecastData,
              borderColor: "#FF4500",
              backgroundColor: "rgba(255, 69, 0, 0.2)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              type: "category",
              labels: forecastData.map((d) => d.x),
            },
          },
        },
      });
    };

    onMounted(() => {
      setInterval(() => {
        index.value = (index.value + 1) % backgrounds.length;
      }, 5000);
    });

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
    });

    return {
      query,
      suggestions,
      uvData,
      uvChart,
      backgroundStyle,
      searchLocations,
      selectLocation,
      getUvColor,
      getUvLevel,
      uvLevels,
      handleSearch
    };
  },
};

</script>

<style scoped>
.desc-container {
  max-width: 100%;
  background-color: #ffffff;
  position: relative;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-bg {
  object-fit: cover;
  width: 100%;
  height: 600px;
  transition: background-image 1s ease-in-out;
  background-position: center top -200px;
}

.welcome-title {
    font-size: 3.5rem;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.2;
    color: #000;
    z-index: 1000;
    position: absolute;
    top: 60px;
    left: 60px;
  }

  .welcome-text {
    font-size: 1.3rem;
    font-weight: 400;
    color: #000;
    z-index: 1000;
    position: absolute;
    top: 200px;
    left: 60px;
  }

.search-box {
  display: flex;
  gap: 10px;
  margin: 20px auto;
  max-width: 800px;
  align-items: center;
  padding: 10px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 400px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.search-btn {
  width: 50px;
  height: 50px;
  background-color: #c3e6f2;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-btn img {
  width: 60%;
  height: 60%;
}

.search-btn:hover {
  background-color: #a0e3f9;
}

.search-btn:active {
  transform: scale(0.95);
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  width: 80%;
  max-width: 800px;
  margin: 10px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
  top: 380px;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.suggestions li:hover {
  background-color: #a0e3f9;
}

.uv-container {
  width: 100%; 
  padding: 20px;
  margin-top: 40px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.uv-index-top {
  display: flex;
  justify-content: center; 
  width: 100%;
  max-width: 1200px;
  gap: 20px; 
  margin-bottom: 30px;
}

.uv-index-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 4px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.uv-index-display h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.uv-index-value {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
}

.uv-index-label {
  font-size: 18px;
  font-weight: bold;
}

.uv-risk-scale {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.uv-risk-scale h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.uv-risk-level {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.uv-color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 10px;
}

.uv-level-text {
  font-size: 16px;
  color: #333;
}

.uv-chart {
  width: auto;
  max-width: 800px;
  margin-top: 30px;
  text-align: center;
}

.uv-chart h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

canvas {
  display: block;
  margin: 0 auto; 
  width: 300%;
  height: 300%;
}
</style>

