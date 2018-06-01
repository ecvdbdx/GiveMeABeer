<template>
  <div class="container-fluid">
    <navigation :categories="categories"></navigation>
    <div class="row">
      <div class="col-md-12" style="text-align: center; padding-bottom: 80px;">
        <div class="row">
          <product
            v-for="product in products"
            :product="product"
            :isBusy="isBusy"
            :key="product.id"
            v-show="product.categories.includes(currentCategory)"
            :class="{show: product.category === currentCategory}"
            @click.native="selectproduct(product)"
          >
          </product>
        </div>
      </div>
    </div>
    <poppin :class="{active: showPoppin}"></poppin>
    <poppin-bottom :class="{active: showPoppinBottom}" :product="selectedProduct"></poppin-bottom>
    <div class="filter" :class="{active: showPoppinBottom}" @click="showPoppinBottom = false"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Product from './Product';
  import Poppin from './Poppin';
  import PoppinBottom from './PoppinBottom';
  // import * as config from './../../../shared/config';
  // import * as events from './../../../shared/events';
  import Navigation from './Navigation';

  export default {
    name: 'Home',
    data() {
      return {
        products: [],
        isBusy: false,
        processing: false,
        categories: [],
        currentCategory: null,
        showPoppinBottom: false,
        selectedProduct: null,
      };
    },
    methods: {
      filterCategories() {
        this.products.forEach((product) => {
          product.categories.forEach((productCategory) => {
            const test = this.categories.find(category => category === productCategory);
            if (typeof test === 'undefined') {
              this.categories.push(productCategory);
            }
            this.currentCategory = this.categories[0];
          });
        });
      },
      selectproduct(product) {
        this.selectedProduct = product;
        this.showPoppinBottom = true;
      },
    },
    mounted() {
      console.log(this.showPoppinBottom);
      axios.get('/products')
        .then((response) => {
          this.products = response.data;
          this.filterCategories();
        });
    },
    socket: {
      events: {
        busy() {
          // console.log(`Receive new event: ${events.BUSY}`);
          this.isBusy = true;
        },
        done() {
          // console.log(`Receive new event: ${events.DONE}`);
          this.isBusy = false;
        },
        processing(processing) {
          // console.log(`Receive new event: ${events.PROCESSING}`);
          this.processing = processing;
        },
      },
    },
    computed: {
      showPoppin() {
        return !this.processing && this.isBusy;
      },
    },
    components: {
      Product,
      Poppin,
      Navigation,
      PoppinBottom,
    },
  };
</script>

<style>
  .filter {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
    transition: all 0.4s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .filter.active {
    opacity: 1;
    pointer-events: all;
  }
</style>
