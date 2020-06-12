import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let currentFloor = window.localStorage.getItem('floor');

let slotSelect = window.localStorage.getItem('slotSelect');

let showRecommendSlot = window.localStorage.getItem('showRecommendSlot');

export default new Vuex.Store({
  state: {
    floor: currentFloor,
   
    slotSelect:slotSelect,
    showRecommendSlot:showRecommendSlot//['1A-01','1D-04'] 
  },
  mutations: {
    changeFloor(state, floor) {
      state.floor = floor
      //console.log('function changeFloor')
      this.commit('saveData');
    },
 
    changeSlot(state, slot) {
      state.slotSelect = slot
      //console.log('function changeFloor')
      this.commit('saveData');
    },
    showRecommendSlot(state,recommend){
      state.showRecommendSlot = recommend
      this.commit('saveData')
    },
    saveData(state){
      window.localStorage.setItem("floor",JSON.stringify(state.floor));     
      window.localStorage.setItem("slotSelect",JSON.stringify(state.slotSelect));
      window.localStorage.setItem("showRecommendSlot",JSON.stringify(state.showRecommendSlot));
    }
  }, getters: {
    current: state => {
      let now = 1
      now = state.floor
      return now;
    },
    firstSlotOut:state =>{
      // if(state.recommendSlot.length !=0){
     let first = state.showRecommendSlot
      // return first}else{
      //   return "Parking Full"
      // }
      return first
    }
  },
  actions: {},
  modules: {}
});
