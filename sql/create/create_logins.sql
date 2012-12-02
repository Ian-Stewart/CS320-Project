CREATE TABLE Logins(
	u_name varchar(30),
	uid int,
	password varchar(20) NOT NULL,
	Foreign KEY (uid) references Users(uid),
	primary key(u_name),
	UNIQUE (password)
);