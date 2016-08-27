/**
 * @file itemImageLoader
 * @author Adagio <magicwho@naver.com>
 * @since 2016-08-21
 * @version 1.0
 */

/**
 * @namespace itemImageLoader
 */
(itemImageLoader => {
	"use strict";

	itemImageLoader.uvs = eval(new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta")) + "");
	itemImageLoader.sheet = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));

	/**
	 * 아이템 코드를 아이템 이름으로 변경
	 * @param {Number} itemCode 아이템코드
	 */
	itemImageLoader.item2name = (itemCode) => {
		return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(number, 0, false);
	}

	/**
	 * 아이템비트맵을 반환합니다.
	 * @param {Number} element 아이템 이름
	 * @param {Number} type 아이템 타입
	 */
	itemImageLoader.makeBitmap = (name, type) => {
		for(var i = 0, max = this.uvs.length; i < max; i++) {
			var obj = this.uvs[i];
			if(obj.name === name) {
				return Bitmap.createBitmap(this.sheet, obj.uvs[type][0], obj.uvs[type][1], 16, 16);
			}
		}
	};

	/**
	 * 아이템비트맵을 반환합니다.
	 * @param {Number} element 아이템 이름 or 아이템 코드
	 * @param {Number} type 아이템 타입
	 */
	itemImageLoader.getImage = (element, type) => {
		if(typeof element === "string") itemImageLoader.makeBitmap(element, type);
		if(typeof element === "number") itemImageLoader.makeBitmap(itemImageLoader.item2name(element), type);
	}
})(itemImageLoader);

/*
* EXAMPLE
* itemImageLoader.getImage(364, 0);
* itemImageLoader.getImage("스테이크", 0);
*/
