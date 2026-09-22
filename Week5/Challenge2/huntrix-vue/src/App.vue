<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import axios from 'axios';

  // "Get my OpenWeather API key from the environment file and store it in a variable called WEATHER_API_KEY."
  const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const group = 'HUNTRIX';
  const query = ref('');
  const members = ref([
    {
      id: 1,
      name: 'Rumi',
      role: 'Leader, Vocal',
      img: import.meta.env.BASE_URL + 'photos/rumi.jpg',
      profile: [
        'Zodiac Sign: Aries',
        'Chinese Zodiac Sign: Goat',
        'Oldest of the three members in HUNTRIX',
        'Taekwondo Black Belt',
        'Loves cats',
        'Her favorite ramen flavor is Spicy Chicken.'
      ],
      city: 'Seoul',
      temp: undefined,
      tempError: false
    },
    {
      id: 2,
      name: 'Mira',
      role: 'Rapper',
      img: import.meta.env.BASE_URL + 'photos/mira.jpg',
      profile: [
        'Zodiac Sign: Taurus',
        'Chinese Zodiac Sign: Monkey',
        'Dancing since 4 years old',
        'Choreography for most of HUNTRIX songs',
        'Mira can play drums',
        'Her favorite ramen flavor is roast beef.'
      ],
      city: 'Los Angeles',
      temp: undefined,
      tempError: false
    },
    {
      id: 3,
      name: 'Zoey',
      role: 'Dancer',
      img: import.meta.env.BASE_URL + 'photos/zoey.jpg',
      profile: [
        'Zodiac Sign: Sagittarius',
        'Chinese Zodiac Sign: Rooster',
        'Her hobbies are drawing and skateboarding.',
        'She can play the bass',
        "Wrote most of HUNTRIX songs' rap parts",
        'Her favorite ramen flavor is pork with soy sauce.'
      ],
      city: 'Moscow',
      temp: undefined,
      tempError: false
    }
  ]);
  const selectedMember = ref(null);

  function showProfile(member) {
    if (selectedMember.value && member.id == selectedMember.value.id) {
      selectedMember.value = null;
    } else {
    selectedMember.value = member;
    }
  }

  const filteredMembers = computed(() => {
    // Step 1: Clean up the query
    const q = query.value.trim().toLowerCase()

    // Step 2: If query is empty, show everyone
    if (!q) return members.value

    // Step 3: Create a new array that only includes matches
    return members.value.filter((m) =>
      m.name.toLowerCase().includes(q)
    )
  });

  watch(query, () => {
    selectedMember.value = null
  });

  async function fetchWeather(member) {
    // Construct the OpenWeatherMap API URL
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(member.city)}&units=metric&appid=${WEATHER_API_KEY}`
    // encodeURIComponent() converts text into a URL-safe format so special characters like spaces and & do not break the URL.
  
    try {
      // Wait for Axios to receive a response from the API
      const response = await axios.get(url)

      // Store the temperature returned by the API
      member.temp = Math.round(response.data.main.temp)

      // No error occurred
      member.tempError = false

    } catch (error) {
      // Display the error in the browser console
      console.error('Weather fetch failed:', error)

      // No temperature is available
      member.temp = undefined

      // Remember that an error occurred
      member.tempError = true
    }
  }

  async function fetchAllWeather() {
    await Promise.all(
      members.value.map((m) => fetchWeather(m))
    )
  }

  onMounted(() => {
    fetchAllWeather()
  });

  // const words = ref(['Life', 'is', 'Good']);
  // const otherWords = ref(['I', 'feel', 'like', 'dying']);

  // function joinedWords() {
  //   console.log("Function");
  //   return words.value.join(" ");
  // }

  // const joinedOtherWords = computed(() => {
  //   // Stored in browser cache, "joinedOtherWords": "I feel like dying"
  //   console.log("Computed Property joinedOtherWords");
  //   return otherWords.value.join(" ");
  // });

</script>

<template>
  <main class="container">
    <h1>{{ group }} Member Explorer</h1>

    <p>
      Search: <input type="text" v-model="query">
    </p>

    <p>
      Results:
      {{ filteredMembers.length }} of {{ members.length }}
    </p>

    <p v-if="filteredMembers.length === 0">
      No members found for "{{ query }}"
    </p>

    <ol v-else>
      <li v-for="member in filteredMembers">
        <button :class="{active: selectedMember && selectedMember.id === member.id}" @click="showProfile(member)">
          {{ member.name }} – {{ member.role }}
        </button>
        <br>
        <img :src="member.img" :title="member.name" :alt="member.name" width="100">
        <p class="city-temp">
          <strong>{{ member.city }}</strong>
          <span v-if="member.tempError">
            - N/A
          </span>
          <span v-else-if="member.temp === undefined">
            - Loading...
          </span>
          <span v-else>
            - {{ member.temp }}°C
          </span>
        </p>

      </li>
    </ol>

    <!-- Profile section -->
    <section v-if="selectedMember" class="profile">
      <h2>{{ selectedMember.name }}'s Profile</h2>
      <ul>
        <li 
          v-for="(info, idx) in selectedMember.profile" :key="idx">
          {{ info }}
        </li>
      </ul>
    </section>

    <!-- <hr>
    <h2>Function Calls vs Computed Property References</h2>
    <h3>Function Call 1: {{ joinedWords() }}</h3>
    <h3>Function Call 2: {{ joinedWords() }}</h3>
    <h3>Function Call 3: {{ joinedWords() }}</h3>

    <h3>Computed Propert Ref 1: {{ joinedOtherWords }}</h3>
    <h3>Computed Propert Ref 2: {{ joinedOtherWords }}</h3>
    <h3>Computed Propert Ref 3: {{ joinedOtherWords }}</h3> -->
  </main>
</template>

<style scoped>
  .container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }
  .active {
    background-color: purple;
    color: white;
  }
  .city-temp {
    margin: 0.25rem 0 1rem;
    font-size: 0.9rem;
    color: #666;
  }
</style>
