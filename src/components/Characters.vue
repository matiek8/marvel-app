<template>
    <div>
        <h3>hi characters</h3>
        <ul>
            <li v-for="character in characters">
                <router-link :to="{ name: 'character', params: {id: character.id} }">{{ character.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import {public_key, secret_key} from "../marvel";
  import {mapState} from 'vuex'

  export default {
    name: "Characters",
    mounted() {
    },
    computed: {
      ...mapState({
        characters: state => state.character
      })
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
