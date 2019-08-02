<template>
    <div id="sh_character">
        <b-container>
            <p>{{this.$route.params.id}}</p>
            <ul>
                <li v-for="char in character">
                    {{char.name}}
                    {{char.description}}
                </li>
            </ul>
            <img :src="img_url"
                 alt="">
        </b-container>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Character",
    data() {
      return {
        img_url: '',
        size: 'standard_large.jpg',
      }
    },
    async mounted() {
      this.$store.dispatch('getCharacter', this.$route.params.id)
      await this.getImage()
    },
    computed: {
      ...mapState({
        character: state => state.character,
        preUrl: state => state.url
      }),
      print_url() {
        console.log()
      }
    },
    methods: {
      getImage() {
        console.log(this.preUrl)
        this.img_url = `${this.preUrl}${this.size}`
      }
    }
  }
</script>

<style scoped>
    #sh_character {
        min-height: 100vh;
    }
</style>
