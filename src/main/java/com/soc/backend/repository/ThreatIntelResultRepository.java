package com.soc.backend.repository;

import com.soc.backend.model.ThreatIntelResult;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreatIntelResultRepository extends ListCrudRepository<ThreatIntelResult, Long> {
    List<ThreatIntelResult> findByIocId(Long iocId);
}
