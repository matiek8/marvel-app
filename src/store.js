import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {public_key} from "./marvel";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: []
  },
  mutations: {
    async getCharacters(state) {
      try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${public_key}`);
        response.data.data.results.forEach((item) => {state.characters.push(item)});
        console.log(state.characters);
      } catch (e) {
        console.error(e)
      }
    }
  },
  actions: {
    getCharacters: context => {
      context.commit('getCharacters')
    }
  }
})
