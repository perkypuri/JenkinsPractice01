package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public String addUser(User user) {
        repository.save(user);
        return "User added successfully";
    }

    @Override
    public List<User> viewAllUsers() {
        return repository.findAll();
    }

    @Override
    public String deleteUser(int id) {
        Optional<User> object = repository.findById(id);
        String msg;
        if (object.isPresent()) {
            User user = object.get();
            repository.delete(user);
            msg = "User deleted successfully";
        } else {
            msg = "User ID not found";
        }
        return msg;
    }
}
