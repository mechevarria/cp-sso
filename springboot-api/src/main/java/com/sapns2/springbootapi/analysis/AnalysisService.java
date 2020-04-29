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

    public HashMap<String, Object> getData(String type, Integer limit) {
        // convert to textblock in future jdk
        final String query = String.join(System.getProperty("line.separator"),
                "SELECT TA_COUNTER, TA_TOKEN",
                "FROM \"$TA_EVENT.fti_notes\"",
                "WHERE TA_TYPE = ?",
                "ORDER BY TA_COUNTER DESC",
                "LIMIT ?");

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, new Object[]{ type, limit });

        List<String> text = new ArrayList<>();
        List<Long> weight = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            text.add((String) row.get("TA_TOKEN"));
            weight.add((long) row.get("TA_COUNTER"));
        }

        HashMap<String, Object> results = new HashMap<>();
        results.put("text", text);
        results.put("weight", weight);

        return results;
    }
}