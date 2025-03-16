<template>
  
    <div class="card mb-2">
      <div class="row g-0">
        <div class="col-md-5">
          <div :class="card-body">
            <h5 class="card-title">Australian skin cancer incidences from 1980 - 2020</h5>
            <h6 class="card-subtitle mb-2 text-muted" style="font-weight: normal;">Skin cancer became severer in the past decades</h6>
            <p class="card-text" style="font-weight: 300;">Over the past 40 years the incidence of skin cancers, including melanoma and other rare types,  has increased likely due to the increasing sophistication of diagnostics techniques as well as heightened awareness of the signs of melanoma, coupled with a population which failed to take the right protections during their life leading to onset as they age.</p>
            <p class="card-text" style="font-weight: 300;">There are promising signs though, with younger Australians' rate of skin cancer decreasing over that time period. However any preventable skin cancers are too many and everyone need to continue to stay vigilant in the sun, taking the appropriate measures.</p>
            <p class="card-text" style="font-weight: 300;">To see the recommendations for how you should protect your skin, see the Recommendations page.</p>
          </div>
        </div>
          <div class="col-md-7">
            <img v-if="linePlotData" :src="linePlotData" class="img-fluid rounded-start h-100 w-100" style="object-fit: contain;" alt="...">
        </div>
      </div>
    </div>

    <!-- https://i.imgur.com/DM1sHjq.png -->

    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <div :class="card-body">
            <h5 class="card-title">UV's relationship with skin cancer</h5>
            <h6 class="card-subtitle mb-2 text-muted" style="font-weight: normal;">Those people who lives in high uv areas need to pay extra attention!</h6>
            <p class="card-text" style="font-weight: 300;">Australia's average UV Index, as measured around noon throughout the year, trends up as you go further north. The rates of skin cancers also tends to increase, with the highest rates in the Northern Territory and Queensland. So people living in and visiting the northern states and territories need to be more conscious of their exposure to UV, but we can see that this isn't a concrete trend; Tasmania has a higher than expected level despite its lower levels of UV.</p>
            <p class="card-text" style="font-weight: 300;">So while it may vary by location and season, the average across the nation is at a level where you need to apply sunscreen and use other forms of protection, so it is key to ensure that wherever you are you take proper precautions.</p>
          </div>
        </div>
          <div class="col-md-8">
            <img src="https://i.imgur.com/TGC5lSh.png" class="img-fluid rounded-start h-100 w-100" style="object-fit: contain;" alt="...">
          </div>
      </div>
    </div>

</template>
  
<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const linePlotData = ref(null)

const fetchImage = async () => {
  try {
    const response = await axios.get("https://0ewwm7syga.execute-api.ap-southeast-2.amazonaws.com/plot_line", {
      responseType: 'json'
    })
    console.log(response.data)

    linePlotData.value = `data:image/png;base64,${response.data.image}`;
    
  } catch (error) {
    console.error("Error fetching image", error)
  }
}

onMounted( () => {
  fetchImage()
})
</script>
  
<style scoped>
  .card {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ffffff;
    border-radius: 10px;
    background-color: #ffffff;
  }
  
  .text-center {
    text-align: center;
  }
  
  .list-group {
    text-align: left;
  }
</style>
  