package se.alex.lexicon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sql")
public class SqlController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/execute")
    public ResponseEntity<?> executeQuery(@RequestBody String sqlQuery) {
        try {
            // Execute the SQL query and return the results
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sqlQuery);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            // Handle errors and return a meaningful message
            return ResponseEntity.badRequest().body("Error executing query: " + e.getMessage());
        }
    }
}
