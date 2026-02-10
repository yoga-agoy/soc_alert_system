package com.soc.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class AlertDTO {
    @JsonProperty("alert_id")
    private String alertId;
    private String source;
    @JsonProperty("event_type")
    private String eventType;
    private String severity;
    private String status;
    private String timestamp;
    private String description;
    @JsonProperty("recommended_action")
    private String recommendedAction;
    private Host host;
    private User user;
    private Network network;
    private File file;
    private Map<String, String> ioc;

    @Data
    public static class Host {
        private String hostname;
        @JsonProperty("ip_address")
        private String ipAddress;
        private String os;
    }

    @Data
    public static class User {
        private String username;
        private String domain;
    }

    @Data
    public static class Network {
        @JsonProperty("destination_ip")
        private String destinationIp;
        @JsonProperty("destination_port")
        private Integer destinationPort;
        private String protocol;
        private String url;
    }

    @Data
    public static class File {
        @JsonProperty("file_name")
        private String fileName;
        @JsonProperty("file_hash_sha256")
        private String fileHashSha256;
    }
}
