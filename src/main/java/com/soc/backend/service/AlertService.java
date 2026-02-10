package com.soc.backend.service;

import com.soc.backend.dto.AlertDTO;
import com.soc.backend.model.Alert;
import com.soc.backend.model.IOC;
import com.soc.backend.repository.AlertRepository;
import com.soc.backend.repository.IOCRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class AlertService {

    private final AlertRepository alertRepository;
    private final IOCRepository iocRepository;
    private final ThreatIntelService threatIntelService;

    public AlertService(AlertRepository alertRepository, IOCRepository iocRepository,
            ThreatIntelService threatIntelService) {
        this.alertRepository = alertRepository;
        this.iocRepository = iocRepository;
        this.threatIntelService = threatIntelService;
    }

    @Transactional
    public Alert processAlert(AlertDTO alertDTO) {
        Alert alert = new Alert();
        alert.setAlertId(alertDTO.getAlertId());
        alert.setSource(alertDTO.getSource());
        alert.setEventType(alertDTO.getEventType());
        alert.setSeverity(alertDTO.getSeverity());
        alert.setStatus(alertDTO.getStatus());
        alert.setDescription(alertDTO.getDescription());
        alert.setRecommendedAction(alertDTO.getRecommendedAction());

        // Map Host Details
        if (alertDTO.getHost() != null) {
            alert.setHostHostname(alertDTO.getHost().getHostname());
            alert.setHostIpAddress(alertDTO.getHost().getIpAddress());
            alert.setHostOs(alertDTO.getHost().getOs());
        }

        // Map User Details
        if (alertDTO.getUser() != null) {
            alert.setUserUsername(alertDTO.getUser().getUsername());
            alert.setUserDomain(alertDTO.getUser().getDomain());
        }

        // Map Network Details
        if (alertDTO.getNetwork() != null) {
            alert.setNetworkDestinationIp(alertDTO.getNetwork().getDestinationIp());
            alert.setNetworkDestinationPort(alertDTO.getNetwork().getDestinationPort());
            alert.setNetworkProtocol(alertDTO.getNetwork().getProtocol());
            alert.setNetworkUrl(alertDTO.getNetwork().getUrl());
        }

        // Map File Details
        if (alertDTO.getFile() != null) {
            alert.setFileFileName(alertDTO.getFile().getFileName());
            alert.setFileFileHashSha256(alertDTO.getFile().getFileHashSha256());
        }

        // Simple parsing, assuming ISO format or similar
        try {
            alert.setTimestamp(LocalDateTime.parse(alertDTO.getTimestamp(), DateTimeFormatter.ISO_DATE_TIME));
        } catch (Exception e) {
            alert.setTimestamp(LocalDateTime.now());
        }
        alert.setCreatedAt(LocalDateTime.now());

        Alert savedAlert = alertRepository.save(alert);

        // Extract IOCs from 'ioc' map
        if (alertDTO.getIoc() != null) {
            for (Map.Entry<String, String> entry : alertDTO.getIoc().entrySet()) {
                IOC ioc = new IOC();
                ioc.setAlertId(savedAlert.getId());
                ioc.setType(entry.getKey().toUpperCase());
                ioc.setValue(entry.getValue());
                ioc.setCreatedAt(LocalDateTime.now());

                IOC savedIoc = iocRepository.save(ioc);

                // Trigger Threat Intel check
                threatIntelService.checkAndSave(savedIoc);
            }
        }

        return savedAlert;
    }

    public Iterable<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public Alert getAlertById(Long id) {
        return alertRepository.findById(id).orElse(null);
    }
}
