package com.soc.backend.repository;

import com.soc.backend.model.InvestigationSummary;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvestigationSummaryRepository extends ListCrudRepository<InvestigationSummary, Long> {
    Optional<InvestigationSummary> findByAlertId(Long alertId);
}
