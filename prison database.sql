create database criminaldb;
create table criminal(
Criminal_id varchar(150),
First_Name varchar(150),
Age varchar(150),
Years_of_prison int,
Gender varchar(150),
eye_color varchar(150),
Marital_status varchar(150),
inmate_since Timestamp null default current_timestamp,
primary key(Criminal_id));
INSERT INTO criminal(Criminal_id, First_Name,Age,Years_of_prison,Gender,eye_color,Marital_status)
VALUES 
(5001,'JAMES',43,5,'M','Black','Married'),
      (5002,'DAVID',24,6,'M','Black','Married'),
      (5003, 'MILTON',34,4,'M','Black','Married'),
      (5004,'PAUL' ,24,3,'M','Black','Married'),
      (5005,'LAUSEN',56,2,'M','Black','Married'),
          (5006,'harry' ,21,3,'M','Black','Married'), 
          (5007,'potter' ,24,3,'M','Black','Married'),
              (5008,'parthu' ,24,3,'M','Black','Married'),
                  (5009,'rajeev' ,24,3,'M','Black','Married'),
                      (5010,'sanjeev' ,24,3,'M','Black','Married');
create table deleteddeath(
Criminal_id varchar(150),
first_Name varchar(150),
Years_of_prison int);



create table login
( username varchar(150),
password varchar(150),
police varchar(150));
insert into login
values ("dsp#narasimha","yadagirigutta","police"),
('Divyateja','Divya@1234','police'),
('Sravanthi','Sravz@1234','police');
create table visitor(
   S_no int not null auto_increment,
   Full_Name varchar(150),
   Criminal_id varchar(150),
   Phone_no varchar(150),
   Street varchar(150),
   City varchar(150),
   Datetime Timestamp null default current_timestamp,
   primary key(S_no));
   insert into visitor(Full_Name,Criminal_id,Phone_no,Street,City) values 
   ("madhduri",5001,"9182137138","geetha nagar","warangal"),
    ("kavya",5006,"9393379868","balajinagar","Hyd"),
   ("madhu",5007,"9502246903","ganesh wada","janagaon"),
   ("rekha",5008,"9462031478","prakash nagar","miyapur"),
   ("akshitha",5004,"4567890123","teachers nagar","tadipathri"),
    ("manogna",5003,"9136778940","krihsna nagar","kurnool"),
   ("sindhu",5009,"9182137138","nehuru nagar","warangal"),
   ("kamlesh",5001,"6790124809","happy nagar","vizag"),
   ("gayatri",5002,"9182137138","meenakshi nagar","Ap"),
   ("madhurima",5004,"4509863210","helloo nagar","Ap");
   insert into login values("VeerashankarReddy","divyaaunty","police"),("Chowkathalikhan","withdivyaaunty","jailer");
   create table death
    ( 
Dead_personname varchar(150),
Years_of_prison int,
  Death_reason varchar(150)
  );
  insert into death
values ("kamelsh",15,"health issues"),
       ("urekaa",15,"health issues");
create table Handicapped
( Criminal_id varchar(150),
  Name varchar(150),
  Afflicted_by varchar(150));
  insert into Handicapped values(5002,'DAVID','accident'),
                                 (5005,'LAUSEN','accident');  
create table extrahandi(
Criminal_id varchar(150),
First_Name varchar(150)
);
create table guard(
Guard_id varchar(150),
Guard_Name varchar(150),
Salary int,
Age int,
Duty_hours varchar(150),
Subjail_no varchar(150),
Gender varchar(150));
insert into guard values(111,'Satya',12000,36,'8pm-10am',1,'M'),
(112,'Sudheer',15000,39,'8am-10pm',2,'M'),
(113,'Murthy',22000,46,'8pm-10am',3,'M'),
(114,'Kamali',28000,32,'8pm-10am',4,'F'),
(115,'Kantham',32000,42,'8pm-10am',5,'F'),
(116,'Surya kiran',19000,29,'8pm-10am',6,'M'),
(117,'Raghu',35000,55,'8pm-10am',7,'M'),
(118,'Shiva',32000,56,'8am-10pm',8,'M'),
(119,'Shivani',30000,30,'8am-10pm',9,'F'),
(120,'Gowri',22000,33,'8am-10pm',10,'F');
create table Subjail(
Criminal_id  varchar(150),
Subjail_no varchar(150)
);
insert into Subjail values
(5001,1),
(5002,2),
(5003,2),
(5004,3),
(5005,3),
(5006,4),
(5007,5),
(5008,6),
(5009,8),
(5010,9);
create table work(
Criminal_name varchar(150),
Hours_of_work varchar(150),
Type_ofwork varchar(150),
Amount_earned varchar(150)
);
create table crime(
Crime_id varchar(150),
Crime_type varchar(150)
);
insert into crime values
(100,"cyber crime"),
(200,"Burglary"),
(300,"Domestic voilence"),
(400,"house robbery"),
(500,"Human trafficing"),
(600,"voilence"),
(700,"Terrorism"),
(800,"Bribery"),
(900,"Drug trafficiking");
           
create table relation_criminal_crime
(Crime_id varchar(150),
Criminal_id varchar(150)
);
insert into relation_criminal_crime (Crime_id,Criminal_id) values (400,5001),
(200,5002),
(500,5003),
(600,5004),
(700,5005),
(900,5006),
(400,5007),
(100,5008),
(200,5009),
(300,5010);

SELECT * FROM criminal inner join subjail on criminal.Criminal_id =subjail.Criminal_id inner join relation_criminal_crime on   criminal.Criminal_id =relation_criminal_crime.Criminal_id inner join crime  on crime.Crime_id=relation_criminal_crime.Crime_id where criminal.Criminal_id=5001;
   SELECT * FROM criminal inner join subjail on criminal.Criminal_id =subjail.Criminal_id inner join relation_criminal_crime on   criminal.Criminal_id =relation_criminal_crime.Criminal_id inner join crime  on crime.Crime_id=relation_criminal_crime.Crime_id inner join death on criminal.First_Name=death.Dead_personname  where criminal.Criminal_id=5011;
