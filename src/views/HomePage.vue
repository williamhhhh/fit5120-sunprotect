<template>
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

       <div class="input-group search-box row">

        <input
          v-model="searchQuery" 
          placeholder="What are you looking for?" 
          class="search-input col-md-10"
        >

        <button type="submit" class="search-btn">
          <img src="https://i.imgur.com/sijPEYJ.png"  class="img-fluid rounded-start h-100 w-100 col-md-2" style="object-fit: contain;" alt="Sun illustration">
        </button>
        
       </div>

    </div>

    <div class="sun-illustration col-md-6">
      <img src="https://i.imgur.com/HLWn2v8.png"  class="img-fluid rounded-start h-100 w-100" style="object-fit: contain;" alt="Sun illustration">
    </div>
  </div>

  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const username = ref(localStorage.getItem('username') || 'Nobody')
  const currentRating = ref(0)
  const ratings = ref([])
  
  onMounted(() => {
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || []
    ratings.value = storedRatings
  })
  
  const submitRating = () => {
    const userRating = {
      username: username,
      score: currentRating.value
    }
  
    ratings.value.push(userRating)
    localStorage.setItem('ratings', JSON.stringify(ratings.value))
    alert('Thank you for your rating!')
    currentRating.value = 0
  }
  </script>
  
  <style scoped>

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
    align-items: center;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    height: 40px;
  }

  .search-input {
    display: flex;
    padding: 12px 16px;
    font-size: 16px;
    border: none;
    outline: none;
    padding-bottom: 8px;
  }
  
  .search-btn {
    background-color: #c3e6f2;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    display: flex;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .search-btn:hover {
    background-color: #a0e3f9;
  }
  .text-center {
    text-align: center;
  }
  
  .list-group {
    text-align: left;
  }
  </style>
  