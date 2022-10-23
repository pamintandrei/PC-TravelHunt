package com.example.travel_hunt.controller;

import com.example.travel_hunt.datatransfer.UserDto;
import com.example.travel_hunt.datatransfer.mapper.UserMapper;
import com.example.travel_hunt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Integer id) {
        return new ResponseEntity<>(UserMapper.userToDto(userService.findUserById(id)),
                HttpStatus.OK);
    }
}

