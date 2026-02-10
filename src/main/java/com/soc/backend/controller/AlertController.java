package com.soc.backend.controller;

import com.soc.backend.dto.AlertDTO;
import com.soc.backend.model.Alert;
import com.soc.backend.model.IOC;
import com.soc.backend.model.InvestigationSummary;
import com.soc.backend.model.ThreatIntelResult;
import com.soc.backend.repository.IOCRepository;
import com.soc.backend.repository.ThreatIntelResultRepository;
import com.soc.backend.service.AlertService;
import com.soc.backend.service.InvestigationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*") // Allow React app to access
public class AlertController {

    private final AlertService alertService;
    private final InvestigationService investigationService;
    private final IOCRepository iocRepository;
    private final ThreatIntelResultRepository threatIntelResultRepository;

    public AlertController(AlertService alertService, InvestigationService investigationService,
            IOCRepository iocRepository, ThreatIntelResultRepository threatIntelResultRepository) {
        this.alertService = alertService;
        this.investigationService = investigationService;
        this.iocRepository = iocRepository;
        this.threatIntelResultRepository = threatIntelResultRepository;
    }

    @PostMapping
    public ResponseEntity<Alert> receiveAlert(@RequestBody AlertDTO alertDTO) {
        Alert alert = alertService.processAlert(alertDTO);
        return ResponseEntity.ok(alert);
    }

    @GetMapping
    public ResponseEntity<Iterable<Alert>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAlertDetails(@PathVariable Long id) {
        Alert alert = alertService.getAlertById(id);
        if (alert == null) {
            return ResponseEntity.notFound().build();
        }

        List<IOC> iocs = iocRepository.findByAlertId(id);
        Map<String, Object> response = new HashMap<>();
        response.put("alert", alert);
        response.put("iocs", iocs);

        // Fetch threat intel results for each IOC
        Map<Long, List<ThreatIntelResult>> tiResults = new HashMap<>();
        for (IOC ioc : iocs) {
            tiResults.put(ioc.getId(), threatIntelResultRepository.findByIocId(ioc.getId()));
        }
        response.put("threatIntel", tiResults);

        // Fetch investigation summary
        Optional<InvestigationSummary> investigation = investigationService.getSummaryByAlertId(id);
        investigation.ifPresent(inv -> response.put("investigation", inv));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/investigate")
    public ResponseEntity<InvestigationSummary> addInvestigation(@PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String action = payload.get("action");
        String notes = payload.get("notes");
        InvestigationSummary summary = investigationService.addInvestigation(id, action, notes);
        return ResponseEntity.ok(summary);
    }
}
