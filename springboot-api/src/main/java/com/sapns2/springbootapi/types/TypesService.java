package com.sapns2.springbootapi.types;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class TypesService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<String> getData() {
        String query = "SELECT DISTINCT TA_TYPE FROM \"$TA_EVENT.fti_notes\"";

        List<String> data = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        for (Map<String, Object> row : rows) {
            data.add((String) row.get("TA_TYPE"));
        }
        return data;
    }
}