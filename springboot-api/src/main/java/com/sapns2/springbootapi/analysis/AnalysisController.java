package com.sapns2.springbootapi.analysis;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalysisController {

    @Autowired
    AnalysisService analysisService;

    @GetMapping("/analysis")
    public HashMap<String, Object> index(
            @RequestParam(defaultValue = "") String type,
            @RequestParam(defaultValue = "30") Integer limit) {
        return analysisService.getData(type, limit);
    }
}