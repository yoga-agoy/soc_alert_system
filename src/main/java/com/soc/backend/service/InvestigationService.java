package com.soc.backend.service;

import com.soc.backend.model.InvestigationSummary;
import com.soc.backend.repository.InvestigationSummaryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class InvestigationService {

    private final InvestigationSummaryRepository investigationSummaryRepository;

    public InvestigationService(InvestigationSummaryRepository investigationSummaryRepository) {
        this.investigationSummaryRepository = investigationSummaryRepository;
    }

    public InvestigationSummary addInvestigation(Long alertId, String action, String notes) {
        InvestigationSummary summary = new InvestigationSummary();
        summary.setAlertId(alertId);
        summary.setAnalystAction(action);
        summary.setNotes(notes);
        summary.setInvestigatedAt(LocalDateTime.now());
        return investigationSummaryRepository.save(summary);
    }

    public Optional<InvestigationSummary> getSummaryByAlertId(Long alertId) {
        return investigationSummaryRepository.findByAlertId(alertId);
    }
}
