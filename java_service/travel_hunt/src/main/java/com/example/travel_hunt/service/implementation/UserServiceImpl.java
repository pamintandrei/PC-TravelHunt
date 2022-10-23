package com.example.travel_hunt.service.implementation;

import com.example.travel_hunt.model.User;
import com.example.travel_hunt.repository.UserRepository;
import com.example.travel_hunt.service.UserService;
import com.example.travel_hunt.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User findUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new NotFoundException("User " + NotFoundException.NOT_FOUND);
    }
}
