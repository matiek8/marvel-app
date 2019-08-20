<template>
    <b-container id="sh_characters" class="mt-5">
        <div class="mb-5">
            <h1 id="sh_title"
                 class="display-1">SuperHero
            </h1>
            <b-button variant="outline-danger"
                      @click="update_sh">Shuffle
                <font-awesome-icon icon="random"/>
            </b-button>
        </div>
        <b-row id="sh_characters_block">
            <b-col cols="4"
                   v-for="character in characters"
                   class="mt-5">
                <b-link :to="{ name: 'character', params: {id: character.id} }">
                    <b-img
                            center
                            :src="character.thumbnail.path+'/standard_fantastic.jpg'"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2">
                    </b-img>
                    <div class="img_gradient mx-auto">
                        <p class="sh_name">
                            <mark>{{character.name}}</mark>
                        </p>
                    </div>
                </b-link>
            </b-col>
        </b-row>
        <b-row id="sh_load"></b-row>
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
      this.$store.dispatch('getCharacters');
      // this.show_characters()
    },
    computed: {
      ...mapState({
        characters: state => state.characters,
      })
    },
    methods: {
      update_sh() {
         this.$store.dispatch('getCharacters');
      },
      show_characters() {
        setTimeout(
          document.getElementById("sh_characters_block").style.display = 'flex'
          , 10000)
      }
    }
  }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    #sh_characters {
        min-height: 100vh;
    }

    #sh_title {
        background: linear-gradient(81deg, #df1347, #f5648c, #fd81b1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;
    }

    #sh_characters_block {
        height: 1191.94px;
    }

    #sh_load {
        height: 1191.94px;
        margin-top: -1191.94px;
        background: #dc3545;
    }

    mark {
        color: white;
        background: black;
    }

    .img_gradient {
        margin-top: -258px;
        width: 250px;
        height: 250px;
        position: relative;
    }

    .img_gradient:hover {
        /*background: linear-gradient(25deg, rgba(216, 38, 67, 0.51), rgba(196, 228, 255, 0.54))*/
        background: radial-gradient(rgba(196, 228, 255, 0.54), rgba(216, 38, 67, 0.8));
    }

    p {
        font-family: 'Roboto', sans-serif;
        padding-top: 195px;
    }

    a:hover {
        font-size: 18px;
        text-decoration: none;
    }

</style>
