package profile;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProfileDto {

    private String firstName;
    private String lastName;
    private String email;
    private String position;
    private String country;
    private String currentJob;
    private String education;
    private String generalInfo;
}
