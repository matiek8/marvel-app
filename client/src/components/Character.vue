<template>
    <div id="sh_character">
        <b-container v-for="char in character">
            <b-row>
                <b-col cols="8"
                       id="sh_character_col_basic_info">
                    <h1 class="display-2"
                        id="sh_character_name">{{char.name}}</h1>
                    <p id="sh_character_description">{{char.description}}</p>

                </b-col>
                <b-col cols="4"
                       id="sh_character_col_img">
                    <b-img
                            id="sh_character_img"
                            center
                            :src="char.thumbnail.path+'/portrait_uncanny.jpg'"
                            img-alt="Image"
                            img-top
                            tag="article"
                            class="mb-2">
                    </b-img>
                </b-col>
            </b-row>
            <b-container id="sh_character_series" style="">
                <h1>Series</h1>
                <ul v-for="series in char.series.items">
                    <li>
                        {{series.name}}
                    </li>
                </ul>
            </b-container>
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
    },
    computed: {
      ...mapState({
        character: state => state.character,
      }),
    },
    methods: {}
  }
</script>

<style scoped>
    #sh_character {
        margin-top: 50px;
        min-height: 100vh;

    }

    #sh_character_col_img {
        margin-top: 50px;
        margin-left: -50px;
        margin-bottom: 50px;
    }

    #sh_character_img {
        max-width: 20rem;
        box-shadow: -4px 4px 20px 1px #292929;
    }

    #sh_character_col_basic_info {
        background: white;
        margin-right: -50px;
        margin-left: 50px;
        box-shadow: -4px 4px 20px 1px #292929;
    }

    #sh_character_name {
        padding-top: 150px;
        padding-left: 40px;
        padding-right: 60px;
    }

    #sh_character_description {
        padding-left: 50px;
        font-size: 18px;
        padding-right: 60px;
    }

    #sh_character_series {
        background: #dc3545;
        margin-top: -80px;
        margin-bottom: -80px;
        padding: 50px;
        padding-top: 100px;
        color: white;
    }
</style>
