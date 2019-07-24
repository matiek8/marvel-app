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
  import {mapState} from 'vuex'

  export default {
    name: "Character",
    data() {
      return {
        url: String,
        size: 'standard_large.jpg',
      }
    },
    mounted() {
      this.$store.dispatch('getCharacter', this.$route.params.id)
      this.getImage()
    },
    computed: {
      ...mapState({
        character: state => state.character,
        preUrl: state => state.url
      })
    },
    methods: {
      getImage() {
        this.url= `${this.preUrl}${this.size}`
      }
    }
  }
</script>

<style scoped>

</style>
