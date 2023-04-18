package com.fullstack.SpringBootBackend.serviceImplementation;

import com.fullstack.SpringBootBackend.service.Coach;

public class CricketPractise implements Coach {
    @Override
    public String runningPractise() {
        return " Daily 15 min practise";
    }
}
