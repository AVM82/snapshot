create table users
(
    id             bigint       not null auto_increment primary key,
    username       varchar(50) not null,
    password       varchar(100),
    email          varchar(100) not null unique,
    first_name     varchar(50),
    last_name      varchar(50),
    avatar_img_url varchar(100),
    description    varchar(500),
    role           varchar(50)
);

create table skills
(
    id        bigint      not null auto_increment primary key,
    name      varchar(50) not null unique,
    parent_id bigint null references skills(id)
);

create table roles
(
    id   bigint primary key auto_increment,
    name varchar(50)
);

create table user_role_skill
(
    id      bigint primary key auto_increment,
    user_id bigint references users (id),
    role_id bigint references roles (id),
    skill_id bigint references skills (id)
);

insert into users (username, password, email, first_name, last_name, role, avatar_img_url, description)
values ('user', '$2a$10$4ovMxWrEX9luzTrRt64HCOdmytp1Fp53/9RRVnGW2aEwDojJf34J2', 'username', 'name', 'surname',
        'SEARCHER', null, null);


-- insert skills level 1
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

-- insert skills level 2
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

-- insert skills level 3
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