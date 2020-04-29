package com.sapns2.springbootapi.chart;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChartService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public HashMap<String, Object> getData() {
        // convert to textblock in future jdk
        final String donutQuery = "SELECT EVENT_TYPE, COUNT(EVENT_TYPE) as COUNT FROM EVENT GROUP BY EVENT_TYPE";
        final String barQuery = "SELECT COUNTRY_NAME, COUNT(COUNTRY_NAME) as COUNT FROM EVENT GROUP BY COUNTRY_NAME";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(donutQuery);

        List<String> donutLabels = new ArrayList<>();
        List<Long> donutData = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            donutLabels.add((String) row.get("EVENT_TYPE"));
            donutData.add((long) row.get("COUNT"));
        }

        rows = jdbcTemplate.queryForList(barQuery);

        List<String> barLabels = new ArrayList<>();
        List<Object> barData = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        barData.add(data);

        for (Map<String, Object> row : rows) {
            barLabels.add((String) row.get("COUNTRY_NAME"));
            data.add((long) row.get("COUNT"));
        }

        HashMap<String, Object> results = new HashMap<>();

        results.put("donutLabels", donutLabels);
        results.put("donutData", donutData);
        results.put("barLabels", barLabels);
        results.put("barData", barData);

        return results;
    }
}