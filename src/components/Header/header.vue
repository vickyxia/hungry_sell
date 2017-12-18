<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar">
    	</div>
    	<div class="content">
			<div class="title">
	    		<span class="brand"></span>
	    		<span class="name">{{seller.name}}</span>
	    	</div>
	    	<div class="description">
	    		{{seller.description}}/{{seller.deliveryTime}}分钟送达
	    	</div>
			<div v-if="seller.supports" class="support">
				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
				<span class="text">{{seller.supports[0].description}}</span>
			</div>
		</div>
		<div v-if="seller.supports" class="support-count" @click="showDetail">
			<span class="count">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailshow" class="detail" >
    	<div class="detail-wrapper clearfix">
    		<div class="detail-main">
    			<h1 class="name">{{seller.name}}</h1>
    			<div class="star-wrapper">
    				<star :size="48" :score="seller.score"></star>
    			</div>
    			<div class="title">
    				<div class="line"></div>
    				<div class="text">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<div class="discont-detail" v-for="sup in seller.supports">
    				<div v-if="seller.supports" class="support">
						<span class="icon" :class="classMap[sup.type]"></span>
						<span class="text">{{sup.description}}</span>
					</div>
    			</div>
    			<div class="title-bulletin">
    				<div class="line"></div>
    				<div class="text">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<div class="description-detail">{{seller.bulletin}}</div>
    		
    		</div>
    	</div>
    	<div class="detail-close" @click="hideDetail">
    		<i class="fa fa-close fa-lg"></i> 
    	</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			detailshow: false
		};
	},
	methods: {
		showDetail() {
			this.detailshow = true;
		},
		hideDetail() {
			this.detailshow = false;
		}

	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	components: {
		star
	}
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
 @import '../../common/stylus/mixim.styl'

.header
	position:relative
	color:#fff
	overflow: hidden
	background-color: rgba(7, 17, 27, 0.5)
	.content-wrapper
		position: relative
		padding:24px 16px 18px 24px
		.avatar
			display:inline-block
			vertical-align:top
			img
				border-radius: 2px
		.content
			 display:inline-block
			 font-size:14px
			 margin-left:16px
			.title
				 margin:2px 0 8px 0
				.brand
					 display:inline-block
					 width:30px
					 height:18px
					 vertical-align:top
					 bg-image('brand')
					 background-size:30px 18px
					 background-repeat:no-repeat
				.name
					margin-left:6px
					font-size:16px
					font-weight:bold
					line-height:18px
			.description
				margin: 8px 0 10px 0
				font-size: 12px
				color: rgb(255, 255, 255)
				font-weight: 200
				line-height: 12px
			.support
				.icon
					display:inline-block
					width: 12px
					height: 12px
					margin-right: 4px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.text
					font-size: 10px
					font-weight:200
					line-height: 24px
	 	.support-count
	 		position: absolute
	 		right: 12px
	 		bottom: 18px
	 		padding: 0 8px
	 		height: 24px
	 		line-height: 24px
	 		border-radius: 14px
	 		background-color: rgba(0, 0, 0, 0.2)
	 		text-align: center
	 		.count
	 			vertical-align: center
	 			font-size: 10px
	 		.icon-keyboard_arrow_right	 			
	 			font-size: 10px	 			
	 			line-height: 24px
	 			margin-left: 2px 
	.bulletin-wrapper
		position: relative
		height: 28px		
		line-height: 28px
		padding: 0 22px 0 12px
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
		background: rgba(7, 17, 27, 0.2)
		.bulletin-title
			vertical-align: top
			display: inline-block
			width: 22px
			height: 12px
			margin-top: 7px
			bg-image('bulletin')
			background-size: 22px 12px
			background-repeat: no-repeat
		.bulletin-text
			vertical-align: top
			margin: 0 4px
			font-size: 10px
		.icon-keyboard_arrow_right
			position: absolute
			font-size: 10px	
			right: 10px
			top: 8px				
	.background
		position:absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		filter: blur(10px)
	.detail
		position: fixed
		z-index: 100
		top: 0
		width: 100%
		height: 100%
		overflow: auto
		background: rgba(7, 17, 27, 0.8)
		.detail-wrapper
			min-height: 100%
			width: 100%
			.detail-main
				margin-top: 64px
				padding-bottom: 64px
				.name
					line-height: 16px
					text-align: center
					font-size: 16px
					font-weight:900
				.star-wrapper
					margin-top: 18px
					padding: 2px 0
					text-align center
				.title
					display: flex
					width: 80%
					margin:0 auto
					.line
						flex: 1
						position: relative
						top: -6px
						border-bottom: 1px solid rgba(255, 255, 255, 0.2)
					.text
						padding: 0 12px
						font-size: 14px
				.discont-detail
					display:flex
					width: 80%
					margin-left: 36px
					margin-top: 28px

					.icon
						flex:1
						display:inline-block
						width: 16px
						height: 16px
						margin-right: 6px
						background-size: 16px 16px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size: 20px
						font-weight:200
						line-height: 24px
						color: rgb(255, 255, 255)
				.title-bulletin
					display: flex
					width: 80%
					margin:0 auto
					margin-top: 28px
					.line
						flex: 1
						position: relative
						top: -6px
						border-bottom: 1px solid rgba(255, 255, 255, 0.2)
					.text
						padding: 0 12px
						font-size: 14px
				.description-detail
					width: 80%
					margin: 12px auto
					font-size: 14px
					font-weight: 200px
					color: rgb(255, 255, 255)
					line-height: 24px
				.back
					margin: 0 auto
					text-align: center
					width: 80%
					padding-top: 20px

		.detail-close
			position: relative
			width: 32px
			height: 32px
			margin: 0 auto
			padding-bottom: 24px
			clear: both
			font-size: 24px;
			

			


		













</style>
