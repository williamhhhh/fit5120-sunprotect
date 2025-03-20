<template>
    <div class="clothing-recommendation">
      <div
        class="relative flex items-center justify-center text-center py-12 bg-cover bg-center"
        style="background-image: url('https://www.natio.com.au/cdn/shop/collections/Sun-Kids-home-banner_1400x.jpg?v=1698293185'); height: 200px;"
      >
        <div class="absolute inset-0 bg-white bg-opacity-70"></div>
        <div class="relative z-10">
          <h1 class="text-4xl font-bold tracking-wide text-black">Stay Protected in Style</h1>
          <p class="mt-2 text-lg font-light text-black">
            Find the best sun-safe products and clothing tailored to your location UV conditions
          </p>
        </div>
      </div>
  
      <div class="overflow-x-auto mt-6 px-4">
        <table class="table-auto mx-auto border-collapse border border-gray-300 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 py-2 px-4 text-left">Recommendations</th>
              <th class="border border-gray-300 py-2 px-4 text-center">UV Rating 1-2<br />Low</th>
              <th class="border border-gray-300 py-2 px-4 text-center">UV Rating 3-5<br />Moderate</th>
              <th class="border border-gray-300 py-2 px-4 text-center">UV Rating 6-7<br />High</th>
              <th class="border border-gray-300 py-2 px-4 text-center">UV Rating 8-10<br />Very High</th>
              <th class="border border-gray-300 py-2 px-4 text-center">UV Rating 11+<br />Extreme</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="border border-gray-300 py-2 px-4">
                <a
                  href="https://www.amazon.com.au/s?k=UV-Blocking+Sunglasses&crid=3OFXK7FIC085O&sprefix=uv-blocking+sunglasses%2Caps%2C224&ref=nb_sb_noss_2"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  Use UV-Blocking Sunglasses
                </a>
              </td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">
                <a
                  href="https://www.amazon.com.au/s?k=Sunscreen&crid=2TH3JBGE31LXW&sprefix=sunscreen%2Caps%2C321&ref=nb_sb_noss_1"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  Wear Sunscreen
                </a>
              </td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">
                <a
                  href="https://www.amazon.com.au/s?k=Sun+Hat&crid=3UOJ3112SCON&sprefix=sun+hat%2Caps%2C232&ref=nb_sb_noss_1"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  Wear a Hat
                </a>
              </td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">
                <a
                  href="https://www.amazon.com.au/s?k=sun+protective+clothing&crid=2HUSCY04SITB&sprefix=Protective+Clothing%2Caps%2C240&ref=nb_sb_ss_ts-doa-p_2_19"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  Wear Protective Clothing
                </a>
              </td>
              <td class="border border-gray-300 text-center"></td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">Stay in Shade Near Midday</td>
              <td class="border border-gray-300 text-center"></td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">Reduce Time in the Sun</td>
              <td class="border border-gray-300 text-center"></td>
              <td class="border border-gray-300 text-center"></td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 py-2 px-4">Avoid the Sun Between 10am-2pm</td>
              <td class="border border-gray-300 text-center"></td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
              <td class="border border-gray-300 text-center">✔</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ClothingRecommendation",
  };
  </script>
  
  <style scoped>
  table {
    background-color: #e6f7ff;
  }

  .clothing-recommendation {
    font-family: "Arial", sans-serif;
  }
  .bg-cover {
    background-size: cover;
  }
  .bg-center {
    background-position: center;
  }
  .bg-opacity-70 {
    background-color: rgba(255, 255, 255, 0.7);
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .text-blue-600 {
    color: #2563eb;
  }
  .text-blue-600:hover {
    text-decoration: underline;
  }
  
  </style>