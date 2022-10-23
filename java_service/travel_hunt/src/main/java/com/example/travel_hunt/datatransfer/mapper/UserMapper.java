package com.example.travel_hunt.datatransfer.mapper;

import com.example.travel_hunt.datatransfer.UserDto;
import com.example.travel_hunt.model.User;

public class UserMapper {
    public static UserDto userToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}
