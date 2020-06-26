<template>
  <div class="container-fulid h-100">
    <div id="logo-background">
      <p class="logo">SM</p>
    </div>
    <div class="container pt-3" style="z-index:1;">
      <router-link to="/recommend">Go to Assign Page</router-link>
      <p class="h1 mt-5">SMparking</p>

      <table class="table table-hover mt-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#Sensor ID</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,key) in slotStatus" :key="key">
            <th scope="row">{{key}}</th>
            <td colspan="2" v-if="i.status == true" class="mx-2 text-left">
              <i class="fas fa-parking mr-2 icon-empty"></i>Aviliable
            </td>
            <td colspan="2" v-else-if="i.status == false" class="mx-2 text-left">
              <i class="fas fa-parking icon-full mr-2"></i>Busy
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { rdb } from "../firebase";
let slotStatusRef = rdb.ref("/sensor");
let bestFromRdbRef = rdb.ref("/bestSlot");
export default {
  data() {
    return {
      rec: null,
      arrSensor: null,
      slotStatus: null,
      bestStatus: null,
      bestStatusKey: null,
      //slotStatusKey: null,
      sortPriority: new Map(),
      assignVal: new Map(),
      nowAssign: null
    };
  },
  mounted() {
    //this.rec = JSON.parse(this.$store.getters.firstSlotOut);
    slotStatusRef.on("value", snapshot => {
      //this.slotStatusKey = snapshot.key;
      this.slotStatus = snapshot.val();
    });
    bestFromRdbRef.on("value", snapshot => {
      this.bestStatus = snapshot.val();
      this.bestStatusKey = snapshot.key;
    });
    this.recommendSlot();
  },
  methods: {
    recommendSlot() {
      let fb = this.slotStatus;
      for (let i in fb) {
        if (fb[i].status == true) {
          this.assignVal.set(i, fb[i].value);
        }
      }
      this.assignVal[Symbol.iterator] = function*() {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
      };
      //console.log(typeof this.slotStatus, this.slotStatus);
      //console.log("MAP", this.assignVal.keys().next().value);
      this.nowAssign = this.assignVal.keys().next().value;
      return this.assignVal.keys().next().value;
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&family=IBM+Plex+Sans:ital,wght@1,600&family=Monoton&display=swap");

.container-fulid {
  background-color: white;
}
.logo {
  //font-family: 'IBM Plex Sans', sans-serif;
  // font-family: "Bungee Shade", cursive;
  font-family: "Monoton", cursive;
  color: #d8d8d8;
}
#logo-background {
  left: 68%;
  top: 48%;
  font-size: 21rem;
  position: fixed;
  font-weight: 400;
  opacity: 50%;
  z-index: 0;
}
#logo-background :hover {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
}
</style>