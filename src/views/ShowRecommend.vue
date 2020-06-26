<template>
  <div class="container-fulid h-100">
    <div class="jusify-content-center align-items-center">
      <p class="h1 my-5">Assigned Slot</p>
      <div v-if="!isShow" class="row justify-content-center">
        <EllipsisLoader :color="'#aebfbe'" />
      </div>
      <div>
        <p class="display-1" style="color:black">{{recommendSlot}}</p>
      </div>

      <button class="btn btn-warning m-3" @click="getTicket(nowAssign)">Get Ticket</button>
      <!-- <p class="mt-4">Busy Slot</p>
      <ul class="list-unstyled">
        <li class="pointer" v-for="(i,key) in slotStatus" :key="key">
          {{key}}>>{{i}}
          <i v-if="i.status == true" class="fas fa-parking icon-empty mx-2"></i>
          <i v-else-if="i.status == false" class="fas fa-parking icon-full mx-2"></i>
        </li>
      </ul>-->
    </div>
  </div>
</template>
<script>
import { rdb } from "../firebase";
import EllipsisLoader from "@bit/joshk.vue-spinners-css.ellipsis-loader";
let slotStatusRef = rdb.ref("/sensor");
let bestFromRdbRef = rdb.ref("/bestSlot");
export default {
  components: {
    EllipsisLoader
  },
  data() {
    return {
      isShow: false,
      rec: null,
      arrSensor: null,
      slotStatus: null,
      //slotStatusKey: null,
      sortPriority: new Map(),
      assignVal: new Map(),
      nowAssign: null,
      refreshAssign: false
    };
  },
  created() {
    //this.recommendSlot();
    //console.log("onCreate", this.recommendSlot());
    slotStatusRef.on("value", snapshot => {
      //this.slotStatusKey = snapshot.key;
      this.slotStatus = snapshot.val();
    });
    //this.recommendSlot();
  },
  mounted() {
    slotStatusRef.on("value", snapshot => {
      //this.slotStatusKey = snapshot.key;
      this.slotStatus = snapshot.val();
    });
    this.recommendSlot;
  },
  computed: {
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
      console.log("this.nowAssign", this.nowAssign);
      // if (this.assignVal.keys().next().value != null) {
      this.isShow = true;
      // }
      console.log("isShow", this.isShow);
      return this.assignVal.keys().next().value;
    }
  },
  methods: {
    getTicket(i) {
      if (i != null) {
        let j = rdb
          .ref("sensor/" + i)
          .update({ status: false })
          .then(() => {
            Swal.fire("Updated!", i + " updated successfully.", "success");
          })
          .then(() => {
            this.update();
            this.recommendSlot;
          });
      } else {
        alert("Can not Assign");
      }
    },
    update() {
      slotStatusRef.on("value", snapshot => {
        this.slotStatus = snapshot.val();
        console.log("update");
        //this.recommendSlot();
      });
    }
  },
  watch: {
    re() {
      this.recommendSlot;
    }
  }
};
</script>
<style lang="scss">
.center {
  position: absolute;
  // top: 35%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}
.icon-empty {
  color: #94af76;
}
.icon-full {
  color: #af4448;
}
.pointer {
  cursor: default;
}
.container-fulid {
  background-color: #dce7e7;
}
html,
body {
  margin: 0;
  padding: 0;
  background-color: #dce7e7;
}
</style>

