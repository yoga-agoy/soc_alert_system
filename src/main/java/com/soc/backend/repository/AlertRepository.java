package com.soc.backend.repository;

import com.soc.backend.model.Alert;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends ListCrudRepository<Alert, Long> {
}
