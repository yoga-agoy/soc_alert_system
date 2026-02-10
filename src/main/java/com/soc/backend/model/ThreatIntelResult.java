package com.soc.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("threat_intel_results")
public class ThreatIntelResult {
    @Id
    private Long id;
    private Long iocId;
    private String provider; // VirusTotal, AbuseIPDB
    private String verdict; // Malicious, Clean, Suspicious
    private Integer score; // e.g., 85/100
    private String details;
    private LocalDateTime checkedAt;
}
