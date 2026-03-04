# MethodArgumentNotValidException 处理

在 Spring Boot 中，当使用 `@Validated` 注解进行参数验证时，如果验证失败，会抛出 `MethodArgumentNotValidException` 异常。为了处理这个异常，我们可以创建一个全局异常处理器。

```kotlin
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.util.stream.Collectors

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleRequestBodyValidationException(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, Any>> {
        val errors = ex.bindingResult
            .fieldErrors
            .stream()
            .map { err -> "${err.field}: ${err.defaultMessage}" }
            .collect(Collectors.toList())
            .toList()
        val map = mapOf (
            "code" to 400,
            "message" to "Validation failed",
            "errors" to errors
        )
        return ResponseEntity.badRequest().body(map)
    }
}
```

> 这个全局异常处理器会捕获 `MethodArgumentNotValidException` 异常，并返回一个包含错误信息的 `ResponseEntity` 对象。
