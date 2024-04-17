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