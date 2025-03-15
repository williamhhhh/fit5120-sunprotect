<template>

<div class="desc-container">
  <div class="row">
      <img src="https://media-public.canva.com/PaCm0/MAFqXFPaCm0/1/s2.jpg" class="img-fluid rounded-start w-100" style="object-fit: cover; height: 500px;" alt="Sun illustration">
    <div class="welcome-content">
      <h1 class="welcome-title">Welcome to <br><span class="highlight">SunAware</span></h1>
      <p class="welcome-text col-md-6">SunSafe is a web application that provides real-time UV index data for Australian suburbs. Search for a suburb to get started!</p>
    </div>
  </div>
</div>

<!-- "https://media-public.canva.com/PaCm0/MAFqXFPaCm0/1/s2.jpg" -->
<!-- https://media-public.canva.com/dXils/MAGIx_dXils/1/s3.jpg -->


<div class="search-container">

  <div class="row">
    <div class="search-content col-md-6">
      <h1 class="search-title">Search for a <br><span class="highlight">Suburb</span></h1>

      <!-- Stats -->
      <div class="stats-container">
        <div class="stat-item">
          <h2>50+</h2>
          <p>Good reviews</p>
        </div>
      </div>

      <div class="input-group search-box">
          <input
            type="text"
            v-model="query" 
            @input="searchLocations"
            placeholder="What are you looking for?" 
            class="search-input col-md-10"
          >

          <button type="submit" class="search-btn col-md-2" style="margin-left: 20px;" @click="searchUvIndex">
            <img src="https://i.imgur.com/sijPEYJ.png"  class="img-fluid rounded-start h-100 w-100" style="object-fit: contain;" alt="Sun illustration">
          </button>
  
    </div>

    <ul v-if="suggestions.length > 0" class="suggestions">
      <li v-for="(location, index) in suggestions" :key="index" 
      @click="selectLocation(location)">
        {{ location.display_name }}
      </li>
    </ul>

    <!-- <div v-if="selectedLocation" class="selected-location">
      <h2>{{ selectedLocation.display_name }}</h2>
      <p>{{ selectedLocation.lat }}, {{ selectedLocation.lon }}</p>
    </div> -->

  </div>

  <div class="sun-illustration col-md-6">
    <img src="https://i.imgur.com/HLWn2v8.png"  class="img-fluid rounded-start h-100 w-100" style="object-fit: contain;" alt="Sun illustration">
  </div>
    
    
  </div>
</div>

<!-- UV Index -->
<div v-if="uvData" class="uv-index-card">
  <div class="uv-card-content">
    <div class="uv-info">
      <h1 class="uv-index">{{ uvData.now.uvi }}</h1>
      <p class="uv-label">Current UV Index</p>
    </div>
    <div class="time">
      <p>Current Time: {{ uvData.now.time }}</p>  
    </div>
  </div>
</div>


</template>
  
<script setup>
import { ref} from 'vue'
import axios from 'axios'

const query = ref('')
const suggestions = ref([])
const selectedLocation = ref(null)
const uvData = ref(null);

const searchLocations = async () => {
  if (query.value.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: query.value,
        format: 'json',
        countrycodes: 'au',
        limit: 5
      },
    })
    console.log(response.data)
    suggestions.value = response.data
  } catch (error) {
    console.error("Error fetching locations", error)
  }
}

// Select a location from the suggestions
const selectLocation = (location) => {
    selectedLocation.value = location
    query.value = location.display_name
    suggestions.value = []
    fetchUvIndex()
  }

  // Fetch UV index data
  // After clicking the search button, this function will be called
const fetchUvIndex = async () => {
  if (!selectedLocation.value) {
    return
  }

  try {
    const response = await axios.get("https://t9icxjys0j.execute-api.ap-southeast-2.amazonaws.com/dev/api/v1/uvi", 
      {
        params: {
          latitude: selectedLocation.value.lat,
          longitude: selectedLocation.value.lon,
        // appid: process.env.VUE_APP_OPENWEATHER_API_KEY
        },
      }
    )
    uvData.value = response.data;
    console.log("UV Index Data:", uvData.value);
  } catch (error) {
    console.error("Error fetching UV index", error)
  }
}

// onMounted(() => {
//   fetchUvIndex()
// });

</script>
  
  <style scoped>

  .desc-container {
    max-width: 1100px;
    /* left: 200px; */
    padding: 2rem;
    border: 1px solid #ffffff;
    border-radius: 10px;
    background-color: #ffffff;
    position: relative;
    margin: auto;
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
    font-weight: 300;
    color: #000;
    z-index: 1000;
    position: absolute;
    top: 200px;
    left: 60px;
  }

  .search-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #c3e6f2;
  }

  .search-content {
    max-width: 50%;
  }

  .search-title {
    font-size: 2.8rem;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.2;
    color: #000;
  }

  .highlight {
    color: #000;
    font-weight: 800;
  }

  .stats-container {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .stat-item h2 {
    font-size: 2rem;
    margin: 0;
    font-weight: bold;
  }

  .stat-item p {
    font-size: 1rem;
    margin: 0;
    color: #6c757d;
  }

  .search-box {
    display: flex;
    /* align-items: center; */
    margin-top: 40px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    height: 40px;
  }

  .search-input {
    display: flex;
    padding: 8px 12px 12px 12px;
    margin-bottom: 10px;
    font-size: 16px;
    border: none;
    outline: none;
    padding-bottom: 8px;
  }
  
  .search-btn {
    background-color: #c3e6f2;
    /* margin: 0 auto; */
    margin-left: 80px;
    margin-top: 1px;
    width: 38px;
    height: 38px;
    /* border-radius: 10px; */
    border-radius: 10px 10px 10px 10px;
    display: flex;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .search-btn:hover {
    background-color: #a0e3f9;
  }

  .suggestions {
  list-style-type: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  width: 30%;
  position: absolute;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.suggestions li:hover {
  background-color: #a0e3f9;
}

.uv-index-card {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #c3e6f2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

.uv-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.uv-info {
  margin-bottom: 1rem;
}

.uv-index {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

.uv-label {
  font-size: 1.2rem;
  color: #333;
}

.time {
  font-size: 1rem;
  color: #333;
}
  </style>
  