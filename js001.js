
		// 返回元素e的第n层祖先元素
		function retParent(node,n) {
			var e = node;
			while(n && e){
				e = e.parentElement;
				n --;
			}
			return e;
		}
		// var span = document.getElementsByTagName('span')[0];
		//返回元素e的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负，返回前面的，n为0，返回自己(包括IE)
		function retSibling(node,n) {
			var e = node;
			while(n && e){
				if(n > 0){
					if(e.nextElementSibling){
						e = e.nextElementSibling;
					}else{
						for(e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling){}
					}
				n --;
				}else{
					if(e.previousElementSibling){
						e = e.previousElementSibling;
					}else{
						for(e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling){}
					}
				n ++;
				}
			}
			return e;
		}

		function ajax(method, address, flag, callbacks, data) {
			var xhr = null;
			if(window.XMLHttpRequest){
				xhr = new XMLHttpRequest();
			}else{
				xhr = new ActiveXObject('Microsoft.XMLHttp');
			}
			if(method == 'get'){
				xhr.open('get', address, flag);
				xhr.send();
			}else if(method == 'post'){
				xhr.open('post', address, flag);
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
				xhr.send(data);
			}
			xhr.onreadystatechange = function () {
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						callbacks(xhr.responseText);
					}else{
						alert('' + xhr.status);
					}
				}
			}
		}
		
		// 14： 如何将数组去重说说你的思路
			Array.prototype.unique = function () {
		      var len = this.length,
		      arr = [],
		      obj = {};
		      for (var i = 0; i < len; i++) {
		            if (!obj[this[i]]) {
		                  obj[this[i]] = 1;
		                  arr.push(this[i]);
		            }
		      }
		      return arr;
			}
		// 当我们数组中的这个数据出现过一次之后，我们就在obj中将这个元素的
		// 值的位置标记成1，后面如果出现相同的属性值，因为这个位置已经是1了
		// ，所以就不会添加到新数组里面，从而达到了去重的效果。
		function getStyle(obj,propStyle) {
			if(obj.currentStyle) {
				return obj.currentStyle[propStyle];
			}else{
				return window.getComputedStyle(obj,false)[propStyle];
			}
		}
		// var span = document.getElementsByTagName('span')[0];
		// 打印当前是何年何月何日何时，几分几秒
		function writeDate() {
			var date = new Dae();
			return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日 星期'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()
		}
		// 函数insertAfter()；功能类似insertBefore();
		Element.prototype.insertAfter = function (insertNode,afterNode) {
			var node = this,
			trageNode = afterNode.nextElementSibling,
			child = node.children,
			len = child.length;
			if(len <= 1 || !trageNode){
				node.appendChild(insertNode);
			}else{
				node.insertBefore(insertNode,trageNode);
			}
		}
		// var span = document.getElementsByTagName('span')[0];
		// var li = document.getElementsByTagName('li')[0];
		// var div = document.getElementsByTagName('div')[0];
		// var ul = document.getElementsByTagName('ul')[0];
		// ul.insertAfter(li,span);
		// 使得child.remove()直接可以销毁自身
		Element.prototype.remove = function () {
			var node = this;
			node.parentNode.removeChild(node);
		}
		 // var ul = document.getElementsByTagName('ul')[0];
		 // var div = document.getElementsByTagName('div')[0];
		 // ul.removeChild(ul);
		 // 求滚动轮滚动距离getScrollOffset()，包括老版本IE
		 function getScrollOffset () {
		 	if(window.pageXOffset){
		 		return{
		 			X: window.pageXOffset,
		 			Y: window.pageYOffset
		 		}
		 	}else{
		 			return{
		 				X: document.body.scrollLeft + document.documentElement.scrollLeft,
		 				Y: document.body.scrollTop + document.documentElement.scrollTop
		 			}
		 	}
		 }
		 // 返回浏览器视口尺寸getViewportOffset()，包括老版本IE
		 function getViewportOffset () {
		 	if(window.innerHeight){
		 		return{
		 			Height: window.innerHeight,
		 			Width: window.innerWidth
		 		}
		 	}else{
		 			if(document.compatMode === "CSS1Compat"){
		 				return{
		 					Height: document.documentElement.clientHeight,
		 					Width: document.documentElement.clientWidth
		 				}
		 			}else{
		 				return{
		 					Height: document.body.clientHeight,
		 					Width: document.body.clientWidth
		 				}
		 			}
		 		}
		 }
		 // 返回元素的几何尺寸getElementOffset()，包括老版本IE
		 function getElementOffset(elem) {
		 	var box = elem.getBoundingClientRect();
		 	if(box.width){
		 		return{
		 			Height: box.height,
		 			Width: box.width
		 		}
		 	}else{
		 		return{
		 			Height: box.bottom - box.top,
		 			Width: box.right-box.left
		 		}
		 	}
		 }
		 // 求元素相对于文档的坐标(距离浏览器边框的距离) getElementPosition()
		 function getElementPosition(elem) {
		 		var L = elem.offsetLeft,T = elem.offsetTop;
		 		while(elem.offsetParent !== document.body){
		 				L += elem.offsetLeft;
		 				T += elem.offsetTop;
		 				elem = elem.offsetParent;
		 			}
		 		return{
		 			X: L,
		 			Y: T
		 		}
		 }
		// var div2 = document.getElementsByTagName('div')[1];
		// var div3 = document.getElementsByTagName('div')[2];
		// var div1 = document.getElementsByTagName('div')[0];
		// var div4 = document.getElementsByTagName('div')[3];
		// var ul = document.getElementsByTagName('ul')[0];
		// 用事件绑定函数(包括IE,其实事件处理函数可以解除)
		function addEvent(elem,type,handler) {
			if(elem.addEventListener){
				elem.addEventListener(type, handler, false);
			}else if(elem.attachEvent){
				elem['temp' + type + handler] = handler;
				// 在Element上加一个方法
				elem[type + handler] = function () {
					elem['temp' + type + handler].call(elem);
				}
				elem.attachEvent('on' + type, elem[type + handler]);
			}else{
				elem['on' + type] = handler;
			}
		}
		// 取消事件绑定函数
		// handler参数应该传elem[type + handler]
		function removeEvent(elem, type, handler) {
			if(elem.removeEventListener) {
				elem.removeEventListener(type, handler, false);
			}else if(elem.detachEvent){
				elem.detachEvent('on' + type, handler);
			}else{
				elem['on' + type] = null; 
			}
		}
		// 取消冒泡函数
		// event参数是function(e){}中的e
		function stopBubble(event) {
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelable = true;
			}
		}
		// 阻止默认事件
		function cancelDefault(event) {
			if(event.preventDefault) {
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		}
		//拖拽
		function drag(elem) {
			var disX,
				disY;
			addEvent(elem, 'mousedown', function (e) {
				var event = e || window.event;
				disX = event.clientX - parseInt(getStyle(elem, 'left'));
				disY = event.clientY - parseInt(getStyle(elem, 'top'));
				addEvent(document, 'mousemove', mouseMove);
				addEvent(document, 'mouseup', mouseUp);
				stopBubble(event);
				cancelHandler(event);
			});
			function mouseMove(e) {
				var event = e || window.event;
				elem.style.left = event.clientX - disX + 'px';
				elem.style.top = event.clientY - disY + 'px';
			}
			function mouseUp(e) {
				var event = e || window.event;
				removeEvent(document, 'mousemove', mouseMove);
				removeEvent(document, 'mouseup', arguments.callee);
			}
		}
		//异步加载JS,url链接,callback回调函数
		function asyncLoaded(url, callback) {
			var script = document.createElement('script');
			script.type = "text/javascript"
			if (script.readyState) {
				script.onreadystatechange = function () {
					if(script.readyState == "complete" || script.readyState
						== "loaded") {
						script.onreadystatechange = null;
						callback();
					}
				}
			}else{
				script.onload = function () {//Chrome Safari Opera Firefox
					script.onload = null;
					callback();
				}
			}
			script.src = "js001.js";
			document.body.appendChild(script);
		}
		//拖拽函数
		var div = document.getElementsByTagName('div')[0];
		function drag() {
			div.addEventListener('mousedown', function (e) {
				var e = e || window.event;
				var x = e.clientX,
					y = e.clientY;
				disX = x - div.offsetLeft;
				disY = y - div.offsetTop;
				console.log(disY);
				document.addEventListener('mousemove', move, false);
				div.addEventListener('mouseup', up, false);
			}, false)
			function move(e) {
				div.style.left = e.clientX - disX + "px";
				div.style.top = e.clientY - disY + "px";
			}
			function up() {
				document.removeEventListener('mousemove', move, false);
			}
		}
		drag(div);
		//浅克隆
		function clone(parent, child) {
			var child = child || {};
			for(var prop in parent){
				if(parent.hasOwnProperty(prop)){
					child[prop] = parent[prop];
				}
			}
		}
		//深克隆
		function deepClone(parent, child) {
			var child = child || {},
				toStr = Object.prototype.toString,
				arrStr = '[object Array]';
				for(var prop in parent) {
					if(parent.hasOwnProperty(prop)){
						if(typeof(parent[prop]) == 'object'){
							child[prop] = (toStr.call(parent[prop]) == arrStr) ? [] : {};
							deepClone(parent[prop], child[prop]);
						}else{
							child[prop] = parent[prop];
						}
					}
				}
		}