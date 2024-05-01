create table users
(
    id             bigint       not null auto_increment primary key,
    password       varchar(100),
    email          varchar(100) not null unique,
    first_name     varchar(50),
    last_name      varchar(50),
    avatar_img_url varchar(100),
    description    varchar(500),
    role           varchar(50)
);

create table refresh_token
(
    id          bigint       not null auto_increment primary key,
    token       varchar(255) not null,
    expiry_date timestamp    not null,
    user_id     bigint references users (id)
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

insert into roles (id, name)
values (1, 'SEARCHER'),
       (2, 'INTERVIEWER'),
       (3, 'HR'),
       (4, 'ADMIN');

create table user_role_skill
(
    id       bigint primary key auto_increment,
    user_id  bigint references users (id),
    role_id  bigint references roles (id),
    skill_id bigint references skills (id)
);

create table interviews
(
    id                bigint primary key auto_increment,
    title             varchar(100),
    status            varchar(255) not null,
    interviewer_id    bigint references users (id),
    searcher_id       bigint references users (id),
    planned_date_time timestamp,
    start_date_time   timestamp,
    end_date_time     timestamp,
    feedback          varchar(500)
);

create table interview_questions
(
    id           bigint primary key auto_increment,
    interview_id bigint references interviews (id),
    skill_id     bigint references skills (id),
    question     varchar(500),
    grade        int,
    create_at    timestamp
);

create table interviewer_questions
(
    id             bigint primary key auto_increment,
    skill_id       bigint references skills (id),
    interviewer_id bigint references users (id),
    question       varchar(500)
);

-- insert skills level 1
INSERT INTO skills (name, parent_id)
VALUES ('Programming', NULL),
       ('Database Administration', NULL),
       ('Network', NULL),
       ('Cybersecurity', NULL);

-- get id for level 1
WITH ParentIDs AS (SELECT id, name
                   FROM skills
                   WHERE parent_id IS NULL)

-- insert skills level 2
INSERT
INTO skills (name, parent_id)
SELECT sub.name,
       ParentIDs.id
FROM ParentIDs
         JOIN (VALUES ('Web Development', 'Programming'),
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
                      ('Incident Response', 'Cybersecurity')) AS sub(name, parent_name)
              ON ParentIDs.name = sub.parent_name;

-- get id for level 2
WITH ParentIDs AS (SELECT id, name
                   FROM skills
                   WHERE parent_id IN (SELECT id FROM skills WHERE parent_id IS NULL))

-- insert skills level 3
INSERT
INTO skills (name, parent_id)
SELECT sub.name,
       ParentIDs.id
FROM ParentIDs
         JOIN (VALUES ('Frontend Development', 'Web Development'),
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
                      ('Reporting and Documentation', 'Incident Response')) AS sub(name, parent_name)
              ON ParentIDs.name = sub.parent_name;

create table temp_users
(
    id         bigint       not null auto_increment primary key,
    email      varchar(100) not null unique,
    password   varchar(100),
    first_name varchar(50),
    last_name  varchar(50),
    expire_at  timestamp
);

----------for test, delete later---------
insert into users (password, email, first_name, last_name, avatar_img_url, description)
values ('$2a$10$4ovMxWrEX9luzTrRt64HCOdmytp1Fp53/9RRVnGW2aEwDojJf34J2', 'username', 'name', 'surname', 'i', 'd'),
       ('$2a$10$KIP8Yy2TYOc8jI.RGdkyqenwy807Uts8d1itK2Bah/Gp9qXBOiCSW', 'username2', 'name2', 'surname2', 'i2', 'd2');

insert into user_role_skill (user_id, role_id, skill_id)
values (1, 2, 5),
       (1, 2, 8),
       (1, 2, 9),
       (1, 2, 10),
       (1, 2, 12),
       (2, 1, 20),
       (2, 1, 29),
       (2, 1, 43),
       (2, 1, 47);

INSERT INTO interviews (title, status, interviewer_id, searcher_id, planned_date_time, start_date_time, end_date_time,
                        feedback)
VALUES ('Test', 'COMPLETED', 1, 2, '2024-04-24 09:00:00', '2024-04-24 09:00:00', '2024-04-24 10:00:00',
        'Needs improvement');

INSERT INTO interview_questions (interview_id, skill_id, question, grade, create_at)
VALUES (1, 56, 'How to configure a firewall for network security?', 100, '2024-04-30 09:00:00.000001'),
       (1, 57, 'What are IDPS, and how do they collaborate with firewalls?', 50, '2024-04-30 09:01:00.000001'),
       (1, 58, 'How to implement a VPN, and what technologies ensure data confidentiality?', 0, '2024-04-30 09:02:00.000001');

INSERT INTO interviews (title, status, interviewer_id, searcher_id, planned_date_time, start_date_time, end_date_time,
                        feedback)
VALUES ('Second', 'COMPLETED', 1, 2, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement');

INSERT INTO interview_questions (interview_id, skill_id, question, grade, create_at)
VALUES (1, 29, 'What is the difference between == and .equals() when comparing objects in Java?', 100, '2024-04-30 09:03:00.000001'),
       (1, 29, 'Explain the concept of inheritance in Java and provide an example.', 75, '2024-04-30 09:04:00.000001'),
       (1, 47, 'What is MongoDB, and how does it differ from traditional relational databases?', 50, '2024-04-30 09:05:00.000001');

INSERT INTO interviewer_questions (interviewer_id, skill_id, question)
VALUES (1, 29, 'What is the difference between == and .equals() when comparing objects in Java?'),
       (1, 29, 'Explain the concept of inheritance in Java and provide an example.'),
       (1, 29,
        'What are the different access modifiers in Java, and how do they affect the visibility of variables and methods?'),
       (1, 29, 'Describe the purpose and usage of the static keyword in Java.'),
       (1, 29, 'How does exception handling work in Java? Discuss the try-catch-finally blocks.'),
       (1, 47, 'What is MongoDB, and how does it differ from traditional relational databases?'),
       (1, 47, 'Explain the concept of document-oriented databases and how it applies to MongoDB.'),
       (1, 47, 'What is a MongoDB replica set, and what are its benefits in a distributed database environment?'),
       (1, 47, 'Describe the aggregation framework in MongoDB and provide an example of its usage.'),
       (1, 47, 'What are the advantages of using sharding in MongoDB, and how does it help with scalability?');
---------for test, delete later---------