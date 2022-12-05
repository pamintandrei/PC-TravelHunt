package com.example.travel_hunt.utils;

import com.example.travel_hunt.model.User;

public final class TestUtils {

    public static final User MOCK_USER= new User(1, "mihainan", "password", "Mihai", "Nan");

    public static final String HASHED_PASSWORD = "$2a$12$PkNva5qu5wLpPXgXWVZJy.ldm/9DzmwsoRMNoVpdPUI0yVjrHoVjC";

    public static final String LOGIN_EXCEPTION_MESSAGE = "Bad credentials";

    private TestUtils() {
    }

}

