package com.sapns2.springbootapi.analysis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class AnalysisService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getData(String type, Integer limit) {
        // convert to textblock in future jdk
        final String query = String.join(System.getProperty("line.separator"),
                "SELECT TA_COUNTER as \"weight\", TA_TOKEN as \"text\"",
                "FROM \"$TA_EVENT.fti_notes\"",
                "WHERE TA_TYPE = ?",
                "ORDER BY TA_COUNTER DESC",
                "LIMIT ?");

        List<Map<String, Object>> resultList = jdbcTemplate.queryForList(query, new Object[]{ type, limit });

        return resultList;
    }
}