package com.soc.backend.repository;

import com.soc.backend.model.IOC;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOCRepository extends ListCrudRepository<IOC, Long> {
    List<IOC> findByAlertId(Long alertId);
}
