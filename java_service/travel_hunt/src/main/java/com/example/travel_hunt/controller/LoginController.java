package com.example.travel_hunt.controller;

import com.example.travel_hunt.datatransfer.UserDto;
import com.example.travel_hunt.datatransfer.UserLoginDto;
import com.example.travel_hunt.datatransfer.mapper.UserMapper;
import com.example.travel_hunt.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/login")
public class LoginController {
    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto) {
        return new ResponseEntity<>(loginService.login(userLoginDto.getUsername(), userLoginDto.getPassword()),
                HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getLoggedUser() {
        return new ResponseEntity<>(UserMapper.userToDto(loginService.getLoggedUser()), HttpStatus.OK);
    }

}
