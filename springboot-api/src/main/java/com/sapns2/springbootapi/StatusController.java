package com.sapns2.springbootapi;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class StatusController {

    @GetMapping("/")
    public HashMap<String, String> index() {

        HashMap<String, String> model = new HashMap<>();

        model.put("status", "Greetings from Spring Boot!");
        model.put("time", LocalDateTime.now().toString());

        return model;
    }

}