# vue笔记

## 

## 

## 

## 

## vue常用特性

### 

### 表单操作

1. 

2. 啊啊

3. 表单修饰符
   
   - 这个用在v-model后面(比如:v-model.number = 'age')
   
   - number : 转化为数值
   - trim :  去除头和尾的空格(中间空格无法去除)
   - lazy : 把input事件转化为change事件
     - input事件:当输入时就触发
     - change事件:当内容改变时触发

### 自定义指令-directive

1. 原因 内置指令不满足需求

2. 自定义指令的语法规则

   1. ```javascript
      Vue.directive('focus',{
          insert: function (el) {
              el.focus()
          }
      }
      ```

3. 第一个参数是节点, 第二个参数是数据(例:`this.msg`)

4. 注意使用时用 V-focus,在vue.directive是全局指令  在实例对象中去局部指令

### 计算属性-computed

1. 为了使内容模板更加简洁
2. 需要return回去
3. 使用时直接把方法写上去就行了
4. 如果数据不改变,计算属性只会执行一次

### 侦听器-watch

1. 数据变化时执行异步或开销比较大的操作
2. 就是监听数据的

### 过滤器-filter

1. 格式化数据

2. 自定义过滤去

   ```javascript
   Vue.filter('过滤器名称',function() {
      return //业务逻辑
      //需要return结果
   })
   ```

3. 用管道符" | "+过滤器名称使用

### 数组方法

1. 变异方法(修改原有数据)
   - push()
   - pop()
   - shift()
   - unshift()
   - splice()
   - sort()
   - reverse()
2. 替换数组(生成新的数据)
   - filter()
   - concat()
   - slice()s
3. 修改响应式数据
   - Vue.set(vm.items, index, newValue)
   - vm.$set(vm.items, index, newValue)



## 组件化开发

### 组件注册-component

#### 全局组件	

1. 注册语法

   - ```	javascript
     Vue.component(组件名称,{
         data: 组件数据,
         template: 组件模板内容
     })	
     ```

   - data后面跟的是个函数  且要返回return

#### 命名方式

1. 短横线方式
2. 驼峰式
3. 但是在html中只能是短横线方式

#### 局部组件-components

1. ```javascript
   compponents: {
       '组件名称': 组件内容,
   }
   ```

### 组件间数据交互

#### 父组件向子组件传值

1. 组件内部通过`props`接收传递过来的值

   - ```javascript
     Vue.component('menu-item',{
         props: ['title'],
         template: '<div>{{ title }}</div>'
     })
     ```

2. 父组件通过属性将值传递给子组件

   - ```html
     <menu-item title='来自父组件的数据'></menu-item>
     <menu-item :title='title'></menu-item>
     ```

3. porps属性值类型

   - string
   - number
   - boolean
   - Array
   - object

4. 传值的时候如果用' : '动态绑定则数据类型不会改变, 但是用普通属性绑定会变成字符串

#### 子组件向父组件传值

1. props传递数据原则: 单向数据流

2. 子组件通过自定义事件向父组件传递信息

   - ```html
     <button @click='$emit'('enlarge-text',0.1)>扩大字体</button>
     ```

3. 父组件监听子组件的事件

   - ```html
     <menu-item @enlage-text='fontsize +=$event'></menu-item>
     ```

#### 兄弟组件之间的数据交互

1. ​	单独的事件中心管理组件之间的通信

   - ```javascript
     var eventHub = new Vue()
     ```

2. 监听事件与销毁事件

   - ```javascript
     eventHub.$on('add-todo',addTodo)
     eventHub.$off('add-todo')
     ```

3. 触发事件

   - ```Javascript
     eventHub.$emit('add-todo',id)
     ```

#### 组件插槽

- ```html
  <slot>内容</slot>
  ```

- ```html
  <组件名>插入的内容</组件名>
  ```

具名插槽

- ```html
  <slot name='header'>内容</slot>
  <slot>内容</slot>
  <slot name='footer'>内容</slot>
  ```

- ```html
  <p slot='header'>标题信息</p>
  <p >标题信息</p>
  <p slot='footer'>底部信息</p>
  ```

- ```html
  <template slot='header'>
  	内容
  </template>
  ```


## 前后端交互

### promise用法	

1. 异步调用

   - 定时任务
   - Ajax
   - 事件函数

2. promise优点

   - 避免回调地狱
   - promise对象提供了简洁的API, 使得控制异步操作更加容易

3. 基本用法

   - 实例化Promise对象

   - resolve和reject两个参数处理成功和失败两种情况, 并通过p.then获取处理结果

   - ```javascript
     var p = new Promise(function (resolve,reject){
         //成功时调用 resolve()
         //失败时调用人reject()
     })
     p.then(function(ret){
         
     },function(ret){
         
     })
     ```

4. Promise常用的API

   1. ```javascript
      //实例方法
      p.then
      p.catch
      p.finally
      ```

   2. ```javascript
      //对象方法
      Promise.all([p1,p2,p3]).then(function(result))//全部异步任务完成后接收到的result也是一个数组 
      Promise.race([p1,p2,p3]).then(function(result))//第一个执行完就返回 以result
      ```

### fetch的用法

1. 特性

   1.  更简单的数据获取方式,功能更强大、更灵活，可以看做是xhr的升级版
   2. 基于Promise实现

2. 语法结构

   - ```javascript
     fetch(url)
         .then(fn2)
     	.then(fn3)
     	......
     	.then(fn)
     		
     ```

   - ```javascript
     fetch(url).then(function(data) {
         return data.text()
         //text()方法是属于fetch的一部分,他返回一个Promise实例对象,用于获取后台的数据
     }).then(function(data){
         console.log(data)//这里才是最终的数据
     })
     ```

   - get/delete方法

   - ```javascript
     //服务端用 req.params.id获取
     fetch('http://localhost:3000/books/444',{
     			method: 'get'//method: 'delete'
     		}).then(function(data) {
     			return data.text()
     		}).then(function(data) {
     			console.log(data)
     		})

     
  ```
     
   - post方法
   
   - ```javascript
     //服务端用 req.body.uname获取
     fetch('http://localhost:3000/books/444',{
     			method: 'post',
         		body: 'uname=zhangsan&pwd=123',
         		//请求头是必须加的
         		headers: {
                     'Content-Type':'application/x-www-form-urlencode'
                 }
     		}).then(function(data) {
  			return data.text()
     		}).then(function(data) {
     			console.log(data)
   		})
     //json形式
     fetch('http://localhost:3000/books',{
     			method: 'post',
         		body: JSON.stringify({
         			uname:'zhangsan',
         			pwd: '123'
         		}),
         		//请求头是必须加的
         		headers: {
                     'Content-Type':'application/json'//请求头要变
                 }
     		}).then(function(data) {
     			return data.text()
     		}).then(function(data) {
     			console.log(data)
     		})
     ```
     
   - put形式
   
   - ```javascript
     //服务端用 req.body.uname获取
     fetch('http://localhost:3000/books/123',{
     			method: 'put',
         		body: JSON.stringify({
         			uname:'zhangsan',
         			pwd: '456'
         		}),
         		//请求头是必须加的
         		headers: {
                     'Content-Type':'application/json'
                 }
     		}).then(function(data) {
     			return data.text()
     		}).then(function(data) {
     			console.log(data)
     		})
     ```
   
   - json数据格式
   
   - ```javascript
     fetch('http://localhost:3000/json').then(function(data) {
     			return data.json()
     		}).then(function(data) {
     			console.log(data.uname)
     		})
     
     
     app.get('/json',(req,res) => {
         res.json({
             uname: 'aaa',
             age: 55,
             gender: 'male'
         })
     })
     
     ```
   
3. 数据转换

   1. 字符串与json之间转化

      - ```javascript
        JSON.parse(str)//str转为json
        JSON.stringify({
          	uname:'zhangsan',   
            pwd: 'aaa'
        }) //json转为字符
        ```

### axios

1. axios用法

   1. ```javascript
      axios.get('http://localhost:3000/adata').then(function(data) {
      			console.log(data.data)//这个data是个固定的用法  返回的对象中原型链的参数
      		})
      ```

2. axios常用api

   1. get

      - ```javascript
        axios.get('http://localhost:3000/axios?id=54').then(function(data) {
        	console.log(data.data)
             })
        axios.get('http://localhost:3000/axios/54').then(function(data) {
            console.log(data.data)
        	})
        
        //这个服务器获得的数据的方式是 req.query.id
        axios.get('http://localhost:3000/axios',{
        			params: {
        				id: 14443,
        				name: 'aaaaaa'
        			}
        		}).then(function(data) {
        			console.log(data.data)
        		})
        
        ```

   2. delete

      - ```javascript
        axios.delete('http://localhost:3000/axios',{
        			params: {
        				id: 14443,
        				name: 'aaaaaa'
        			}
        		}).then(function(data) {
        			console.log(data.data)
        		})
        ```

   3. post

      - ```javascript
        //后台用req.body.id接收数据
        axios.post('http://localhost:3000/axios',{
        			id: 14443,
        			name: 'aaaaaa'
        		}).then(function(data) {
        			console.log(data.data)
        		})
        //这个请求是字符串
        var params = new URLSearchParams();
        		params.append('name','zhangsan')
        		params.append('id','12345')
        
        		axios.post('http://localhost:3000/axios',params).then(function(data) {
        			console.log(data.data)
        		})
        
        ```

   4. put

      - ```javascript
        axios.put('http://localhost:3000/axios/1234444',{
        			name: 'zhangsan',
        			id: 23
        		}).then(function(data) {
        			console.log(data.data)
        		})
        ```

3. 响应结果

   - data: 实际返回来的信息
   - header: 响应头
   - status: 响应状态码
   - statusText: 响应状态信息

4. 全局配置

   - ```javascript
     axios.defaults.timeout = 3000 //超时时间
     axios.defaults.baseURL = 'http://localhost:3000/app'//默认地址
     axios.defaults.headers['mytoken']= 'aaaaaaa'//设置请求头
     
     ```

### axios拦截器

1. 请求拦截器

   - ```javascript
     axios.interceptors.request.use(function(config){
     			console.log(config.url)
     			config.header.mytoken = 'nihao'
     			return config
     		},function(err){
     			console.log(err)
     		})
     ```

2. 响应拦截器

   - ```javascript
     axios.interceptors.response.use(function(res){
     			var data = res.data
     			return data
     		},function(err){
     			console.log(err)
     		})
     ```

### async/await

1. 

   - ```javascript
     async function queryData() {
     			var info = await axios.get('asycn1')
     			var ret = await axios.get('asycn2?info='+info.data)
     			// console.log(info)
     			return ret.data
     		}
     		queryData().then(function(data) {
     			console.log(data)
     		})
     ```

     

















