package com.imperial.hotel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public Map<String, String> home() {
        Map<String, String> info = new HashMap<>();
        info.put("message", "Bienvenido a la API del Hotel Imperial");
        info.put("status", "OK");
        info.put("docs", "/swagger-ui.html");
        return info;
    }
}
