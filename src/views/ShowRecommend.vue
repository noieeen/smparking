<template>
  <div class="containner">
    <div class="center">
      <h2 class="my-5">Assigned Slot</h2>
      <p class="display-1" style="color:black">{{rec[0].id}}</p>
      <button class="btn btn-warning" @click="getTicket">Get Ticket</button>
    </div>
  </div>
</template>
<script>
import { rdb } from "../firebase";
export default {
  data() {
    return {
      rec: null
    };
  },
  mounted() {
    this.rec = JSON.parse(this.$store.getters.firstSlotOut)
  },
  computed: {
    recommendSlot() {
      //console.log(JSON.parse(this.rec))
      console.log((JSON.parse(this.$store.getters.firstSlotOut)))
      let t = JSON.parse(this.$store.getters.firstSlotOut);

      if (this.$store.getters.firstSlotOut == '"') {
        return "Parking Full";
      } else {
        return t[0];
      }
    }
  },
  methods: {
    getTicket() {
      //   alert(this.recommendSlot);
      // }
      let assignSpot = this.recommendSlot.id;
      let ticketToFirebase = rdb
        .ref("/sensor")
        .child(assignSpot)
        .set(true)
        .then(() => console.log("set best Success"))
        .catch(err => console.log(err))
        .then(()=>{
          alert(this.recommendSlot.id+" to firebase success")
        })
    }
  }
};
</script>
<style lang="scss">
.center {
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}
html,
body {
  margin: 0;
  padding: 0;
  background-color: #aebfbe;
}
</style>

