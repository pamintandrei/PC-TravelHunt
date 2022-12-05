package com.example.travel_hunt.service;

import com.example.travel_hunt.TravelHuntApplication;
import com.example.travel_hunt.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.example.travel_hunt.utils.TestUtils.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = TravelHuntApplication.class)
class LoginServiceIntegrationTest {

    @Autowired
    private LoginService loginService;

    @Test
    void testLoginSuccessful() {
        String jwtResponse = loginService.login(MOCK_USER.getUsername(), MOCK_USER.getPassword());
        assertThat(jwtResponse.length()).isGreaterThan(6);
        assertThat(jwtResponse.contains("Bearer")).isTrue();
        User user = loginService.getLoggedUser();
        assertEquals(MOCK_USER.getId(), user.getId());
        assertEquals(MOCK_USER.getUsername(), user.getUsername());
        assertEquals(HASHED_PASSWORD, user.getPassword());
        assertEquals(MOCK_USER.getFirstName(), user.getFirstName());
        assertEquals(MOCK_USER.getLastName(), user.getLastName());
    }

    @Test
    void testLoginFailure() {
        String username = MOCK_USER.getUsername();
        String password = MOCK_USER.getPassword() + 'a';
        Exception loginException = assertThrows(BadCredentialsException.class,
                () -> loginService.login(username, password));
        assertEquals(LOGIN_EXCEPTION_MESSAGE, loginException.getMessage());
        assertThrows(NullPointerException.class, () -> loginService.getLoggedUser());
    }
}

