import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {public_key} from "./marvel";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    character:[],
  },
  mutations: {
    async getCharacters(state) {
      try {
        state.characters = [];
        const min_index = 1;
        const max_index = 1481;
        let offset = Math.random()*(max_index-min_index)+min_index;
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?limit=12&offset=${offset}&apikey=${public_key}`);
        response.data.data.results.forEach((item) => {
          state.characters.push(item)
        });
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    },
    async getCharacter(state, id) {
      try {
        state.character = [];
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?apikey=${public_key}`);
        console.log(response);
        response.data.data.results.forEach((item) => {
         state.character.push(item);
        });
      } catch (e) {
        console.error(e)
      }
    }
  },
  actions: {
    getCharacters(context) {
      context.commit('getCharacters')
    },
    getCharacter(context, id) {
      context.commit('getCharacter', id)
    }
  }
})
