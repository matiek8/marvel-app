<template>
    <div>
        <h3>hi!</h3>
        <p>{{this.$route.params.id}}</p>
        <ul>
            <li v-for="char in character">
                {{char.name}}
                {{char.description}}
            </li>
        </ul>
        <img :src="url" alt="">
    </div>
</template>

<script>
  import {public_key} from '../marvel'
  import axios from 'axios'

  export default {
    name: "Character",
    data() {
      return {
        character: [],
        url: '',
        size: 'standard_large.jpg',
      }
    },
    mounted() {
      this.getCharacter()
    },
    methods: {
      getCharacter: async function () {
        let character_id = this.$route.params.id;
        try {
          const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${character_id}?apikey=${public_key}`);
          response.data.data.results.forEach((item) => {
            this.character.push(item);
            this.url = `${item.thumbnail.path}/${this.size}`;
          });
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
