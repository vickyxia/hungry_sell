<template>
  
    <div class="cartcontrol">
    	<!-- 设置减号的动画效果，先用 transition，定义name值为move，css就以move-开始-->
    	<transition name="move">
    		<!-- 减号，food.count>0时才显示,里面用的是font-awesome的图标字体 -->
    	<div class="cart-decrease" v-show="food.count > 0" @click.stop="desNum()" >
    		<span class="inner">
    			<i class="fa fa-minus-square "></i>
    		</span>
    	</div>
      </transition>
    	<!-- 显示数量的div，也是count>0时显示 -->
    	<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    	<!-- 加号 -->
    	<div class="cart-add" @click.stop="addNum()">
    		<span>
    			<i class="fa fa-plus-square fa-2x cart-add" ></i>
    		</span>
    	</div>

  </div>
</template>

<script type="text/ecmascript-6">
// import $ from 'jquery';
import Vue from 'vue';
export default {
	props: {   // 不能直接对props设置count,因为父元素传来的数值改变它就变，自己数据放在data里面
		food: {    // 接收父级组件的food对象goodvue里面的:food="food",这个food没有count属性，要定义
			type: Object
		}
	},
	data() {   // 不受父组件传来影响的数据
		return {
			count: 0
		};
	},
	methods: {
		addNum(el) {
			// 原生浏览器没有这个属性，自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
			if (!event._constructed) {
				return;
			}
			// console.log('click');
			// 点击加号时如果没有food.count属性，就创建Vue.set(),这时候count值为１，
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1);
				// console.log(this.food.count);
			} else {   // 有这个属性的话直接加１
				this.food.count++;
				// console.log(this.food.count);
			}
			this.$emit('cart-add', event.target);
			// 派发事件名字是cart.add，event.target作为参数传入
		},
		desNum() {
			this.food.count = this.food.count > 0 ? this.food.count - 1 : 0;  // 减到０停止
		}
		
	}
	
};
</script> 

<style lang="stylus" ref="stylesheet/stylus">
.cartcontrol
	font-size: 0
	.cart-decrease, .cart-add
		display:inline-block
		vertical-align: center
		line-height: 24px
		font-size:24px
		float: left
		transition: all 0.5s linear
		&.move-transition
			opacity: 1
			transform: translate3D(0, 0, 0)
			.inner
				display: inline-block
				transform: rotate(0)
		&.move-enter, &.move-leave
			opacity: 0
			transform: translate3D(24px, 0, 0)
			.inner
				transform: rotate(90deg)
	.cart-add
		float: right
	.cart-count
		display:inline-block
		width: 35px
		line-height: 24px
		background: #fff
		font-size: 15px
		color: #e37373
		text-align: center
		



</style>
