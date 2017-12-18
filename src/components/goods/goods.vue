<template>
	<!-- 组件goods商品页面 -->
  <div class="goods">
  	<!-- 左侧菜单栏类别开始 -->
  	<!-- ref是用来引用的别名，下面的会用$refs.menuWrapper进行引用这个DOM -->
    <div class="menu-wrapper" ref = menuWrapper>
    	<ul>
    		<!-- vue2.0用(item,index) in goods写法．如果当前索引等于计算的索引值，绑定&.current样式 -->
    		<!-- 点击时 selectMenu(index, $event)注意参数，用$event把点击事件传入到函数selectMenu中-->
    		<li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index }" @click="selectMenu(index, $event)">
    			<!-- 每个类别下方的1px的边界 -->
    			<span class="text border-1px">
    				<!-- 类别图片对应good数组里面的type属性good.type -->
    				<!-- 用classMap映射不同的类别的图片，通过:class绑定到icon上 -->
    			<span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
    		</span>
    		</li>
    	</ul>
    </div>
    <!-- 左侧菜单栏类别结束 -->
    <!-- 右侧food列表开始 -->
    <div class="foods-wrapper" ref = foodWrapper>
    	<ul>
    		<!-- 一般用hook钩子表示调用被选择的样式或函数 -->
    		<li v-for="item in goods" class="food-list food-list-hook">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<!-- v-for循环生成每个food的<li> -->
    				<li v-for="food in item.foods" class="food-item">
    					<!-- 图标 -->
    					<div class="icon" width="57px">
    						<img :src="food.icon">
    					</div>
    					<!-- 内容块 -->
    					<div class="content">
    						<!-- 标题 -->
    						<h2 class="name">{{food.name}}</h2>
    						<!-- 描述 -->
    						<p class="desc">{{food.description}}</p>
    						<!-- 其他信息 -->
    						<div class="extra">
    							<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
    						</div>
    						<!-- 价格：原价和现价 -->
    						<div class="price">
    							<span class="price">￥{{food.price}}</span>
    							<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>

    						</div>
    						<div class="cartcontrol">
    							<!-- 传入food对象，关联商品 ，关联cartcontrol.vue-->
    							<!-- 用v-on监听 -->
    							<cartcontrol :food="food" ></cartcontrol>
    						</div>
    					</div>
    					
    				</li>
    			</ul>
    			</h1>
    		</li>
    	</ul>
    </div>
    <!-- 右侧food列表结束 -->
    <!-- 引入购物车组件 -->
    <!-- 用计算属性selectFoods把加入购物车的商品加到foods数组中并返回，传给购物车组件selectFoods -->
    <!-- 这里要写成select-foods形式，到子组件的data就是selectFoods驼峰形式了 -->
    <!-- vue2.0废弃v-el,换成ref,refs -->
    <shopcart :select-foods="selectFoods" ref="shopcart"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
// eslint-disable-next-line
// 引入联动效果的插件 better-scroll(git上)先在package.json的depences里面引入,再$npm install ,最后在此引入即可

import BScroll from 'better-scroll';
// 引入购物车组件，在components里面要注册组件
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
// 定义变量，const是不可改变的
const ERR_OK = 0;
export default {
	prop: {   // 父组件传给子组件的参数
		seller: {
			type: Object
		}
	},
	data() {    // data() {}注意空格和()
		return {
			goods: [],
			listHeight: [],  // 记录foodlist的高度和
			scrollY: 0
		};
	},
	computed: {    // 计算属性
		// 右边的每一类的food，和左边的menu索引值匹配（按照高度区间，上下两块之间算作一个索引，按照listHeight[]数组的内容遍历）
		currentIndex() {    // 计算右边的foodlist对应左侧menu的索引值
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i];  // 当前一类food子块的高度
				let height2 = this.listHeight[i + 1];  // 下一类块的高度
				// 滚到底部时height2为undefined(特殊情况),是在两个子块中间的时候，返回现在的menu子块的索引
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i;  // 返回右侧食物food的每个大模块的索引值（最后一块 || 落在前后区间的块－＞对应的左侧的menu的索引值）
				}
			}
			return 0;
		},
		// 遍历查看已经选择的food
		// 因为selectFoods是计算属性，计算的是goods里面的foods,对每个food数量大于０就把food加到foods数组，包括它的count和price
		// 再把selectFoods以<shopcart :select-foods="selectFoods" ></shopcart>传给子组件shopcart.vue，子组件以props接收
		selectFoods() {
			let foods = [];
			// 遍历每一大类的goods
			this.goods.forEach((good) => {
				// 遍历每个大类里面的每个商品
				good.foods.forEach((food) => {
					// 如果被选择了，就把商品加到foods数组里面
					if (food.count) {
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	created() {    // 实例创建完成后的钩子函数
		// 用的vue-resource,  this.$http.get('/api/goods').then((response) => {});
		this.$http.get('/api/goods').then((response) => {
			response = response.body;     //
			if (response.errno === ERR_OK) {
				this.goods = response.data;
				// console.log(this.goods);
		// Vue 更新数据时是异步的,所以在数据未加载完全之前,Bscroll无法获取目标内容的高度,所以会导致无法滚动的现象
		// 为了解决上面的问题,运用Vue的nextTick();因为DOM至少会在当前tick里面的代码全部执行完毕再更新
				// DOM还没更新
				this.$nextTick(() => {
					// DOM更新了
					this._initScroll();  // 拿到数据，DOM更新
					this._calculateHeight();  // 计算右边食物分类的高度
				});
			}
		});
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	methods: {
		_initScroll() {  // 用better-scroll获取DOM元素，左侧边框menuWrapper和右边的foodWrapper,用$refs获取里面的内容
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
				click: true   // 加上这句后，Menu可以点击
			});
			this.foodScroll = new BScroll(this.$refs.foodWrapper, {
				click: true,   // 加上这句后，food列表才有效可以点击
				probeType: 3
			});
			this.foodScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			});
		},
		_calculateHeight() {  // 获取每个类别商品的高度，
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');  // 用$refs．ref＿name获取ＤＯＭ元素
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0; i < foodList.length; i++) {
				let item = foodList[i];
				height += item.clientHeight; 
				this.listHeight.push(height);
			}
		},
		selectMenu(index, event) {
			// 自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
			if (!event._constructed) {  // 去掉自带的click事件点击，即pc端直接返回
				return;
			}
			// console.log(index);
			// 运用BScroll接口，滚动到相应位置
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			// 获取对应元素的列表
			let el = foodList[index];
			// 设置滚动时间
			this.foodScroll.scrollToElement(el, 300); // 点击左侧的侧边栏，滚动到对应的位置，300ms动画效果
		},
		_drop(target) {
			// 调用子组件shopcart里面的drop方法
		}
	},
	components: {
		shopcart, cartcontrol
	}
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
 @import '../../common/stylus/mixim.styl'

.goods
	display: flex
	position: absolute
	top: 184px
	bottom: 46px
	width: 100%
	overflow: hidden
	.menu-wrapper
		flex: 0 0 80px
		width: 80px
		background: #f3f5f7
		.menu-item
			padding: 0 12px
			display: table
			height: 54px
			line-height: 14px
			width: 56px
			&.current
				position: relative
				z-index: 10
				margin-top: -1px
				background: #fff
				font-weightL 700
				.text
					border-none()
			.icon
				display:inline-block
				vertical-align: top
				width: 12px
				height: 12px
				margin-right: 2px
				background-size: 12px 12px
				background-repeat: no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image('discount_3')
				&.guarantee
					bg-image('guarantee_3')
				&.invoice
					bg-image('invoice_3')
				&.special
					bg-image('special_3')
			.text
				display: table-cell
				width: 56px
				vertical-align: middle
				border-1px(rgba(7, 17, 27, 0.1))
				font-size: 12px


	.foods-wrapper
		flex: 1
.foods-wrapper
	flex: 1
	.title
		padding-left: 14px
		height: 26px
		line-height:26px
		border-left: 1px solid #d9dde1
		font-size: 12px
		color: rgb(147, 153,156)
		background: #f3f5f7
	.food-item
		display: flex
		padding: 18px
		border-1px(rgba(7, 17, 27, 0.1))
		&:last-child
			border-none()
			margin-bottom: 0
		.icon
			flex:0 0 57px
			margin-right: 10px
		.content
			flex: 1
			.name
				margin: 2px 0 8px 0
				height: 14px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.desc
				font-size: 10px
				color: rgb(147, 153, 159)
				line-height: 15px
				padding-bottom: 8px
			.extra
				font-size: 10px
				color: rgb(147, 153, 159)
				line-height: 10px
				padding-bottom: 8px
				.count
					margin-right: 12px
			.price
				font-size: 14px
				color: red
				font-weight: 700
				line-height: 24px
				.oldPrice
					font-size: 10px
					color: rgb(147, 153, 159)
					line-height: 24px
					padding-left: 8px
					margin-right: 8px
			.cartcontrol
				position: absolute
				right: 0
				bottom: 0
				width: 80px







</style>
