-- Useful SQL Queries for SOC Alert System

-- 1. Get high severity alerts
SELECT * FROM alerts WHERE severity = 'High' ORDER BY timestamp DESC;

-- 2. Count alerts by severity
SELECT severity, COUNT(*) as count FROM alerts GROUP BY severity;

-- 3. Find top recurring IOCs
SELECT value, COUNT(*) as count FROM iocs GROUP BY value ORDER BY count DESC LIMIT 10;

-- 4. Get alerts with malicious threat intel results
SELECT a.alert_id, i.value, t.provider, t.verdict 
FROM alerts a
JOIN iocs i ON a.id = i.alert_id
JOIN threat_intel_results t ON i.id = t.ioc_id
WHERE t.verdict = 'Malicious';

-- 5. Get investigation statistics (TP vs FP)
SELECT analyst_action, COUNT(*) as count FROM investigation_summaries GROUP BY analyst_action;
