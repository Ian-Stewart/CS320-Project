CREATE TABLE users (
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

CREATE TABLE logins(
username varchar(30),
uid int,
password varchar(20) NOT NULL,
Foreign KEY (uid) references Users(uid),
primary key(username)
);


CREATE TABLE permissions(
	permid INT NOT NULL AUTO_INCREMENT,
	descr varchar(25) NOT NULL,
	primary key(permid)
); 


CREATE TABLE on_permissions(
uid int NOT NULL,
permid INT NOT NULL,
PRIMARY KEY(uid,permid),
FOREIGN KEY(uid) REFERENCES Users(uid),
FOREIGN KEY(permid) REFERENCES Permissions(permid)
);

##APPLICATION STATE NEEDED
## Foreign key proposalTitle
CREATE TABLE applications(
aid INT NOT NULL AUTO_INCREMENT,
rid INT NOT NULL,
proposalTitle VARCHAR(50),
uid int,
lastEditBy VARCHAR(12),
editState ENUM('null','open','frozen','locked','archived'),
submissionState ENUM('defferedByIRB','defferedByCCI','CCI','IRB','null'),
approvalState ENUM('null','approved','denied'),
username varchar(30),
PRIMARY KEY(aid,rid),
FOREIGN KEY (uid) REFERENCES Users(uid),
FOREIGN KEY (username) REFERENCES Logins(username)
);

CREATE TABLE forma (
aid INT,
rid INT,
lastEditBy VARCHAR(12),
proposalTitle VARCHAR(50) NOT NULL,
shortTitle CHAR(50) NOT NULL,
primary KEY (aid, rid),
FOREIGN KEY (aid) REFERENCES Applications(aid)
);
