## 微信小程序开发用 JS ES8 async/await 解决异步调用


来自facebook [regenerator-runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)

```javascript
import regeneratorRuntime from './runtime.js'; // regeneratorRuntime 

Page({
  onLoad() {
    this.getList();
  },

  async getList() {
    try {
      let result = await getListAsync();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
});

```