<template>
    <b-container class="mt-5">
        <b-row>
            <b-col cols="4"
                   v-for="character in characters"
                   class="mt-5">
                <b-link :to="{ name: 'character', params: {id: character.id} }">
                    <b-img
                            :src="character.thumbnail.path+'/standard_fantastic.jpg'"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2">
                    </b-img>
                    <p class="sh_name">
                        <mark>{{character.name}}</mark>
                    </p>
                </b-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Characters",
    data() {
      return {
        url: String,
        size: 'standard_large.jpg',
      }
    },
    mounted() {
      this.$store.dispatch('getCharacters')
    },
    computed: {
      ...mapState({
        characters: state => state.characters,
      })
    },
    methods: {
    }
  }
</script>

<style scoped>
    .sh_name {
        margin-top: -50px;
    }

    mark {
        color: white;
        background: black;
    }

    img:hover{
        background: linear-gradient(25deg, rgba(216, 38, 67, 0.51), rgba(224, 115, 125, 0.51), rgba(219, 173, 188, 0.5), rgba(196, 228, 255, 0.54))
        /*background: radial-gradient();*/
    }
</style>
