<template>
  <div class="poppin-bottom">
    <div class="row" v-if="product">
      <div class="col-xs-12">
        <h2>{{product.label}}</h2>
        <span>{{product.description}}</span>
      </div>
      <div class="col-xs-12">
        <span class="button" @click.prevent="sendProduct()">
          PAYER {{product.price}} €
        </span>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
  .poppin-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #FFF;
    bottom: -100%;
    transition: all 0.4s ease;
    z-index: 5;
    height: 150px;
  }
  .poppin-bottom.active {
    bottom: 0px;
  }
  .poppin-bottom img {
    max-width: 60px;
  }
  .poppin-bottom .button {
    display: block;
    color: #fff;
    background-color: #1FBEAD;
    width: 80%;
    border-radius: 35px;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    margin: 0 auto;
  }
</style>


<script>
  /* eslint-disable */
  import axios from 'axios';

  export default {
    name: 'PoppinBottom',
    data() {
      return {
        msg: 'coucou',
      };
    },
    props: ['product'],
    methods: {
      sendProduct() {
        // console.log(this.product._id);
        axios.post('/order', { id: this.product._id })
        .then((response) => {
          // console.log(response);
        });
      },
    }
  };
</script>
