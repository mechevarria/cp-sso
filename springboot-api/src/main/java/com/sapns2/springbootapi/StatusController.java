package com.sapns2.springbootapi;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class StatusController {

    @GetMapping("/")
    public Map<String, String> index(@RequestParam(defaultValue = "Guest") String name) {

        Map<String, String> model = new HashMap<>();

        model.put("message", "Greetings, " + name + ", from Spring Boot!");
        model.put("time", LocalDateTime.now().toString());

        return model;
    }

}