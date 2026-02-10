package com.soc.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("iocs")
public class IOC {
    @Id
    private Long id;
    private Long alertId;
    private String type; // IP, DOMAIN, URL, HASH
    private String value;
    private LocalDateTime createdAt;
}
