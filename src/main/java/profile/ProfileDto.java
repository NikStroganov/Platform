package profile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Schema(description = "DTO для профиля пользователя")
public class ProfileDto {

    @Schema(description = "Имя пользователя", example = "Иван")
    private String firstName;
    @Schema(description = "Фамилия пользователя", example = "Иванов")
    private String lastName;
    @Schema(description = "Почта пользователя", example = "ИванИванов@mail.ru")
    private String email;
    @Schema(description = "Должность пользователя", example = "Разработчик")
    private String position;
    @Schema(description = "Страна пользователя", example = "Россия")
    private String country;
    @Schema(description = "Место работы пользователя", example = "ПАО Сбербанк")
    private String currentJob;
    @Schema(description = "Образование пользователя", example = "СПбГЭТУ ЛЭТИ")
    private String education;
    @Schema(description = "Основная информация о пользователе", example = "Привет! Я Иван из России. Люблю писать код")
    private String generalInfo;
}
