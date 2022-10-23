package com.example.travel_hunt.service.auth;

import com.example.travel_hunt.model.User;
import com.example.travel_hunt.repository.UserRepository;
import com.example.travel_hunt.service.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TravelerDetailsAuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);
        if (user.isPresent()) {
            return new TravelerDetails(user.get());
        }
        throw new UsernameNotFoundException("Credentials " + NotFoundException.NOT_FOUND);

    }
}
