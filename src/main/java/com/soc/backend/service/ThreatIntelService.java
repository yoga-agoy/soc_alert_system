package com.soc.backend.service;

import com.soc.backend.model.IOC;
import com.soc.backend.model.ThreatIntelResult;
import com.soc.backend.repository.ThreatIntelResultRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class ThreatIntelService {

    private final ThreatIntelResultRepository threatIntelResultRepository;
    private final Random random = new Random();

    public ThreatIntelService(ThreatIntelResultRepository threatIntelResultRepository) {
        this.threatIntelResultRepository = threatIntelResultRepository;
    }

    public void checkAndSave(IOC ioc) {
        // Mocking VirusTotal
        ThreatIntelResult vtResult = new ThreatIntelResult();
        vtResult.setIocId(ioc.getId());
        vtResult.setProvider("VirusTotal");
        vtResult.setCheckedAt(LocalDateTime.now());

        if (random.nextBoolean()) {
            vtResult.setVerdict("Malicious");
            vtResult.setScore(85 + random.nextInt(15));
            vtResult.setDetails("Flagged by 50+ engines");
        } else {
            vtResult.setVerdict("Clean");
            vtResult.setScore(0);
            vtResult.setDetails("No threats found");
        }
        threatIntelResultRepository.save(vtResult);

        // Mocking AbuseIPDB
        ThreatIntelResult abuseResult = new ThreatIntelResult();
        abuseResult.setIocId(ioc.getId());
        abuseResult.setProvider("AbuseIPDB");
        abuseResult.setCheckedAt(LocalDateTime.now());

        if (random.nextBoolean()) {
            abuseResult.setVerdict("Suspicious");
            abuseResult.setScore(40 + random.nextInt(30));
            abuseResult.setDetails("High confidence of abuse");
        } else {
            abuseResult.setVerdict("Clean");
            abuseResult.setScore(0);
            abuseResult.setDetails("Whitelisted domain/IP");
        }
        threatIntelResultRepository.save(abuseResult);
    }
}
