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
       ('$2a$10$KIP8Yy2TYOc8jI.RGdkyqenwy807Uts8d1itK2Bah/Gp9qXBOiCSW', 'username2', 'name2', 'surname2', 'i2', 'd2'),
       ('$2a$12$Ba37RckHvfa/Vy.tCVt2wuUC57XiJU77SL9Q8ow5b2txA7KY.QxSm', 'username3', 'name3', 'surname3', 'i3', 'd3');

insert into user_role_skill (user_id, role_id, skill_id)
values (1, 2, 5),
       (1, 2, 8),
       (1, 2, 9),
       (1, 2, 10),
       (1, 2, 12),
       (2, 1, 20),
       (2, 1, 29),
       (2, 1, 43),
       (2, 1, 47),
       (3, 1, 22),
       (3, 1, 29),
       (3, 1, 30),
       (3, 1, 32),
       (3, 1, 33),
       (3, 1, 37),
       (3, 1, 43),
       (3, 1, 47),
       (3, 1, 53),
       (3, 1, 54),
       (3, 1, 76),
       (3, 1, 82),
       (3, 1, 88),
       (3, 1, 94),
       (3, 1, 96);

INSERT INTO interviews (title, status, interviewer_id, searcher_id, planned_date_time, start_date_time, end_date_time,
                        feedback)
VALUES ('Test', 'COMPLETED', 1, 2, '2024-04-24 09:00:00', '2024-04-24 09:00:00', '2024-04-24 10:00:00',
        'Needs improvement');

INSERT INTO interview_questions (interview_id, skill_id, question, grade, create_at)
VALUES (1, 56, 'How to configure a firewall for network security?', 100, '2024-04-30 09:00:00.000001'),
       (1, 57, 'What are IDPS, and how do they collaborate with firewalls?', 50, '2024-04-30 09:01:00.000001'),
       (1, 58, 'How to implement a VPN, and what technologies ensure data confidentiality?', 0,
        '2024-04-30 09:02:00.000001');

INSERT INTO interviews (title, status, interviewer_id, searcher_id, planned_date_time, start_date_time, end_date_time,
                        feedback)
VALUES ('Second', 'COMPLETED', 1, 2, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement'),
       ('UserId3Interview1', 'COMPLETED', 1, 3, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement'),
       ('UserId3Interview2', 'COMPLETED', 1, 3, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement'),
       ('UserId3Interview3', 'COMPLETED', 1, 3, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement'),
       ('UserId3Interview4', 'COMPLETED', 1, 3, '2024-04-26 18:30:00', '2024-04-26 18:27:34', '2024-04-26 20:03:12',
        'Needs improvement');
-- test3


INSERT INTO interview_questions (interview_id, skill_id, question, grade, create_at)
VALUES (1, 29, 'What is the difference between == and .equals() when comparing objects in Java?', 100,
        '2024-04-30 09:03:00.000001'),
       (1, 29, 'Explain the concept of inheritance in Java and provide an example.', 75, '2024-04-30 09:04:00.000001'),
       (1, 47, 'What is MongoDB, and how does it differ from traditional relational databases?', 50,
        '2024-04-30 09:05:00.000001'),
       (3, 22, 'What are the main principles of UX design?', 70, '2024-04-30 09:05:00.000001'),
       (3, 22, 'What is wireframing and what is its significance in UX design?', 78, '2024-04-30 09:05:00.000001'),
       (3, 22, 'What tools do you use for prototyping in UX design?', 80, '2024-04-30 09:05:00.000001'),
       (3, 29, 'What are JDK, JRE, and JVM in Java?', 5, '2024-04-30 09:05:00.000001'),
       (3, 29, 'What are the main principles of OOP in Java?', 15, '2024-04-30 09:05:00.000001'),
       (3, 29, 'What are the differences between abstraction and interface in Java?', 20, '2024-04-30 09:05:00.000001'),
       (3, 30, 'What are the advantages of Python compared to other programming languages?', 80,
        '2024-04-30 09:05:00.000001'),
       (3, 30, 'How can you read and write data to a file in Python?', 85, '2024-04-30 09:05:00.000001'),
       (3, 30, 'How can you use conditional statements and loops in Python?', 85, '2024-04-30 09:05:00.000001'),
       (3, 32, 'What are closures in JavaScript and what is their purpose?', 75, '2024-04-30 09:05:00.000001'),
       (3, 32, 'How can you perform asynchronous code in JavaScript?', 79, '2024-04-30 09:05:00.000001'),
       (3, 32, 'What is object-oriented programming (OOP) in JavaScript, and how can you use classes?', 80,
        '2024-04-30 09:05:00.000001'),
       (3, 33, 'What are the advantages and disadvantages of Ruby compared to other programming languages?', 65,
        '2024-04-30 09:05:00.000001'),
       (3, 33, 'What are symbols in Ruby and how are they different from strings?', 75, '2024-04-30 09:05:00.000001'),
       (3, 33, 'What are blocks in Ruby and how are they used?', 80, '2024-04-30 09:05:00.000001'),
       (3, 37, 'What is TypeScript and what advantages does it offer over JavaScript?', 60,
        '2024-04-30 09:05:00.000001'),
       (3, 37, 'How can you use interfaces in TypeScript?', 66, '2024-04-30 09:05:00.000001'),
       (3, 37, 'How can you declare variables of different data types in TypeScript?', 70,
        '2024-04-30 09:05:00.000001'),
       (3, 43, 'What is PostgreSQL and what are its main features?', 10, '2024-04-30 09:05:00.000001'),
       (3, 43, 'How can you create a new database in PostgreSQL?', 15, '2024-04-30 09:05:00.000001'),
       (3, 43, 'What are the different types of indexes in PostgreSQL?', 20, '2024-04-30 09:05:00.000001'),
       (3, 47, 'What is MongoDB and what are its main features?', 90, '2024-04-30 09:05:00.000001'),
       (3, 47, 'How can you perform CRUD operations in MongoDB?', 95, '2024-04-30 09:05:00.000001'),
       (3, 47, 'What is the difference between MongoDB and relational databases?', 98, '2024-04-30 09:05:00.000001'),
       (3, 53, 'What is normalization and why is it important in databases?', 94, '2024-04-30 09:05:00.000001'),
       (3, 53, 'What are the different normal forms in database normalization?', 96, '2024-04-30 09:05:00.000001'),
       (3, 53, 'How can you identify when a database is not normalized?', 100, '2024-04-30 09:05:00.000001'),
       (3, 54, 'What are indexing strategies and why are they important for database performance?', 35,
        '2024-04-30 09:05:00.000001'),
       (3, 54, 'What are the different types of indexes available in databases?', 40, '2024-04-30 09:05:00.000001'),
       (3, 54, 'How does indexing affect query performance?', 45, '2024-04-30 09:05:00.000001'),
       (3, 76, 'What is enumeration and how is it used in programming?', 10, '2024-04-30 09:05:00.000001'),
       (3, 76, 'How can you define and use enumerations in different programming languages?', 12,
        '2024-04-30 09:05:00.000001'),
       (3, 76, 'What are the advantages of using enumerations in code?', 15, '2024-04-30 09:05:00.000001'),
       (3, 82, 'What is penetration testing and why is it important for cybersecurity?', 15,
        '2024-04-30 09:05:00.000001'),
       (3, 82, 'What are the different types of penetration testing?', 20, '2024-04-30 09:05:00.000001'),
       (3, 82, 'How is penetration testing conducted in practice?', 25, '2024-04-30 09:05:00.000001'),
       (3, 88, 'What are hash functions and how are they used in cryptography?', 50, '2024-04-30 09:05:00.000001'),
       (3, 88, 'What are the properties of a good hash function?', 55, '2024-04-30 09:05:00.000001'),
       (3, 88, 'How are hash functions used to secure passwords?', 60, '2024-04-30 09:05:00.000001'),
       (3, 94, 'What is containment and mitigation in cybersecurity?', 15, '2024-04-30 09:05:00.000001'),
       (3, 94, 'How does containment differ from mitigation in incident response?', 20, '2024-04-30 09:05:00.000001'),
       (3, 94, 'What are some common containment and mitigation strategies?', 25, '2024-04-30 09:05:00.000001'),
       (3, 96, 'What is the importance of reporting in cybersecurity?', 40, '2024-04-30 09:05:00.000001'),
       (3, 96, 'What information should be included in a cybersecurity report?', 45, '2024-04-30 09:05:00.000001'),
       (3, 96, 'How can documentation help in cybersecurity incident response?', 50, '2024-04-30 09:05:00.000001'),
       (4, 22, 'What are the key principles of UX design?', 70, '2024-04-30 09:05:00.000001'),
       (4, 22, 'What is the significance of wireframing in UX design?', 78, '2024-04-30 09:05:00.000001'),
       (4, 22, 'Which tools do you use for prototyping in UX design?', 80, '2024-04-30 09:05:00.000001'),
       (4, 29, 'Explain JDK, JRE, and JVM in Java.', 5, '2024-04-30 09:05:00.000001'),
       (4, 29, 'What are the main principles of Object-Oriented Programming (OOP) in Java?', 15,
        '2024-04-30 09:05:00.000001'),
       (4, 29, 'What are the differences between abstraction and interface in Java?', 20, '2024-04-30 09:05:00.000001'),
       (4, 30, 'What advantages does Python offer over other programming languages?', 80, '2024-04-30 09:05:00.000001'),
       (4, 30, 'How can you perform file read and write operations in Python?', 85, '2024-04-30 09:05:00.000001'),
       (4, 30, 'How do you use conditional statements and loops in Python?', 85, '2024-04-30 09:05:00.000001'),
       (4, 32, 'Explain closures in JavaScript and their purpose.', 75, '2024-04-30 09:05:00.000001'),
       (4, 32, 'How can you handle asynchronous code in JavaScript?', 79, '2024-04-30 09:05:00.000001'),
       (4, 32, 'What is Object-Oriented Programming (OOP) in JavaScript, and how do you use classes?', 80,
        '2024-04-30 09:05:00.000001'),
       (4, 33, 'What are the advantages and disadvantages of Ruby compared to other programming languages?', 65,
        '2024-04-30 09:05:00.000001'),
       (4, 33, 'What are symbols in Ruby and how are they different from strings?', 75, '2024-04-30 09:05:00.000001'),
       (4, 33, 'What are blocks in Ruby and how are they used?', 80, '2024-04-30 09:05:00.000001'),
       (4, 37, 'What is TypeScript and what advantages does it offer over JavaScript?', 60,
        '2024-04-30 09:05:00.000001'),
       (4, 37, 'How can you use interfaces in TypeScript?', 66, '2024-04-30 09:05:00.000001'),
       (4, 37, 'How can you declare variables of different data types in TypeScript?', 70,
        '2024-04-30 09:05:00.000001'),
       (4, 43, 'What is PostgreSQL and what are its main features?', 10, '2024-04-30 09:05:00.000001'),
       (4, 43, 'How do you create a new database in PostgreSQL?', 15, '2024-04-30 09:05:00.000001'),
       (4, 43, 'What are the different types of indexes in PostgreSQL?', 20, '2024-04-30 09:05:00.000001'),
       (4, 47, 'What is MongoDB and what are its main features?', 90, '2024-04-30 09:05:00.000001'),
       (4, 47, 'How can you perform CRUD operations in MongoDB?', 95, '2024-04-30 09:05:00.000001'),
       (4, 47, 'What is the difference between MongoDB and relational databases?', 98, '2024-04-30 09:05:00.000001'),
       (4, 53, 'What is normalization and why is it important in databases?', 94, '2024-04-30 09:05:00.000001'),
       (4, 53, 'What are the different normal forms in database normalization?', 96, '2024-04-30 09:05:00.000001'),
       (4, 53, 'How can you identify when a database is not normalized?', 100, '2024-04-30 09:05:00.000001'),
       (4, 54, 'What are indexing strategies and why are they important for database performance?', 35,
        '2024-04-30 09:05:00.000001'),
       (4, 54, 'What are the different types of indexes available in databases?', 40, '2024-04-30 09:05:00.000001'),
       (4, 54, 'How does indexing affect query performance?', 45, '2024-04-30 09:05:00.000001'),
       (4, 76, 'What is enumeration and how is it used in programming?', 10, '2024-04-30 09:05:00.000001'),
       (4, 76, 'How can you define and use enumerations in different programming languages?', 12,
        '2024-04-30 09:05:00.000001'),
       (4, 76, 'What are the advantages of using enumerations in code?', 15, '2024-04-30 09:05:00.000001'),
       (4, 82, 'What is penetration testing and why is it important for cybersecurity?', 15,
        '2024-04-30 09:05:00.000001'),
       (4, 82, 'What are the different types of penetration testing?', 20, '2024-04-30 09:05:00.000001'),
       (4, 82, 'How is penetration testing conducted in practice?', 25, '2024-04-30 09:05:00.000001'),
       (4, 88, 'What are hash functions and how are they used in cryptography?', 50, '2024-04-30 09:05:00.000001'),
       (4, 88, 'What are the properties of a good hash function?', 55, '2024-04-30 09:05:00.000001'),
       (4, 88, 'How are hash functions used to secure passwords?', 60, '2024-04-30 09:05:00.000001'),
       (4, 94, 'What is containment and mitigation in cybersecurity?', 15, '2024-04-30 09:05:00.000001'),
       (4, 94, 'How does containment differ from mitigation in incident response?', 20, '2024-04-30 09:05:00.000001'),
       (4, 94, 'What are some common containment and mitigation strategies?', 25, '2024-04-30 09:05:00.000001'),
       (4, 96, 'What is the importance of reporting in cybersecurity?', 40, '2024-04-30 09:05:00.000001'),
       (4, 96, 'What information should be included in a cybersecurity report?', 45, '2024-04-30 09:05:00.000001'),
       (4, 96, 'How can documentation help in cybersecurity incident response?', 50, '2024-04-30 09:05:00.000001'),
       (5, 22, 'What are the main principles of UX design?', 10, '2024-04-30 09:05:00.000001'),
       (5, 22, 'What is wireframing and what is its significance in UX design?', 14, '2024-04-30 09:05:00.000001'),
       (5, 22, 'What tools do you use for prototyping in UX design?', 16, '2024-04-30 09:05:00.000001'),
       (5, 29, 'What are JDK, JRE, and JVM in Java?', 38, '2024-04-30 09:05:00.000001'),
       (5, 29, 'What are the main principles of OOP in Java?', 40, '2024-04-30 09:05:00.000001'),
       (5, 29, 'What are the differences between abstraction and interface in Java?', 42, '2024-04-30 09:05:00.000001'),
       (5, 30, 'What are the advantages of Python compared to other programming languages?', 90,
        '2024-04-30 09:05:00.000001'),
       (5, 30, 'How can you read and write data to a file in Python?', 94, '2024-04-30 09:05:00.000001'),
       (5, 30, 'How can you use conditional statements and loops in Python?', 96, '2024-04-30 09:05:00.000001'),
       (5, 32, 'What are closures in JavaScript and what is their purpose?', 42, '2024-04-30 09:05:00.000001'),
       (5, 32, 'How can you perform asynchronous code in JavaScript?', 44, '2024-04-30 09:05:00.000001'),
       (5, 32, 'What is object-oriented programming (OOP) in JavaScript, and how can you use classes?', 46,
        '2024-04-30 09:05:00.000001'),
       (5, 33, 'What are the advantages and disadvantages of Ruby compared to other programming languages?', 10,
        '2024-04-30 09:05:00.000001'),
       (5, 33, 'What are symbols in Ruby and how are they different from strings?', 15, '2024-04-30 09:05:00.000001'),
       (5, 33, 'What are blocks in Ruby and how are they used?', 20, '2024-04-30 09:05:00.000001'),
       (5, 37, 'What is TypeScript and what advantages does it offer over JavaScript?', 8,
        '2024-04-30 09:05:00.000001'),
       (5, 37, 'How can you use interfaces in TypeScript?', 12, '2024-04-30 09:05:00.000001'),
       (5, 37, 'How can you declare variables of different data types in TypeScript?', 16,
        '2024-04-30 09:05:00.000001'),
       (5, 43, 'What is PostgreSQL and what are its main features?', 70, '2024-04-30 09:05:00.000001'),
       (5, 43, 'How can you create a new database in PostgreSQL?', 75, '2024-04-30 09:05:00.000001'),
       (5, 43, 'What are the different types of indexes in PostgreSQL?', 80, '2024-04-30 09:05:00.000001'),
       (5, 47, 'What is MongoDB and what are its main features?', 82, '2024-04-30 09:05:00.000001'),
       (5, 47, 'How can you perform CRUD operations in MongoDB?', 85, '2024-04-30 09:05:00.000001'),
       (5, 47, 'What is the difference between MongoDB and relational databases?', 88, '2024-04-30 09:05:00.000001'),
       (5, 53, 'What is normalization and why is it important in databases?', 80, '2024-04-30 09:05:00.000001'),
       (5, 53, 'What are the different normal forms in database normalization?', 85, '2024-04-30 09:05:00.000001'),
       (5, 53, 'How can you identify when a database is not normalized?', 86, '2024-04-30 09:05:00.000001'),
       (5, 54, 'What are indexing strategies and why are they important for database performance?', 20,
        '2024-04-30 09:05:00.000001'),
       (5, 54, 'What are the different types of indexes available in databases?', 21, '2024-04-30 09:05:00.000001'),
       (5, 54, 'How does indexing affect query performance?', 22, '2024-04-30 09:05:00.000001'),
       (5, 76, 'What is enumeration and how is it used in programming?', 5, '2024-04-30 09:05:00.000001'),
       (5, 76, 'How can you define and use enumerations in different programming languages?', 8,
        '2024-04-30 09:05:00.000001'),
       (5, 76, 'What are the advantages of using enumerations in code?', 10, '2024-04-30 09:05:00.000001'),
       (5, 82, 'What is penetration testing and why is it important for cybersecurity?', 25,
        '2024-04-30 09:05:00.000001'),
       (5, 82, 'What are the different types of penetration testing?', 27, '2024-04-30 09:05:00.000001'),
       (5, 82, 'How is penetration testing conducted in practice?', 29, '2024-04-30 09:05:00.000001'),
       (5, 88, 'What are hash functions and how are they used in cryptography?', 55, '2024-04-30 09:05:00.000001'),
       (5, 88, 'What are the properties of a good hash function?', 58, '2024-04-30 09:05:00.000001'),
       (5, 88, 'How are hash functions used to secure passwords?', 61, '2024-04-30 09:05:00.000001'),
       (5, 94, 'What is containment and mitigation in cybersecurity?', 25, '2024-04-30 09:05:00.000001'),
       (5, 94, 'How does containment differ from mitigation in incident response?', 28, '2024-04-30 09:05:00.000001'),
       (5, 94, 'What are some common containment and mitigation strategies?', 30, '2024-04-30 09:05:00.000001'),
       (5, 96, 'What is the importance of reporting in cybersecurity?', 25, '2024-04-30 09:05:00.000001'),
       (5, 96, 'What information should be included in a cybersecurity report?', 27, '2024-04-30 09:05:00.000001'),
       (5, 96, 'How can documentation help in cybersecurity incident response?', 29, '2024-04-30 09:05:00.000001'),
       (6, 22, 'What are the key principles of UX design?', 80, '2024-04-30 09:05:00.000001'),
       (6, 22, 'What is the significance of wireframing in UX design?', 85, '2024-04-30 09:05:00.000001'),
       (6, 22, 'Which tools do you use for prototyping in UX design?', 90, '2024-04-30 09:05:00.000001'),
       (6, 29, 'Explain JDK, JRE, and JVM in Java.', 85, '2024-04-30 09:05:00.000001'),
       (6, 29, 'What are the main principles of Object-Oriented Programming (OOP) in Java?', 88,
        '2024-04-30 09:05:00.000001'),
       (6, 29, 'What are the differences between abstraction and interface in Java?', 89, '2024-04-30 09:05:00.000001'),
       (6, 30, 'What advantages does Python offer over other programming languages?', 60, '2024-04-30 09:05:00.000001'),
       (6, 30, 'How can you perform file read and write operations in Python?', 62, '2024-04-30 09:05:00.000001'),
       (6, 30, 'How do you use conditional statements and loops in Python?', 64, '2024-04-30 09:05:00.000001'),
       (6, 32, 'Explain closures in JavaScript and their purpose.', 82, '2024-04-30 09:05:00.000001'),
       (6, 32, 'How can you handle asynchronous code in JavaScript?', 85, '2024-04-30 09:05:00.000001'),
       (6, 32, 'What is Object-Oriented Programming (OOP) in JavaScript, and how do you use classes?', 87,
        '2024-04-30 09:05:00.000001'),
       (6, 33, 'What are the advantages and disadvantages of Ruby compared to other programming languages?', 100,
        '2024-04-30 09:05:00.000001'),
       (6, 33, 'What are symbols in Ruby and how are they different from strings?', 100, '2024-04-30 09:05:00.000001'),
       (6, 33, 'What are blocks in Ruby and how are they used?', 100, '2024-04-30 09:05:00.000001'),
       (6, 37, 'What is TypeScript and what advantages does it offer over JavaScript?', 4,
        '2024-04-30 09:05:00.000001'),
       (6, 37, 'How can you use interfaces in TypeScript?', 5, '2024-04-30 09:05:00.000001'),
       (6, 37, 'How can you declare variables of different data types in TypeScript?', 6,
        '2024-04-30 09:05:00.000001'),
       (6, 43, 'What is PostgreSQL and what are its main features?', 70, '2024-04-30 09:05:00.000001'),
       (6, 43, 'How do you create a new database in PostgreSQL?', 72, '2024-04-30 09:05:00.000001'),
       (6, 43, 'What are the different types of indexes in PostgreSQL?', 74, '2024-04-30 09:05:00.000001'),
       (6, 47, 'What is MongoDB and what are its main features?', 25, '2024-04-30 09:05:00.000001'),
       (6, 47, 'How can you perform CRUD operations in MongoDB?', 27, '2024-04-30 09:05:00.000001'),
       (6, 47, 'What is the difference between MongoDB and relational databases?', 30, '2024-04-30 09:05:00.000001'),
       (6, 53, 'What is normalization and why is it important in databases?', 82, '2024-04-30 09:05:00.000001'),
       (6, 53, 'What are the different normal forms in database normalization?', 84, '2024-04-30 09:05:00.000001'),
       (6, 53, 'How can you identify when a database is not normalized?', 86, '2024-04-30 09:05:00.000001'),
       (6, 54, 'What are indexing strategies and why are they important for database performance?', 5,
        '2024-04-30 09:05:00.000001'),
       (6, 54, 'What are the different types of indexes available in databases?', 7, '2024-04-30 09:05:00.000001'),
       (6, 54, 'How does indexing affect query performance?', 9, '2024-04-30 09:05:00.000001'),
       (6, 76, 'What is enumeration and how is it used in programming?', 20, '2024-04-30 09:05:00.000001'),
       (6, 76, 'How can you define and use enumerations in different programming languages?', 22,
        '2024-04-30 09:05:00.000001'),
       (6, 76, 'What are the advantages of using enumerations in code?', 24, '2024-04-30 09:05:00.000001'),
       (6, 82, 'What is penetration testing and why is it important for cybersecurity?', 42,
        '2024-04-30 09:05:00.000001'),
       (6, 82, 'What are the different types of penetration testing?', 45, '2024-04-30 09:05:00.000001'),
       (6, 82, 'How is penetration testing conducted in practice?', 48, '2024-04-30 09:05:00.000001'),
       (6, 88, 'What are hash functions and how are they used in cryptography?', 80, '2024-04-30 09:05:00.000001'),
       (6, 88, 'What are the properties of a good hash function?', 82, '2024-04-30 09:05:00.000001'),
       (6, 88, 'How are hash functions used to secure passwords?', 84, '2024-04-30 09:05:00.000001'),
       (6, 94, 'What is containment and mitigation in cybersecurity?', 8, '2024-04-30 09:05:00.000001'),
       (6, 94, 'How does containment differ from mitigation in incident response?', 9, '2024-04-30 09:05:00.000001'),
       (6, 94, 'What are some common containment and mitigation strategies?', 10, '2024-04-30 09:05:00.000001'),
       (6, 96, 'What is the importance of reporting in cybersecurity?', 73, '2024-04-30 09:05:00.000001'),
       (6, 96, 'What information should be included in a cybersecurity report?', 75, '2024-04-30 09:05:00.000001'),
       (6, 96, 'How can documentation help in cybersecurity incident response?', 77, '2024-04-30 09:05:00.000001');

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
