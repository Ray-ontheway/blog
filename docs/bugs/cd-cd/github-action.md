# Github Action 踩坑记录

## SSH 密钥错误

> 密钥错误: 在配置 Github Action 时，需要将 ssh 密钥添加到仓库的 Secrets 中。但是在实际访问时，始终报错:
>
> ```shell
> Load key "/home/runner/.ssh/deploy*key": error in libcrypto
> \*\**@\_\*\*: Permission denied (publickey).
> rsync: connection unexpectedly closed (0 bytes received so far) [sender]
> rsync error: unexplained error (code 255) at io.c(232) [sender=3.2.7]
> ```

上述的错误显示是密码错误，所以我来来回回修改配置，测试了很久都不行，然后在网上搜索，直到看见这个 [issue](https://github.com/easingthemes/ssh-deploy/issues/143)。

最后确定在 `Secrets` 添加 `SSH Private Key` 时，需要在添加的最后添加一个换行符，最后就可以了。
