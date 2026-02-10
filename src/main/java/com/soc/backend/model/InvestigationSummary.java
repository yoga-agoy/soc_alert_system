package com.soc.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("investigation_summaries")
public class InvestigationSummary {
    @Id
    private Long id;
    private Long alertId;
    private String analystAction; // TP, FP
    private String notes;
    private LocalDateTime investigatedAt;
}
