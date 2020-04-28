package com.sapns2.springbootapi;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class StatusController {

    @GetMapping("/")
    public HashMap<String, String> index(@RequestParam(defaultValue = "Guest") String name) {

        HashMap<String, String> model = new HashMap<>();

        model.put("status", "Greetings, " + name + ", from Spring Boot!");
        model.put("time", LocalDateTime.now().toString());

        return model;
    }

}