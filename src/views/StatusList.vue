<template>
  <div class="container-fulid h-100">
    <div class="container pt-3">
        <router-link to="/recommend">Assign Page</router-link>
      <p class="h1 mt-5">SMparking</p>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#Sensor ID</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,key) in slotStatus" :key="key">
            <th scope="row">{{key}}</th>
            <td colspan="2" v-if="i.status == true" class="fas fa-parking icon-empty mx-2"></td>
            <td v-else-if="i.status == false" class="fas fa-parking icon-full mx-2"></td>
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
      bestStatus:null,
      bestStatusKey:null,
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