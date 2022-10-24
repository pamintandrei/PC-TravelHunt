package com.example.travel_hunt.service.implementation;

import com.example.travel_hunt.configuration.jwt.AuthTokenFilter;
import com.example.travel_hunt.configuration.jwt.JwtUtils;
import com.example.travel_hunt.model.User;
import com.example.travel_hunt.service.LoginService;
import com.example.travel_hunt.service.auth.TravelerDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Override
    public String login(String username, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return AuthTokenFilter.BEARER + " " + jwtUtils.generateJwtToken(authentication);
    }

    @Override
    public User getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((TravelerDetails) authentication.getPrincipal()).getUser();
    }
}
