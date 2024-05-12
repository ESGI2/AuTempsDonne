create database if not exists atd_api;
use atd_api;

create table activity
(
    id            int auto_increment
        primary key,
    activity_name varchar(255) not null,
    description   varchar(255) null,
    people_needed int          not null,
    color         varchar(255) not null
);

create table delivery_point
(
    id          int auto_increment
        primary key,
    type        varchar(255)   not null,
    name        varchar(255)   null,
    country     varchar(255)   null,
    city        varchar(255)   null,
    postal_code varchar(255)   null,
    road        varchar(255)   null,
    lat         decimal(10, 8) null,
    lon         decimal(11, 8) null
);

create table event
(
    id          int auto_increment
        primary key,
    title       varchar(50) not null,
    description varchar(50) not null,
    start       datetime    not null,
    end         datetime    not null,
    activity_id int         null,
    allDay      tinyint(1)  not null,
    maraude     tinyint(1)  not null,
    delivery    tinyint(1)  not null,
    constraint event_ibfk_1
        foreign key (activity_id) references activity (id)
);

create index activity_id
    on event (activity_id);

create table maraude_point
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    country     varchar(255) not null,
    city        varchar(255) not null,
    postal_code varchar(255) not null,
    road        varchar(255) not null,
    lat         varchar(30)  not null,
    lon         varchar(30)  not null
);

create table product
(
    id       int auto_increment
        primary key,
    name     varchar(255) not null,
    type     varchar(255)  null,
    donation tinyint(1)   null,
    ean      varchar(13) null
);

create table training
(
    id          int auto_increment
        primary key,
    name        varchar(255) null,
    description varchar(255) null,
    duration    int          null
);

create table trainings
(
    id          int auto_increment
        primary key,
    name        varchar(255) null,
    description varchar(255) null,
    duration    int          null
);

create table truck
(
    id                     int auto_increment
        primary key,
    name                   varchar(255) not null,
    localisation           varchar(255) not null,
    plaque_immatriculation varchar(255) not null
);

create table delivery
(
    id                  int auto_increment
        primary key,
    departure           datetime not null,
    id_truck            int      not null,
    theoretical_arrival datetime not null,
    status              int      not null,
    constraint delivery_ibfk_1
        foreign key (id_truck) references truck (id)
);

create index id_truck
    on delivery (id_truck);

create table delivery_listing
(
    id_delivery int        null,
    id_point    int        null,
    isDeparture tinyint(1) not null,
    isArrival   tinyint(1) not null,
    constraint delivery_listing_ibfk_1
        foreign key (id_delivery) references delivery (id),
    constraint delivery_listing_ibfk_2
        foreign key (id_point) references delivery_point (id)
);

create index id_delivery
    on delivery_listing (id_delivery);

create index id_point
    on delivery_listing (id_point);

create table delivery_product
(
    id_product  int not null,
    id_delivery int not null,
    quantity    int not null,
    primary key (id_product, id_delivery),
    constraint delivery_product_ibfk_1
        foreign key (id_product) references product (id),
    constraint delivery_product_ibfk_2
        foreign key (id_delivery) references delivery (id)
);

create index id_delivery
    on delivery_product (id_delivery);

create table maraude
(
    id       int auto_increment
        primary key,
    id_event int not null,
    id_truck int not null,
    constraint maraude_ibfk_10
        foreign key (id_truck) references truck (id),
    constraint maraude_ibfk_9
        foreign key (id_event) references event (id)
);

create index id_event
    on maraude (id_event);

create index id_truck
    on maraude (id_truck);

create table maraude_content
(
    id_product int not null,
    id_maraude int not null,
    quantity   int not null,
    primary key (id_product, id_maraude),
    constraint maraude_content_ibfk_1
        foreign key (id_product) references product (id)
            on delete cascade,
    constraint maraude_content_ibfk_2
        foreign key (id_maraude) references maraude (id)
            on delete cascade
);

create table maraude_passing
(
    id_maraude int not null,
    id_point   int not null,
    step       int not null,
    primary key (id_point, id_maraude, step),
    constraint maraude_passing_maraude_id_fk
        foreign key (id_maraude) references maraude (id)
            on delete cascade,
    constraint maraude_passing_maraude_point_id_fk
        foreign key (id_point) references maraude_point (id)
            on delete cascade
);

create table user
(
    id                int auto_increment
        primary key,
    first_name        varchar(255) not null,
    last_name         varchar(255) not null,
    email             varchar(255) not null,
    password          varchar(255) not null,
    role              varchar(255) not null,
    registration_date varchar(255) not null,
    validation_status varchar(255) not null,
    nbr_child         int          not null,
    newsletter        tinyint(1)   not null,
    salt              varchar(255) not null,
    phone             varchar(255) null,
    country           varchar(255) null,
    city              varchar(255) null,
    postal_code       varchar(255) null,
    road              varchar(255) null,
    road_number       int          null,
    date_of_birth     datetime     null,
    nationality       varchar(255) null,
    account_status    varchar(255) not null,
    family_situation  varchar(255) null,
    tag boolean default false not null
);

create table child
(
    id            int auto_increment
        primary key,
    first_name    varchar(255) not null,
    last_name     varchar(255) not null,
    date_of_birth datetime     not null,
    id_user       int          not null,
    constraint child_ibfk_1
        foreign key (id_user) references user (id)
);

create index id_user
    on child (id_user);

create table delivery_drivers
(
    id          int auto_increment
        primary key,
    id_user     int not null,
    id_delivery int not null,
    constraint delivery_drivers_ibfk_491
        foreign key (id_user) references user (id),
    constraint delivery_drivers_ibfk_492
        foreign key (id_delivery) references delivery (id)
);

create index id_delivery
    on delivery_drivers (id_delivery);

create index id_user
    on delivery_drivers (id_user);

create table event_listing
(
    id_user  int not null,
    id_event int not null,
    primary key (id_user, id_event),
    constraint event_listing_ibfk_1
        foreign key (id_user) references user (id)
            on delete cascade,
    constraint event_listing_ibfk_2
        foreign key (id_event) references event (id)
            on delete cascade
);

create table maraude_listing
(
    id_user    int not null,
    id_maraude int not null,
    primary key (id_user, id_maraude),
    constraint maraude_listing_ibfk_1
        foreign key (id_user) references user (id),
    constraint maraude_listing_ibfk_2
        foreign key (id_maraude) references maraude (id)
);

create index id_maraude
    on maraude_listing (id_maraude);

create table ticket
(
    id            int auto_increment
        primary key,
    title         varchar(255) not null,
    message       varchar(255) not null,
    date_creation varchar(255) not null,
    id_user       int          not null,
    id_answer     int          null,
    status        int          null,
    constraint ticket_ibfk_1
        foreign key (id_user) references user (id),
    constraint ticket_id_answer_foreign_idx
        foreign key (id_answer) references user (id)
);

create index id_user
    on ticket (id_user);

create table training_listing
(
    id_user     int not null,
    id_training int not null,
    primary key (id_user, id_training),
    constraint training_listing_ibfk_1
        foreign key (id_user) references user (id),
    constraint training_listing_ibfk_2
        foreign key (id_training) references training (id)
);

create index id_training
    on training_listing (id_training);

create table warehouse
(
    id                int auto_increment
        primary key,
    name              varchar(255) not null,
    country           varchar(255) not null,
    city              varchar(255) not null,
    postal_code       varchar(255) not null,
    road              varchar(255) not null,
    id_delivery_point int          null,
    constraint warehouse_ibfk_1
        foreign key (id_delivery_point) references delivery_point (id)
);

create table stock
(
    id_product   int not null,
    id_warehouse int not null,
    quantity     int not null,
    dlc         datetime not null,
    date       datetime not null,
    primary key (id_product, id_warehouse),
    constraint stock_ibfk_1
        foreign key (id_product) references product (id)
            on delete cascade,
    constraint stock_ibfk_2
        foreign key (id_warehouse) references warehouse (id)
            on delete cascade
);

create index id_warehouse
    on stock (id_warehouse);

create index id_delivery_point
    on warehouse (id_delivery_point);
