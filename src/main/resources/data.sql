-- Insert Sample Alerts
INSERT INTO alerts (alert_id, source, event_type, severity, status, description, recommended_action, timestamp, created_at, host_hostname, host_ip_address, host_os, user_username, user_domain)
VALUES 
('ALERT-2023-001', 'EDR', 'Suspicious Process Execution', 'High', 'New', 'Powershell script executed with encoded command line arguments indicative of malicious activity.', 'Isolate host immediately and investigate parent process.', NOW() - INTERVAL 1 HOUR, NOW(), 'WORKSTATION-01', '192.168.1.105', 'Windows 10', 'jdoe', 'CORP'),
('ALERT-2023-002', 'Firewall', 'Outbound Traffic to Known C2', 'Critical', 'InProgress', 'Detected outbound connection attempts to a known Command and Control IP address.', 'Block IP at firewall and scan source host.', NOW() - INTERVAL 2 HOUR, NOW(), 'SERVER-DB-02', '192.168.1.20', 'Linux', 'admin', 'CORP'),
('ALERT-2023-003', 'Email Gateway', 'Phishing Email Detected', 'Medium', 'Resolved', 'Email containing suspicious link detected and quarantined.', 'Notify user and check for any clicks.', NOW() - INTERVAL 5 HOUR, NOW(), 'MAIL-GATEWAY', '192.168.1.5', 'Appliance', 'mmanager', 'CORP');

-- Insert Sample IOCs
-- For ALERT-2023-001
INSERT INTO iocs (alert_id, type, value, created_at) VALUES 
(1, 'HASH', 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890', NOW()),
(1, 'IP', '10.0.0.5', NOW());

-- For ALERT-2023-002
INSERT INTO iocs (alert_id, type, value, created_at) VALUES 
(2, 'IP', '185.100.200.50', NOW()),
(2, 'DOMAIN', 'malicious-c2.com', NOW());

-- For ALERT-2023-003
INSERT INTO iocs (alert_id, type, value, created_at) VALUES 
(3, 'URL', 'http://login-update-security.com/login.php', NOW());

-- Insert Sample Threat Intel Results
-- For IOCs
INSERT INTO threat_intel_results (ioc_id, provider, verdict, score, details, checked_at) VALUES
(1, 'VirusTotal', 'Malicious', 95, 'Known malware hash (Emotet)', NOW()),
(3, 'AbuseIPDB', 'Malicious', 100, 'Known C2 IP, high confidence', NOW()),
(4, 'VirusTotal', 'Suspicious', 70, 'Newly registered domain, associated with other malicious campaigns', NOW());
