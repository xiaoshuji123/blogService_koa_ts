# blogService_koa_ts

### 引入 koa

1. npm i koa @types/koa

### 引入 typescript

1.  npm i typescript
2.  npm i ts-node 将 ts 转换为 js，不管是浏览器还是 node，都只认 js
3.  tsc --init 初始化 tsconfig.json，当 ts 编译时会根据里面的配置进行编译

### 配置别名

在 tsconfig.json 中修改 `baseUrl` 和 `paths` 参数

```json
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"],
    },
    ...
  }
}
```

在 node 中有个问题，就是 ts-node 无法识别这个定义的别名 src，解决办法: 引入 module-alias，在主程序入口的最前面注册一下
参考：https://levelup.gitconnected.com/path-aliases-with-typescript-in-node-js-230803e3f200
main.ts

```ts
import moduleAlias from 'module-alias/register'; // 支持路径别名
...
```

配置一下 package.json

```json
{
  ...
  "_moduleAliases": {
      "src": "src"
    },
  ...
}
```

如果不想更改 package.json 文件的话，可以在代码中手动注册
main.ts

```ts
import moduleAlias from 'module-alias'; // 支持路径别名
moduleAlias.addAlias('src', __dirname); // 编程的方式注册别名
...
```
