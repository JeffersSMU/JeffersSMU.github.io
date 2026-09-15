<script setup>

import { ref } from 'vue';

const dogs = ref([
    { name: 'healthy', age: 3 },
    { name: 'smiley', age: 7 },
    { name: 'happy', age: 1 }
]);

const dogName = ref('');
const dogAge = ref('');

function addDog() {

    // TODO:
    // 1. Check that dogName and dogAge are not empty
    if (dogName.value !== '' && dogAge.value !== '') {
        // 2. Add a new dog object to the dogs array
        dogs.value.push({
            name: dogName.value,
            age: dogAge.value
        })
        // 3. Clear dogName
        dogName.value = '';
        // 4. Clear dogAge
        dogAge.value = '';
    }
}

</script>


<template>

    <h1>🐶 Welcome to Krazy Dog Café!</h1>

    <hr>

    <h2>Our Current Dogs</h2>

    <!-- TODO:
         Display the dogs as an ordered list.

         Example:
         Healthy is 3 years old
         Smiley is 7 years old
         Happy is 1 year old

         Remember:
         - Capitalize the first character of the dog's name.
         - Use "year" when age is 1.
         - Use "years" for all other ages.
    -->
    <ol>
        <li v-for="dog in dogs">{{ dog['name'][0].toUpperCase() + dog['name'].slice(1) }} is {{ dog['age'] }} years old</li>
    </ol>

    <hr>

    <h2>Add a Dog</h2>

    <!-- TODO:
         Create inputs for:
         1. Dog Name
         2. Dog Age
    -->
    <label>Dog Name:</label>
    <input type="text" v-model="dogName">
    <br>
    <label>Dog Age:</label>
    <input type="number" v-model="dogAge">
    <br>
    <!-- TODO:
         Create an Add Dog button.
         When clicked, call addDog().
    -->
    <button v-on:click="addDog()">Add Dog</button>

</template>


<style scoped>

h1 {
    background-color: lightyellow;
}

input {
    margin: 5px;
}

button {
    margin: 5px;
}

</style>