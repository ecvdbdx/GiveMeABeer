<template>
  <div class="product col-xs-6">
    <div class="product-container" :class="{disabled: isOutOfStock || isBusy}" @click.prevent="sendProduct()">
      <div class="product-details">
        <div class="product-image">
          <img alt="Bootstrap Image Preview"
               :src="product.image"/>
        </div>
        <h2>{{product.label}}</h2>
        <span>{{product.price}}€</span>
        <!--<span>Restants: <span>{{product.current_stock}}</span></span>-->
      </div>
    </div>
    <loader v-if="loading"></loader>
  </div>
</template>

<script>

  /* eslint-disable no-console */
  // import axios from 'axios';
  import * as settings from './../../../shared/config';
  // import * as events from './../../../shared/events';
  import Loader from './Loader';

  export default {
    name: 'Product',
    props: ['product', 'isBusy'],
    data() {
      return {
        loading: false,
        settings,
      };
    },
    methods: {
      sendProduct() {
        // this.loading = true;
        // axios.post('/order', { id: this.product._id })
        // .then((response) => {
          // console.log(response);
        // });
        // this.$socket.emit(events.PRODUCT, this.product.machine_id);
      },
    },
    socket: {
      events: {
        done() {
          this.loading = false;
        },
        update_stock(machineId) {
          if (machineId === this.product.machine_id) {
            this.product.current_stock -= 1;
          }
        },
      },
    },
    computed: {
      isOutOfStock() {
        return this.product.current_stock < 1;
      },
      showPoppin() {
        return this.isBusy && !this.loading;
      },
    },
    components: {
      Loader,
    },
  };
</script>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
  }

  .product {
    display: flex;
    align-items: center;
    transition: all 0.4s ease;
    margin: 15px 0;
  }

  .product-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 150px;
    cursor: pointer;
    width: 50%;
  }

  .product-container {
    display: flex;
    width: 100%;
     border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 3px;
    -webkit-box-shadow: 9px 9px 28px -10px rgba(0, 0, 0, 0.17);
    -moz-box-shadow: 9px 9px 28px -10px rgba(0, 0, 0, 0.17);
    box-shadow: 9px 9px 28px -10px rgba(0, 0, 0, 0.17);
  }

  .product-container.disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  .product.col-md-4 h2 {
    font-size: 1.6em;
    margin: 0 0 8px 0;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .product-details span {
    font-size: 1.3em;
  }

  .product-details span > span {
    font-weight: 600;
    color: #00BFA5;
  }
</style>
