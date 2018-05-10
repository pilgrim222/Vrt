create schema vrt;

-- TABLES
create table vrt.vegetable_type (
       id serial primary key,
       type_name varchar(256)
);

create table vrt.vegetable (
       id serial primary key,
       type_id int,
       vegetable_name varchar(256),
       foreign key (type_id)
       	       references vrt.vegetable_type(id)
);

create table vrt.herb (
       id serial primary key,
       herb_name varchar(256)
);

create table vrt.vegetable_relation (
       id serial primary key,
       vegetable_id_1 int,
       vegetable_id_2 int,
       effect int,
       foreign key (vegetable_id_1)
       	       references vrt.vegetable(id),
       foreign key (vegetable_id_2)
       	       references vrt.vegetable(id)       
);

create table vrt.vegetable_herb_relation (
       id serial primary key,
       vegetable_id int,
       herb_id int,
       effect int,
       foreign key (vegetable_id)
       	       references vrt.vegetable(id),
       foreign key (herb_id)
       	       references vrt.herb(id)       
);

create table vrt.garden (
       id serial primary key,
       garden_name varchar(256)
);

create table vrt.garden_cell (
       id serial primary key,
       garden_id int,
       x_pos int,
       y_pos int,
       vegetable_id int,
       foreign key (garden_id)
       	       references vrt.garden(id),
       foreign key (vegetable_id)
       	       references vrt.vegetable(id)
);
