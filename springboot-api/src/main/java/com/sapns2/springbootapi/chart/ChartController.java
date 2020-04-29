package com.sapns2.springbootapi.chart;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChartController {

    @Autowired
    ChartService chartService;

    @GetMapping("/chart")
    public HashMap<String, Object> index() {
        return chartService.getData();
    }
}