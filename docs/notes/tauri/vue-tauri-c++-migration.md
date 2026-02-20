# 在tauri 中集成简单的 `C++` 的外部库

## 手动编译然后连接 ( `Linux` 环境下 )

### 编写 `C++` 相关的代码

在 `tauri-src/cpp` 目录下编写代码

- `testlib.h`

```cpp
#ifndef MYLIB_H
#define MYLIB_H

#ifdef __cplusplus
extern "C" {
#endif

int add_numbers(int a, int b);
char* process_string(const char* input);
void free_string(char* ptr);

#ifdef __cplusplus
}
#endif

#endif
```

- `testlib.cpp`

```cpp
#include <string>
#include <cstring>

extern "C" {
    // 简单计算
    int add_numbers(int a, int b) {
        return a + b;
    }

    // 字符串处理（需要特别注意内存管理）
    char* process_string(const char* input) {
        std::string result = "Processed: " + std::string(input);
        char* output = new char[result.length() + 1];
        std::strcpy(output, result.c_str());
        return output;
    }

    // 释放 C++ 分配的内存
    void free_string(char* ptr) {
        delete[] ptr;
    }
}
```

### 编译 `cpp` 的文件生成库

```shell
// 生成 linux 下的库
g++ -shared -fPIC -o libs/linux/libtestlib.so cpp/testlib.cpp

// 生成 macos 下的库
g++ -shared -fPIC -o libs/macos/libtestlib.dylib cpp/testlib.cpp

// 生成 windows 下的库
g++ -shared -fPIC -o libs/windows/testlib.dll cpp/testlib.cpp
```

### 修改 `build.rs`

```Rust
// build.rs
use std::env;
use std::path::PathBuf;

fn main() {
  let target_os = env::var("CARGO_CFG_TARGET_OS").unwrap();
  let manifest_dir = env::var("CARGO_MANIFEST_DIR").unwrap();


  let lib_dir = match target_os.as_str() {
    "windows" => PathBuf::from(&manifest_dir).join("libs").join("windows"),
    "macos" => PathBuf::from(&manifest_dir).join("libs").join("macos"),
    "linux" => PathBuf::from(&manifest_dir).join("libs").join("linux"),
    _ => panic!("Unsupported target OS: {}", target_os),
  };

  println!("Using library directory: {}", lib_dir.display());

  if !lib_dir.exists() {
    panic!("Library directory does not exist: {}", lib_dir.display());
  }

  // 1. 编译时链接配置
  println!("cargo:rustc-link-search=native={}", lib_dir.display());

  // 2. 设置运行时搜索路径
  println!("cargo:rustc-link-lib=dylib=testlib");

  println!("cargo:rerun-if-changed=libs/");

  tauri_build::build()
}
```

### 在 `lib.rs` 中把需要使用的 `cpp` 的库的函数，和 `rust` 做一个映射

```Rust
#[link(name="testlib")]
extern "C" {
  fn add_numbers(a: i32, b: i32) -> i32;
  fn process_string(input: *const c_char) -> *mut c_char;
  fn free_string(ptr: *mut c_char);
}

#[tauri::command]
fn cpp_add(a: i32, b: i32) -> i32 {
  unsafe { add_numbers(a, b) }
}

#[tauri::command]
fn cpp_process_string(input: String) -> Result<String, String> {
  unsafe {
    let c_input = CString::new(input).map_err(|e| e.to_string())?;
    let c_output = process_string(c_input.as_ptr());
    if c_output.is_null() {
        return Err("C++ function returned null".to_string());
    }

    let result = CStr::from_ptr(c_output)
    .to_string_lossy()
    .into_owned();

    free_string(c_output);

    Ok(result)
  }
}
```

## 使用 `cc` `crate`来实现自动的配置

在使用 `cc` `crate` 来实现cpp的编译和映射

> 这种情况下，`C++` 的代码部分是相似或者说相同的，`lib.rs` 的编写也是相同的，后面列出两点不同

### 在 `Cargo.toml` 中添加 `cc` `crate`

```TOML
// 其他保持原状
[build-dependencies]
cc = { version = "1.0", features = [] }
```

### 修改 `build.rs`

```Rust
fn main() {
  // 监听代码变化
  println!("cargo:rerun-if-changed=native/include/testlib.h");
  println!("cargo:rerun-if-changed=native/testlib.cpp");

  // cc 负责编译cpp文件成动态库
  cc::Build::new()
    .cpp(true)
    .file("native/testlib.cpp")
    .include("native/include")
    .flag_if_supported("-std=c++17")
    .flag_if_supported("/std:c++17")
    .compile("testlib");

  tauri_build::build()
}

```
