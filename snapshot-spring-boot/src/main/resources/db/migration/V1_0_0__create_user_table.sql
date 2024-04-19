create table users
(
    id             bigint       not null auto_increment primary key,
    username       varchar(50)  not null unique,
    password       varchar(100) not null,
    email          varchar(100) not null unique,
    first_name     varchar(50)  not null,
    last_name      varchar(50)  not null,
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


insert into skills (name, parent_id)
values ('Programming', null),
       ('Web Development', 1),
       ('Mobile Development', 1),
       ('Game Development', 1),
       ('Data Science', 1),
       ('Machine Learning', 5),
       ('Deep Learning', 5),
       ('Computer Vision', 5),
       ('Natural Language Processing', 5),
       ('Big Data', 5),
       ('Data Engineering', 5),
       ('Data Analysis', 5),
       ('Data Visualization', 5),
       ('Data Mining', 5);

insert into users (username, password, email, first_name, last_name, role, avatar_img_url, description)
values ('user', '$2a$10$4ovMxWrEX9luzTrRt64HCOdmytp1Fp53/9RRVnGW2aEwDojJf34J2', 'username', 'name', 'surname',
        'SEARCHER', null, null);