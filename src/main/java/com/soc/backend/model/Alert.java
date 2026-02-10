package com.soc.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("alerts")
public class Alert {
    @Id
    private Long id;
    private String alertId;
    private String source;
    private String eventType;
    private String severity;
    private String status;
    private LocalDateTime timestamp;
    private String description;
    private String recommendedAction;
    private LocalDateTime createdAt;

    // Host Details
    private String hostHostname;
    private String hostIpAddress;
    private String hostOs;

    // User Details
    private String userUsername;
    private String userDomain;

    // Network Details
    private String networkDestinationIp;
    private Integer networkDestinationPort;
    private String networkProtocol;
    private String networkUrl;

    // File Details
    private String fileFileName;
    private String fileFileHashSha256;
}
