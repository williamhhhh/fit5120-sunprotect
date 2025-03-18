<template>
<div v-if="uvData" class="uv-index-card">
  <div class="uv-card-content">
    <div class="uv-info">
      <h1 class="uv-index">{{ uvData.now.uvi }}</h1>
      <p class="uv-label">Current UV Index</p>
    </div>
    <div class="time">
      <p>Current Time: {{ currentTime }}</p>  
      <p>You are in: {{ currentLocation }}</p>  
    </div>
  </div>
</div>
</template>

<script>
</script>

<style>
</style>