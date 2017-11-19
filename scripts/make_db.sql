create schema vrt;

create table vrt.vegetable_type (
       id int,
       type_name varchar2(256 char)
);

create table vrt.vegetable (
       id int,
       type_id int,
       vegetable_name varchar2(256 char)
);

create table vrt.herb (
       id int,
       herb_name varchar2(256 char)
);

create table vrt.vegatable_relation (
       id int,
       vegetable_id_1 int,
       vegetable_id_2 int,
       effect int
);

create table vrt.vegetable_herb_relation (
       id int,
       vegetable_id int,
       herb_id int,
       effect int	
);
