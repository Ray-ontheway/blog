# 在vue 项目中进行 tauri 的配置

1. 安装 `Tauri` 需要的依赖

```shell
pnpm add -D @tauri-apps/cli@latest
```

2. `tauri` 初始化，在这里进行配置时，根据自己的需要进行选择

```shell
pnpm tauri init
```

3. `vue` 调用 `tauri` 中定义的函数
   - 安装依赖:

   ```shell
    pnpm add -D @tauri-apps/cli
   ```

   - 编写相关的代码

   ```rust
   // libs.rs
   #[tauri::command]
   fn test(input: String) -> Result<String, String> {
       Ok(format!("Received from Vue: {}", input))
   }
   ```

   ```vue
   // App.vue
   <script setup lang="ts">
   import { invoke } from "@tauri-apps/api/core";
   import { ref } from "vue";
   const rustResult = ref("");
   async function handleTest() {
     try {
       const result = await invoke("test", { input: "Hello from Vue!" });
       rustResult.value = result;
     } catch (error) {
       console.error("Error calling Rust add function: ", error);
     }
   }
   </script>

   <template>
     <h1>You did it!</h1>
     <p>
       Visit
       <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
       to read the documentation
     </p>

     <button @click="handleGetData">Call Rust Get Data Function</button>
     <p>Result from Rust: {{ rustResult }}</p>
   </template>
   ```
