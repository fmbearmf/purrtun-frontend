<template>
  <div class="flex-grow mx-4">
    <h1 class="text-center text-5xl font-kode font-bold mb-8">Purrtun API Guide</h1>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Getting Started</h2>
      <p class="text-lg">
        Before using the Purrtun API, you need to obtain an API secret. This secret is used for authenticating your requests. Include it in your request headers as a Bearer token.
      </p>
      <ul class="list-disc pl-5 text-lg">
        <li>API Secrets can be requested in the Purrtun Central Discord here:
          <a target="_blank" href="https://discord.gg/GuYMyMnwN4" class="rainbow-text underline">discord.gg/GuYMyMnwN4</a>
        </li>
        <li>
          <strong class="text-3xl text-red-600">NEVER</strong> share your API secret with anyone. It should be treated like a password and kept private.
        </li>
        <li>
          When in doubt, refer to the Swagger document (<strong>the single source of truth </strong>) at <a target="_blank" href="https://api.purrtun.com/api-docs/" class="rainbow-text underline">api.purrtun.com/api-docs/</a>, or ask in the discord.
        </li>
        <li>
          Don't forget to thank Mr. Gembox! <img src="~assets/img/mrgembox.png" alt="Mr. gembox" class="inline-image">
        </li>
      </ul>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Authentication</h2>
      <p class="text-lg mb-4">Every request to the Purrtun API must include your API secret in the Authorization header. Here’s how to structure your request:</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>const headers = {
  'Authorization': 'Bearer [your_api_secret]'
};</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Retrieve a User's Portfolio</h2>
      <p class="text-lg mb-4">Retrieve the portfolio information for a user based on their Discord ID.</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>const discordId = '123456789';
fetch(`https://api.purrtun.com/v1/portfolio/${discordId}`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer [your_api_secret]'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">View All Market Data</h2>
      <p class="text-lg mb-4">Fetches the current status of all stocks in the market.</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>fetch('https://api.purrtun.com/v1/market', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer [your_api_secret]'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">View Market Data for a Specific Stock</h2>
      <p class="text-lg mb-4">Retrieve market data for a specific stock based on the cat color.</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>const catColor = 'green';
fetch(`https://api.purrtun.com/v1/market/${catColor}`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer [your_api_secret]'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Place a Trade</h2>
      <p class="text-lg mb-4">Allows a user to place a buy or sell order for a specific stock based on the cat color.</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>const catColor = 'green';
const tradeDetails = {
  numShares: 10,
  action: 'buy'
};

fetch(`https://api.purrtun.com/v1/trade/${catColor}`, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer [your_api_secret]',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(tradeDetails)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Handling Errors</h2>
      <p class="text-lg mb-4">The API uses standard HTTP status codes. If an error occurs, the response will include a JSON body with details about the error.</p>
      <pre class="bg-gray-800 text-white p-4 rounded"><code>{
  "error": "InsufficientFunds",
  "message": "Heh... seems like you're going to need $50 more Catbux for that move."
}</code></pre>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Rate Limiting</h2>
      <p class="text-lg">To ensure fair usage, the API enforces rate limits. If you exceed the allowed number of requests, you’ll receive a 429 Too Many Requests response. The response headers will include details on when you can retry your request.</p>
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-kode font-bold mb-4">Extra Info</h2>
      <ul class="list-disc pl-5 text-lg">
        <li>This API is in BETA!!! Report bugs and wanted features in the discord</li>
        <li>More endpoints are on the way to let you do just about anything you would do on the discord UI on the API</li>
      </ul>
    </div>

    <p class="text-lg">This guide should help you get started with the Purrtun API. For detailed API documentation, refer to the Swagger UI at  or contact support if you have any questions. Happy trading! <img src="~assets/img/mrgembox.png" alt="Mr. gembox" class="inline-image"></p>
  </div>
</template>

<style scoped>
.rainbow-text {
  background: linear-gradient(
      90deg,
      red,
      orange,
      yellow,
      blue,
      green,
      indigo,
      violet
  );
  background-size: 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-animation 15s linear infinite;
}

@keyframes rainbow-animation {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
<script setup lang="ts">
</script>