create table users (
    id              bigint not null auto_increment primary key,
    username        varchar(50) not null unique,
    password        varchar(100) not null,
    email           varchar(100) not null unique,
    first_name      varchar(50) not null,
    last_name       varchar(50) not null,
    avatar_img_url  varchar(100),
    description     varchar(500),
    role            varchar(50)
    );

create table skills
(
    id        bigint      not null auto_increment primary key,
    name      varchar(50) not null unique,
    parent_id bigint null references skills(id)
);

-- insert into skills (name, parent_id)
-- values ('Programming', null),
--        ('Web Development', 1),
--        ('Mobile Development', 1),
--        ('Game Development', 1),
--        ('Data Science', 1),
--        ('Machine Learning', 5),
--        ('Deep Learning', 5),
--        ('Computer Vision', 5),
--        ('Natural Language Processing', 5),
--        ('Big Data', 5),
--        ('Data Engineering', 5),
--        ('Data Analysis', 5),
--        ('Data Visualization', 5),
--        ('Data Mining', 5);

-- insert level 1
INSERT INTO skills (name, parent_id)
VALUES ('Programming', NULL),
       ('Database Administration', NULL),
       ('Network', NULL),
       ('Cybersecurity', NULL);

-- get id for level 1
WITH ParentIDs AS (
    SELECT id, name
    FROM skills
    WHERE parent_id IS NULL
)

-- insert level 2
INSERT INTO skills (name, parent_id)
SELECT
    sub.name,
    ParentIDs.id
FROM
    ParentIDs
        JOIN (
        VALUES
            ('Web Development', 'Programming'),
            ('Mobile Development', 'Programming'),
            ('Game Development', 'Programming'),
            ('Programming Languages', 'Programming'),
            ('Relational Databases', 'Database Administration'),
            ('NoSQL Databases', 'Database Administration'),
            ('Database Design', 'Database Administration'),
            ('Network Security', 'Network'),
            ('Network Architecture', 'Network'),
            ('Network Administration', 'Network'),
            ('Ethical Hacking', 'Cybersecurity'),
            ('Security Auditing', 'Cybersecurity'),
            ('Cryptography', 'Cybersecurity'),
            ('Incident Response', 'Cybersecurity')
    ) AS sub(name, parent_name) ON ParentIDs.name = sub.parent_name;

-- get id for level 2
WITH ParentIDs AS (
    SELECT id, name
    FROM skills
    WHERE parent_id IN (SELECT id FROM skills WHERE parent_id IS NULL)
)

-- insert level 3
INSERT INTO skills (name, parent_id)
SELECT
    sub.name,
    ParentIDs.id
FROM
    ParentIDs
        JOIN (
        VALUES
            ('Frontend Development', 'Web Development'),
            ('Backend Development', 'Web Development'),
            ('Full-stack Development', 'Web Development'),
            ('UI/UX Design', 'Web Development'),
            ('iOS Development', 'Mobile Development'),
            ('Android Development', 'Mobile Development'),
            ('Cross-platform Development', 'Mobile Development'),
            ('Unity Development', 'Game Development'),
            ('Unreal Engine Development', 'Game Development'),
            ('Mobile Game Development', 'Game Development'),
            ('Java', 'Programming Languages'),
            ('Python', 'Programming Languages'),
            ('C++', 'Programming Languages'),
            ('JavaScript', 'Programming Languages'),
            ('Ruby', 'Programming Languages'),
            ('Swift', 'Programming Languages'),
            ('Kotlin', 'Programming Languages'),
            ('PHP', 'Programming Languages'),
            ('TypeScript', 'Programming Languages'),
            ('Go', 'Programming Languages'),
            ('Rust', 'Programming Languages'),
            ('Perl', 'Programming Languages'),
            ('C#', 'Programming Languages'),
            ('MySQL', 'Relational Databases'),
            ('PostgreSQL', 'Relational Databases'),
            ('Oracle Database', 'Relational Databases'),
            ('Microsoft SQL Server', 'Relational Databases'),
            ('SQLite', 'Relational Databases'),
            ('MongoDB', 'NoSQL Databases'),
            ('Cassandra', 'NoSQL Databases'),
            ('Redis', 'NoSQL Databases'),
            ('Couchbase', 'NoSQL Databases'),
            ('Amazon DynamoDB', 'NoSQL Databases'),
            ('Entity-Relationship Diagrams (ERDs)', 'Database Design'),
            ('Normalization', 'Database Design'),
            ('Indexing Strategies', 'Database Design'),
            ('Data Modeling Tools', 'Database Design'),
            ('Firewall Configuration', 'Network Security'),
            ('Intrusion Detection and Prevention Systems (IDPS)', 'Network Security'),
            ('VPN Implementation', 'Network Security'),
            ('Network Access Control (NAC)', 'Network Security'),
            ('Security Information and Event Management (SIEM)', 'Network Security'),
            ('Security Policies and Procedures', 'Network Security'),
            ('LAN/WAN Design', 'Network Architecture'),
            ('Routing Protocols (e.g., OSPF, BGP)', 'Network Architecture'),
            ('VLAN Configuration', 'Network Architecture'),
            ('MPLS Networking', 'Network Architecture'),
            ('Software-Defined Networking (SDN)', 'Network Architecture'),
            ('Cloud Networking Architecture', 'Network Architecture'),
            ('Network Configuration', 'Network Administration'),
            ('Network Monitoring', 'Network Administration'),
            ('Performance Optimization', 'Network Administration'),
            ('Troubleshooting', 'Network Administration'),
            ('Network Automation', 'Network Administration'),
            ('Disaster Recovery Planning', 'Network Administration'),
            ('Footprinting', 'Ethical Hacking'),
            ('Scanning', 'Ethical Hacking'),
            ('Enumeration', 'Ethical Hacking'),
            ('System Hacking', 'Ethical Hacking'),
            ('Trojans and Backdoors', 'Ethical Hacking'),
            ('Social Engineering', 'Ethical Hacking'),
            ('Wireless Network Hacking', 'Ethical Hacking'),
            ('Vulnerability Assessment', 'Security Auditing'),
            ('Penetration Testing', 'Security Auditing'),
            ('Compliance Auditing', 'Security Auditing'),
            ('Risk Assessment', 'Security Auditing'),
            ('Security Policy Review', 'Security Auditing'),
            ('Symmetric Cryptography', 'Cryptography'),
            ('Asymmetric Cryptography', 'Cryptography'),
            ('Hash Functions', 'Cryptography'),
            ('Digital Signatures', 'Cryptography'),
            ('Public Key Infrastructure (PKI)', 'Cryptography'),
            ('Cryptanalysis', 'Cryptography'),
            ('Incident Detection', 'Incident Response'),
            ('Incident Triage', 'Incident Response'),
            ('Containment and Mitigation', 'Incident Response'),
            ('Forensic Analysis', 'Incident Response'),
            ('Reporting and Documentation', 'Incident Response')
    ) AS sub(name, parent_name) ON ParentIDs.name = sub.parent_name;