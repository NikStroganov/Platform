package profile.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Schema(description = "Ответы для операций с профилем пользователя")

//TODO Сделать через дженерики, чтобы это был универсальный шаблон на статусы ответа

public class ProfileApiResponse {
    @Schema(description = "Статус код операции")
    private int status;
    @Schema(description = "Сообщение с инофрмацией о результате операции")
    private String message;
    @Schema(description = "Блок с DTO")
    private ProfileDto data;

    public ProfileApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ProfileApiResponse success(int status, String message, ProfileDto data) {
        return new ProfileApiResponse(status, message, data);
    }

    public static ProfileApiResponse error(int status, String message) {
        return new ProfileApiResponse(status, message);
    }
}
