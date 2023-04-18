package com.fullstack.SpringBootBackend.serviceImplementation;

import com.fullstack.SpringBootBackend.service.Coach;

public class VolleyBallPractise implements Coach {
    @Override
    public String runningPractise() {
        return "Pratice only for 5 min";
    }
}
