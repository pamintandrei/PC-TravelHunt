CREATE TABLE IF NOT EXISTS user
(
    id         int primary key,
    username   varchar(255) not null,
    password   varchar(255) not null,
    first_name varchar(255) not null,
    last_name  varchar(255) not null
)