<template>
  <main v-if="data.length > 0">
    <div class="left-side" :class="{'expanded': expanded}">
      <LeafletMap />
    </div>
    <div class="right-side data" v-if="place" :class="{'expanded': expanded}">
      <div class="expand" @click="expand()"><i class="fa-solid" :class="{'fa-chevron-up': expanded, 'fa-chevron-down': !expanded}"></i></div>
      <div class="head">
        <div class="back">
          <i class="fa-solid fa-chevron-left" @click="goTo(prevPlace?.slug)" v-if="prevPlace != null"></i>
        </div>
        <div class="place">
          <div class="title">{{place?.name}}</div>
          <div class="cord">{{place?.lat }} | {{ place?.lng }}</div>
        </div>
        <div class="next">
          <i class="fa-solid fa-chevron-right" @click="goTo(nextPlace?.slug)" v-if="nextPlace != null"></i>
        </div>
      </div>
      <div class="main-body">
        <div v-for="(element, index) in place?.sections" class="section">
          <div class="title">{{ element.title  }}</div>
          <div class="body" v-html="element.html"></div>
        </div>
        <div class="gallery section">
          <section id="lightboxes">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h2 class="display-4 my-4 text-uppercase">Lightbox images & videos</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/400" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="image" data-effect="fade"><img src="https://picsum.photos/400" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/401" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="image" data-effect="fade"><img src="https://picsum.photos/401" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://biati-digital.github.io/glightbox/demo/pexels-video-1550080.mp4" class="glightbox" data-title="My title" data-description="description here" data-type="video" data-effect="fade"><img src="https://picsum.photos/402" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/403" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="image" data-effect="fade"><img src="https://picsum.photos/403" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/399" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="image" data-effect="fade"><img src="https://picsum.photos/399" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://www.youtube-nocookie.com/embed/pF37tPGkWio" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="video" data-effect="fade"><img src="https://picsum.photos/398" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/397" class="glightbox" data-title="My title" data-description="description here" data-type="image" data-effect="fade"><img src="https://picsum.photos/397" alt="" class="img-fluid"></a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="image-wrap mb-4">
                    <a href="https://picsum.photos/396" class="glightbox" data-title="My title" data-description="description here" data-desc-position="right" data-type="image" data-effect="fade"><img src="https://picsum.photos/396" alt="" class="img-fluid"></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="gallery section" v-if="place.slug == 'aliwen-cementerio'">
          <div class="title"></div>
          <div class="body">
            <img src="https://ruta.cesuct.cl/images/aliwen.jpg" class="imgthumb"/>
            <p>Ilustración paisaje Aliwen desde la memoria</p>
          </div>
          <div class="body">
            <img src="https://ruta.cesuct.cl/images/video-aliwen.jpg" class="imgthumb" @click="toggler = !toggler"/>
            <p>¿Cómo se construyeron las esculturas Aliwen y Menoko Tromen? - FONDEF ID21I10279</p>
            <FsLightbox
              :toggler="toggler"
              :sources="[
                'https://www.youtube.com/watch?v=d-u-LwTHyec&ab_channel=CENTRODEESTUDIOSOCIOCULTURALESUCTEMUCO',
              ]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right-side no-slug" v-else>
      <div class="expand" @click="expand()"></div>
      <div class="body-main">
        <div class="place-list">
          <h4 class="title-places">Lugares</h4>
          <div class="place" v-for="p in data">
            <RouterLink :to="'/'+p.slug" class="title" :key="p.slug" @click="goTo(p.slug)">
            <div class="name">{{ p.name }}</div>
            <div class="slug"> {{  p.slug }}</div>
            <div class="latlng"> <b>Coordenadas:</b> {{ p.lat }} - {{ p.lng }}</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import LeafletMap from '../components/LeafletMap.vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data';
import { useRoute } from 'vue-router';
import FsLightbox from "fslightbox-vue/v3";
import axios from 'axios';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import { onMounted } from 'vue';

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  name: 'MainView',
  components: {
    LeafletMap,
    FsLightbox,
    CoolLightBox,
  },
  props: {
    slug: {
      type: String,
      default: '',
    },
  },
  setup(props, { params }) {
    const dataStore = useDataStore();
    const { data, expanded } = storeToRefs(dataStore);
    const { updateData } = dataStore;

    const route = useRoute();
    const slug = ref(route.params.slug)

    let place = ref({});
    let prevPlace = ref({});
    let nextPlace = ref({});

    place.value = data.value.find((place) => place.slug === slug.value);
    let index = data.value.findIndex((element) => element.slug === slug.value);

    let prevIndex = index - 1;
    let nextIndex = index + 1;

    prevPlace.value = prevIndex >= 0 ? data.value[prevIndex] : null;
    nextPlace.value = nextIndex < data.value.length ? data.value[nextIndex] : null;

    onMounted(() => {
      GLightbox({ selector: '.glightbox' });
    });

   
    return {
      place,
      prevPlace,
      nextPlace,
      data,
      expanded,
      updateData,
      slug
    }
  },
  data() {
    return {
      index: null,
      items: [
        {
          title: 'In nature, nothing is perfect and everything is perfect',
          description: "Photo by Lucas",
          thumb: 'https://cosmos-images2.imgix.net/file/spina/photo/20565/191010_nature.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835',
          src: 'https://www.youtube.com/watch?v=d0tU18Ybcvk',
        },
        {
          title: 'A beautiful mountain view',
          description: "Photo by Facundo",
          src: 'https://vimeo.com/43338103',
          thumb: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*',
        },
        {
          title: 'In nature, nothing is perfect and everything is perfect',
          description: "Photo by Lucas",
          thumb: 'https://scx1.b-cdn.net/csz/news/800/2019/1-nature.jpg',
          src: '/video.mp4',
        },
      ],
      toggler: false,
      toggler2: false,
      images: [
        {
          src: 'https://via.placeholder.com/800x600.png?text=Image+1',
          thumbnail: 'https://via.placeholder.com/200x150.png?text=Image+1',
        },
        {
          src: 'https://via.placeholder.com/800x600.png?text=Image+2',
          thumbnail: 'https://via.placeholder.com/200x150.png?text=Image+2',
        },
        {
          src: 'https://via.placeholder.com/800x600.png?text=Image+3',
          thumbnail: 'https://via.placeholder.com/200x150.png?text=Image+3',
        },
      ],
    };
  },
  created() {
    console.log(this.$route.params.slug)
    this.$watch('$route.params.slug', (slug) => {
      console.log('changedd sluggg::::;')
      this.place = this.data.find((place) => place.slug === slug);
      let index = this.data.findIndex((element) => element.slug === slug);

      let prevIndex = index - 1;
      let nextIndex = index + 1;

      this.prevPlace = prevIndex >= 0 ? this.data[prevIndex] : null;
      this.nextPlace = nextIndex < this.data.length ? this.data[nextIndex] : null;

      document.title = "Mapa de la Memoria | "+this.place.name;

    });
    this.$watch(
      () => this.data,
      (newValue, oldValue) => {
        this.place = this.data.find((place) => place.slug === this.$route.params.slug);
        let index = this.data.findIndex((element) => element.slug === this.$route.params.slug);

        let prevIndex = index - 1;
        let nextIndex = index + 1;

        this.prevPlace = prevIndex >= 0 ? this.data[prevIndex] : null;
        this.nextPlace = nextIndex < this.data.length ? this.data[nextIndex] : null;
      }
    );
  },
  methods: {
    goTo(slug) {
      this.$router.push(slug);
    },
    keyPress(e) {
      if (e.key === 'e') {
        this.expanded = !this.expanded;
      }
    }, 
    expand(){
      this.expanded = !this.expanded;
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keyPress);
  },
}

</script>

<style>

.image-wrap{
  height:250px;
}
.image-wrap img{
  transition:all ease 0.4s;
  width:100%;
  height:100%;
  object-fit:cover;
  cursor:zoom-in;
}

.image-wrap img:hover{
    transform:scale(0.99);
}


.audios{
  display: flex;
}

.audios p{
  margin: 0;
  padding: 0;
  text-align: center;
}

main {
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 55px);
  width: 100vw;
}

.left-side {
  height: 100%;
  width: calc(45%);
}
.right-side {
  height: 100%;
  width: calc(55%);
}

.right-side .expand{
  display: none;
}

.right-side .body-main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.right-side .title-places{
  font-size: 21px;
  font-weight: bold;
  margin: 20px 2px;
}
.right-side .place-list{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.right-side .place-list .place {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  border: 1px solid #eaeaea;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
}

.right-side .place-list .place:hover{
  background-color: #f5f5f5;
  border: 1px solid #eaeaea;
}

.right-side .place-list .place a{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: black;
}

.right-side .place-list .place .name{
  font-size: 18px;
  font-weight: bold;
}

.right-side .place-list .place .slug{
  font-size: 14px;
  font-weight: normal;
}

.right-side .place-list .place .latlng{
  font-size: 12px;
  font-weight: normal;
}

.no-slug{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.no-slug .body{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.no-slug .body .title{
  font-size: 24px;
  font-weight: bold;
}

.no-slug .body .description{
  font-size: 18px;
  font-weight: normal;
}

.data{
  display: flex;
  flex-direction: column;
  height: 100%;
}

.data .head{
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: var(--color-2);
  color: white;
}

.data .main-body{
  width: 100%;
  height: calc(100% - 72px);
  overflow-y: scroll;
  padding: 10px 20px;
}

.data .head .back{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
  width: 30px;
}

.data .head .next{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
  width: 30px;
}

.data .head .next:hover{
  color: rgba(255, 255, 255, 0.1);
}

.data .head .back:hover{
  color: rgba(255, 255, 255, 0.1);
}

.data .head .place{
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 60px);
}

.data .head .place .title{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 24px;
}

.data .head .place .cord{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 12px;
  font-family: monospace;
}

.data .head i{
  font-size: 24px;
}

.data .section{
  width: 100%;
  padding: 10px 20px;
  background-color: #fefefe;
}

.data .section .title{
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}


@media (max-width: 768px){
  main{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 55px);
  }
  .left-side {
    height: 100%;
    width: 100%;
  }
  .left-side.expanded {
    height: calc(70%) !important;
    width: 100%;
  }
  .right-side {
    height: calc(70%) !important;
    width: 100vw;
  }
  .right-side.expanded {
    height: calc(30%) !important;
    width: 100%;
  }
  .right-side .expand{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100%;
    height: 40px;
    background-color: #2a2a2a;
    cursor: pointer;
  }
}



</style>
