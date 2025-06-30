package com.myapp.userservice.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.myapp.userservice.dto.UserDTO;
import com.myapp.userservice.model.User;
import com.myapp.userservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User registerUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        return userRepository.save(user);
    }

    public boolean authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .map(user -> encoder.matches(password, user.getPassword()))
                .orElse(false);
    }
    public boolean existsByEmail(String email) {
    return userRepository.findByEmail(email).isPresent();
}

public User findByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
}

}
