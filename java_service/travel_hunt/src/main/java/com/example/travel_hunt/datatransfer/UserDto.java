package com.example.travel_hunt.datatransfer;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserDto {
    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
}
