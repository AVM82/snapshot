create table users (
    id              bigint not null auto_increment primary key,
    username        varchar(50) not null unique,
    password        varchar(100) not null,
    email           varchar(100) not null unique,
    first_name      varchar(50) not null,
    last_name       varchar(50) not null,
    avatar_img_url  varchar(100),
    description     varchar(500)
    );

create table skills (
    id              bigint not null auto_increment primary key,
    name            varchar(50) not null unique,
    parent_id       bigint null references skills(id)
    );

insert into skills (name, parent_id)
values
    ('Programming', null),
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