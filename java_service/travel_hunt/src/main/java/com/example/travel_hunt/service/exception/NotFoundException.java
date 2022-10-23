package com.example.travel_hunt.service.exception;

public class NotFoundException extends RuntimeException {
    public static String NOT_FOUND = "not found";

    public NotFoundException(String message) {
        super(message);
    }
}
