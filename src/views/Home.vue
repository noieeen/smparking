<template>
  <div class="home main-wrapper">
    <div class="background">
      <div class="container h-100">
        <div>
          <nav class="navbar transparent navbar-inverse">
            <router-link to="/" class="navbar-brand h1 mb-0" href="#">SMparking</router-link>
            <div class="nav-item">
              <button
                class="btn btn-primary"
                type="submit"
                data-toggle="modal"
                title="Login"
                data-target="#login"
              >login</button>
            </div>
          </nav>

          <div class="row justify-content-md-center">
            
            <div class="col-4">
              <!-- <b-card
                title="1st Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 100</b-card-text>
              </b-card> -->
              <!-- <b-card
                title="2nd Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 100</b-card-text>
              </b-card> -->

              <!-- <b-card
                title="3rd Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 150</b-card-text>
              </b-card> -->

              
              <ul style="list-style:none;">
                <li v-for="(value, key) in map" :key="key" :prop="value">
                <b-card
                :title= "'Level ' + [[ key+1 ]]  "
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
                >
                <b-card-text class="floor-num">{{ value[1] }}</b-card-text>
                </b-card>
                </li>
              </ul>

            </div>

            <div class="col-6">
              <b-card
                title="Available Total"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="recommend-font">{{countTotal}}</b-card-text>
              </b-card>

              <!-- <b-card
                title="Available Total"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">150</b-card-text>
              </b-card> -->

            </div>
          </div>
          <div>
            <router-link
              to="/config"
              tag="button"
              title="Config"
              class="btn btn-info btn-lg m-2"
            >To Config</router-link>

            <button @click="getZoneWithSlot()">count</button>

            <button class="btn btn-danger btn-lg" @click="resetDB('floors')">Reset DB</button>
          </div>
          <!-- <div>
            <router-link
              to="/config"
              tag="button"
              title="Config"
              class="btn btn-danger btn-lg m-2"
            >To Dashboard</router-link>
          </div>-->
        </div>
      </div>
    </div>

    <login></login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import { db, rdb } from "../firebase";
import * as firebase from "firebase";

export default {
  name: "Home",
  components: { Login },

  data() {
    return {
      countTotal: null,
      arrFloorcount : [],
      arrfloor : [],
      map : new Map(),
    };
  },

  methods: {
    // resetDB() {
    //   console.log("reset");
    //   db.collection("floors")
    //     .get()
    //     .then(res => {
    //       res.forEach(element => {
    //         element.ref.delete();
    //       });
    //     });
    // }

    getZoneWithSlot() {
     
      let floor = 0;
      let floorcount = 0;
      // let map = new Map();
      // let arrFloor = [];
      
      db.collection("floors")
        .get()
        .then(dataFloor => {
          dataFloor.forEach(docFloor => {
            // let size = data.size;
            db.collection("floors")
              .doc(docFloor.id)
              .collection("zoneDetail")
              .get()
              .then(dataZone => {
                // this.total = dataZone.size;
                // console.log("counttotall222",this.total)

                dataZone.forEach(docZone => {
                  //console.log('floor',docFloor.id,'zone',docZone.id,"slot>>>>>>>>>>>", dataZone.size);

                  db.collection("floors")
                    .doc(docFloor.id)
                    .collection("zoneDetail")
                    .doc(docZone.id)
                    .collection("slotDetail")
                    .get()
                    .then(dataSlot => {
                      
                      console.log(
                        "floor>>>",
                        docFloor.id,
                        "zone>>>",
                        dataZone.size,
                        "slot>>>>>>>>>>>",
                        dataSlot.size
                      );
                      this.countTotal += dataSlot.size;
                      console.log("counttotall>>",this.countTotal)  
                      if(!this.map.has(docFloor.id)){
                        this.map.set(docFloor.id, dataSlot.size)
                      }
                      else{
                        floorcount = this.map.get(docFloor.id)
                        this.map.set(docFloor.id, floorcount+dataSlot.size)
                      }
                      console.log("floorrr", this.map)
                      // floorcount += dataSlot.size;
                      //   console.log("floorcount>>",floorcount)
                      // floorcount = dataSlot.size*dataZone.size;
                      // console.log("floorcount>>",floorcount)
                      // this.arrFloorcount.push(floorcount)
                      // console.log("floorcountarrayyy", this.arrFloorcount)
                                          
                      // dataSlot.forEach(docSlot => {
                      //   console.log("slot>>>>>>>>>>>", dataSlot.size);
                      // }); 
                      
                    })
                    
                        
                    // console.log("counttotal", this.countTotal)
                    //  this.total += dataZone.size;
                    //  console.log("counttotall222",this.total)
                     
                    // .then(() => {
                    //    floorCount = this.countTotal;
                    //    if( docFloor.id==1){
                    //      if(floorCount>max){
                    //      max=floorCount;
                    //      arrFloor.push(max);
                    //      }
                    //    }
                       
                       
                    //    console.log("floorcount",floorCount);
                       
                      //  this.arrFloor.push(floorCount); 
                      // .then(() => {
                      //   floorcount += dataSlot.size;
                      //   console.log("floorcount>>",floorcount)
                      // })
                                   
                     
                    })
               
                               
              })
                
          });

          
        });
        
     
     
    }
  },
  computed: {
      
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
.home {
  font-family: "Raleway", sans-serif;
}
.title {
  font-size: 10em;
}
.home {
  height: 100vh;
}
/** */
.recommend-font {
  font-size: 7em;
}
.floor-num {
  font-size: 1.3rem;
}
.background {
  // //position: inherit;
  // /* margin: auto; */
  background-image: url(/png/parkingBG.jpg);
  // /* Full height */
  // height: 100vh;
  // width: 100vw;
  // //padding: 110px;

  // /* Center and scale the image nicely */
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  // /* opacity: 0.65; */
  // /* filter: brightness(80%); */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  // color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: none;
  z-index: 0;
}

.navbar.transparent.navbar-inverse .navbar-inner {
  border-width: 0px;
  -webkit-box-shadow: 0px 0px;
  box-shadow: 0px 0px;
  background-color: rgba(204, 204, 204, 0.253);
  background-image: -webkit-gradient(
    linear,
    50% 0%,
    50% 100%,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0))
  );
  background-image: -webkit-linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
