package com.sapns2.springbootapi.types;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TypesController {
    @Autowired
    TypesService typesService;

    @GetMapping("/types")
    public List<String> index() {
        return typesService.getData();
    }
}