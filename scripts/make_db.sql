create schema vrt
default character set utf8
default collate utf8_general_ci;

-- TABLES
create table vrt.vegetable_type (
       id int auto_increment primary key,
       type_name varchar(256)
);

create table vrt.vegetable (
       id int auto_increment primary key,
       type_id int,
       vegetable_name varchar(256),
       foreign key (type_id)
       	       references vrt.vegetable_type(id)
);

create table vrt.herb (
       id int auto_increment primary key,
       herb_name varchar(256)
);

create table vrt.vegetable_relation (
       id int auto_increment primary key,
       vegetable_id_1 int,
       vegetable_id_2 int,
       effect int,
       foreign key (vegetable_id_1)
       	       references vrt.vegetable(id),
       foreign key (vegetable_id_2)
       	       references vrt.vegetable(id)       
);

create table vrt.vegetable_herb_relation (
       id int auto_increment primary key,
       vegetable_id int,
       herb_id int,
       effect int,
       foreign key (vegetable_id)
       	       references vrt.vegetable(id),
       foreign key (herb_id)
       	       references vrt.herb(id)       
);

create table vrt.garden (
       id int auto_increment primary key
       garden_name varchar(256)
);

create table vrt.garden_cell (
       id int auto_increment primary key,
       garden_id int,
       x_pos int not null,
       y_pos int not null,
       vegetable_id not null,
       foreign key (garden_id)
       	       references vrt.garden(id),
       foreign key (vegetable_id)
       	       references vrt.vegetable(id)
);
