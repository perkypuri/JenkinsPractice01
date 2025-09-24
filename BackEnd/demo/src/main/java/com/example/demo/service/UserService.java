package com.example.demo.service;

import java.util.List;
import com.example.demo.model.User;

public interface UserService {

    public String addUser(User user);

    public List<User> viewAllUsers();

    public String deleteUser(int id);
}
