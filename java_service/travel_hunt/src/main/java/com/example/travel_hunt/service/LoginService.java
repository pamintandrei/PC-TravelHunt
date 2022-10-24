package com.example.travel_hunt.service;

import com.example.travel_hunt.model.User;

public interface LoginService {
    String login(String username, String password);

    User getLoggedUser();

}