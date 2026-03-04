# SpringBoot Validation 自定义校验器

先给出官方文档的链接：[Spring Boot Validation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-validation)

需要设定自己的校验器，这里我需要对两个属性进行相互校验

先给出代码

```kotlin
package com.example.demo.annotation

import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import kotlin.reflect.KClass
import kotlin.reflect.full.memberProperties
import kotlin.reflect.jvm.isAccessible

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [IconValueValidator::class])
annotation class IconValidation(
    val message: String = "Icon validation failed",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = [],
    val iconTypeField: String = "iconType",
    val iconValueField: String = "iconValue"
)

class IconValueValidator: ConstraintValidator<IconValidation, Any> {
    private var iconTypeField: String = "iconType"
    private var iconValueField: String = "iconValue"

    override fun initialize(constraintAnnotation: IconValidation) {
        iconTypeField = constraintAnnotation.iconTypeField
        iconValueField = constraintAnnotation.iconValueField
    }

    override fun isValid(obj: Any?, context: ConstraintValidatorContext): Boolean {
        if (obj == null) return true

        try {
            val kClass = obj::class
            val iconTypeProp = kClass.memberProperties.find { it.name == "iconType" }
            val iconValueProp = kClass.memberProperties.find { it.name == "iconValue" }

            iconTypeProp?.isAccessible = true
            iconValueProp?.isAccessible = true

            val iconType = iconTypeProp?.call(obj)?.toString()
            val iconValue = iconValueProp?.call(obj)?.toString()
            if (iconType == null || iconValue == null) return true

            val isValid = when(iconType) {
                "font" -> iconValue.matches(Regex("^[a-zA-Z0-9_-]+$"))
                "image" -> iconValue.matches(Regex("^(https?|ftp)://[^\\s/$.?#].[^\\s]*$"))
                "svg" -> iconValue.matches(Regex("^<svg[^>]*>.*</svg>$"))
                else -> false
            }

            if (!isValid) {
                context.disableDefaultConstraintViolation()
                context.buildConstraintViolationWithTemplate("Invalid icon value for type $iconType")
                    .addPropertyNode("iconValue")
                    .addConstraintViolation()
            }
            return isValid
        } catch (e: Exception) {
            println("Error during icon validation: ${e.message}")
            return false
        }
    }
}
```

这个校验器会根据 `iconType` 的值来校验 `iconValue` 的格式是否正确

> 因为我的校验器需要在多个类中使用，主要用来校验前端传递的 dto 的准确性, 所以这里使用了反射实现，但是性能应该会有损耗，但是我目前还没有找到更好的方法来实现这个校验器
> 接下来是使用这个校验器的示例：

```kotlin
import com.example.demo.annotation.IconValidation
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern

@IconValidation
data class CategoryCreateDto (
    var name: String? = null,
    var comment: String? = null,
    @field:NotBlank
    @field:Pattern(regexp = "^(font|image|svg)$")
    var iconType: String? = null,
    @field:NotBlank
    var iconValue: String? = null,
)
```
