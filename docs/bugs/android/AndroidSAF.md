---
title: Android SAF 踩的坑
tags:
  - Android
  - SAF
---

# Android SAF 踩的坑

## `ActivityNotFoundException`

- 问题描述:

```shell
android.content.ActivityNotFoundException: No Activity found to handle Intent { act=android.intent.action.CREATE_DOCUMENT typ=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (has extras) }
```

- 问题原因:

  - 没有安装可以处理该 Intent 的 Activity。
    一般的 Android 系统都会有能够配合 saf 打开文件路径的 Activity，比如官方的 DocumentsUI，或者一个手机提供的文件管理应用。但是因为我做的软件放在了一个算是嵌入式的一个机器上，这个系统没有提供文件管理应用，所以就会出现这个错误。

- 解决方法:
  - 安装一个文件管理应用，比如官方的 DocumentsUI，或者一个手机提供的文件管理应用，(这个我不知道有没有用，搜到有这样做的)
  - 因为我现在调试的这台设备的版本是固定的 Android7，并且我明确知道其他的能支持 saf，所以对这个系列的做了一个简单处理，在检测到不支持使用 SAF 的功能后，直接使用 Android 较早版本中直接把文件写出到外部存储中的方法进行解决，比较暴力，但针对我现在处理的这个设备，是完全可用并且高效的。

```kotlin
    // 尝试使用 SAF 导出文件，失败后回退到旧方法
    suspend fun exportFileWithFallback(filename: String) {
        val createIntent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            putExtra(Intent.EXTRA_TITLE, filename)
        }
        val canCreate = packageManager.queryIntentActivities(createIntent, PackageManager.MATCH_DEFAULT_ONLY).isNotEmpty()
        if (canCreate) {
            try {
                // 尝试使用 SAF 导出文件
                createDocumentLauncher.launch(filename)
            } catch (e: Exception) {
                Log.e(TAG, "exportFileWithFallback: ", e)
                lifecycleScope.launch(Dispatchers.Main) {
                    showToast(this@MainActivity.getString(R.string.failed_export_try_another))
                }
                exportFileToExternalDirectory(filename)
            }
        } else {
            exportFileToExternalDirectory(filename)
        }
    }
```
