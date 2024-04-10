CREATE DATABASE if not exists ATD_API;
USE ATD_API;
CREATE TABLE if not exists user(
    id integer NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(50) NOT NULL,
    registration_date date NOT NULL,
    validation_status varchar(50) NOT NULL,
    nbr_child integer NOT NULL,
    newsletter boolean NOT NULL,
    salt varchar(255) NOT NULL,

    phone varchar(50),
    country varchar(50),
    city varchar(50),
    postal_code varchar(50),
    road varchar(50),
    road_number integer,
    date_of_birth date,
    nationality varchar(30),
    account_status varchar(50),
    family_situation varchar(50),

    PRIMARY KEY (id)
);

CREATE TABLE if not exists child(
    id integer NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    date_of_birth date NOT NULL,
    id_user integer NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    PRIMARY KEY (id)
);

CREATE TABLE if not exists training(
    id integer NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    description varchar(50) NOT NULL,
    duration integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists training_listing(
    id_user integer NOT NULL,
    id_training integer NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_training) REFERENCES training(id),
    PRIMARY KEY (id_user, id_training)
);

CREATE TABLE if not exists ticket(
    id integer NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    message varchar(50) NOT NULL,
    date_creation date NOT NULL,
    id_user integer NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    PRIMARY KEY (id)
);

CREATE TABLE if not exists activity(
    id integer NOT NULL AUTO_INCREMENT,
    activity_name varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    people_needed integer NOT NULL,
    color varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists event(
    id integer NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    description varchar(50) NOT NULL,
    start date NOT NULL,
    end date NOT NULL,
    allDay boolean NOT NULL,
    activity_id integer NOT NULL,
    maraude_id integer,
    delivery_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (activity_id) REFERENCES activity(id),
    FOREIGN KEY (maraude_id) REFERENCES maraude(id),
    FOREIGN KEY (delivery_id) REFERENCES delivery(id)
);

CREATE TABLE if not exists event_listing(
    id_user integer NOT NULL,
    id_event integer NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_event) REFERENCES event(id),
    PRIMARY KEY (id_user, id_event)
);


CREATE TABLE if not exists truck(
    id integer NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    localisation varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE truck
ADD COLUMN plaque_immatriculation varchar(20) NOT NULL;

CREATE TABLE if not exists maraude(
    id integer NOT NULL AUTO_INCREMENT,
    id_truck integer NOT NULL,
    id_event integer NOT NULL,
    FOREIGN KEY (id_truck) REFERENCES truck(id),
    FOREIGN KEY (id_event) REFERENCES event(id),
    PRIMARY KEY (id)
);

CREATE TABLE if not exists maraude_listing(
    id_user integer NOT NULL,
    id_maraude integer NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_maraude) REFERENCES maraude(id),
    PRIMARY KEY (id_user, id_maraude)
);

CREATE TABLE if not exists maraude_point(
    id integer NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    postal_code varchar(50) NOT NULL,
    road varchar(50) NOT NULL,
    road_number integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists maraude_passing(
    id_maraude integer NOT NULL,
    id_maraude_point integer NOT NULL,
    FOREIGN KEY (id_maraude) REFERENCES maraude(id),
    FOREIGN KEY (id_maraude_point) REFERENCES maraude_point(id),
    PRIMARY KEY (id_maraude, id_maraude_point)
);

CREATE TABLE if not exists delivery(
    id integer NOT NULL AUTO_INCREMENT,
    departure date NOT NULL,
    theorical_arrival date NOT NULL,
    id_truck integer NOT NULL,
    FOREIGN KEY (id_truck) REFERENCES truck(id),
    PRIMARY KEY (id)
);

CREATE TABLE if not exists product(
    id integer NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists warehouse(
    id integer NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    postal_code varchar(50) NOT NULL,
    road varchar(50) NOT NULL,
    road_number integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists stock(
    id_product integer NOT NULL,
    id_warehouse integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (id_warehouse) REFERENCES warehouse(id) ON DELETE CASCADE,
    PRIMARY KEY (id_product, id_warehouse)
);

CREATE TABLE if not exists delivery_listing(
    id_product integer NOT NULL,
    id_delivery integer NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_delivery) REFERENCES delivery(id),
    PRIMARY KEY (id_product, id_delivery)
);

CREATE TABLE if not exists delivery_product(
    id_product integer NOT NULL,
    id_delivery integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_delivery) REFERENCES delivery(id),
    PRIMARY KEY (id_product, id_delivery)
);

CREATE TABLE if not exists maraude_content(
    id_product integer NOT NULL,
    id_maraude integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_maraude) REFERENCES maraude(id),
    PRIMARY KEY (id_product, id_maraude)
);

ALTER TABLE product
    ADD COLUMN type varchar(20),
    ADD COLUMN donation BOOL;