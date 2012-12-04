CREATE TABLE Users (
uid int NOT NULL AUTO_INCREMENT,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
email varchar(30) NOT NULL,
telephone char(11) NOT NULL,
pager_number varchar(17) NOT NULL,
fax varchar(17),
primary key(uid),
UNIQUE (email)
);

CREATE TABLE Logins(
u_name varchar(30),
uid int,
password varchar(20) NOT NULL,
Foreign KEY (uid) references users(uid),
primary key(u_name),
);


CREATE TABLE Permissions(
permid INT NOT NULL AUTO_INCREMENT,
descr varchar(20) NOT NULL,
primary key(permid)
); 


CREATE TABLE On_Permissions(
uid int NOT NULL,
permid INT NOT NULL,
PRIMARY KEY(uid,permid),
FOREIGN KEY(uid) REFERENCES Users(uid),
FOREIGN KEY(permid) REFERENCES Permissions(permid)
);

##APPLICATION STATE NEEDED
CREATE TABLE Applications(
aid varchar (12),
rid REAL,
proposalTitle VARCHAR(50),
uid varchar (12),
fid VARCHAR (12),
frid REAL,
lastEditBy VARCHAR(12),
PRIMARY KEY(aid,rid)
);


CREATE TABLE FormA ( 
fid varchar(12),
rid Real,
lastEditBy VARCHAR(12),
proposalTitle VARCHAR(50) NOT NULL,
shortTitle CHAR(50) NOT NULL,
formA2 VARCHAR(12),
formA3 VARCHAR(12),
formA4 VARCHAR(12),
formA5 VARCHAR(12),
formA6 VARCHAR(12),
formA7 VARCHAR(12),
formA8 VARCHAR(12),
formA9 VARCHAR(12),
formA10 VARCHAR(12),
formA11 VARCHAR(12),
formA12 VARCHAR(12),
formA13 VARCHAR(12),
primary KEY (fid, rid)
);
