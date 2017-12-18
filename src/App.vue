<template>
  <div >
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
       <div class="tab-item">
        <router-link to="/goods">
          <a>商品</a>
        </router-link>       
     </div>
       <div class="tab-item">
       <router-link to="/ratings">
         <a>评价</a>
        </router-link> 
      </div>
       <div class="tab-item">
        <router-link to="/seller">
         <a>商家</a>
        </router-link > 
       </div>
    </div>
    <div>
       <router-view></router-view>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
// eslint-disable-next-line
  import header from './components/Header/header.vue';
  import $ from 'jquery';
  const ERR_OK = 0;
  export default{
    data() {
      return {
        seller: {}
      };
    },
    created() {  // 钩子函数，生命周期,vue-resource的$http.get.then方法,
      this.$http.get('api/seller').then((response) => {
          response = response.body;                                    
          if (response.errno === ERR_OK) {
              console.log(response.data);  
              this.seller = response.data;         
          }
      });
    },
    components: {
      'v-header': header }
  };
</script>
<style lang="stylus" ref="stylesheet/stylus">
    @import './common/stylus/mixim.styl'
    

    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))      
      .tab-item
        flex: 1
        text-align:center
        & > a
          display:block
          font-size: 14px
          color: rgb(77, 85, 93)
        & > a.router-link-active
            color: rgb(240, 20, 20)
            font-weight:500px
            background: #ecddd8
</style>
