LOAD DATA INFILE './users.csv'
INTO TABLE users
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(uid, first_name, last_name, email, telephone, pager_number, fax)
;
LOAD DATA INFILE './logins.csv'
INTO TABLE logins
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(username, uid, password)
;
LOAD DATA INFILE './permissions.csv'
INTO TABLE permissions
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(permid, descr)
;
LOAD DATA INFILE './on_permissions.csv'
INTO TABLE on_permissions
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(uid, permid)
;
LOAD DATA INFILE './applications.csv'
INTO TABLE applications
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(aid, rid, proposalTitle, uid, lastEditBy, editState, submissionState, approvalState, username)
;
LOAD DATA INFILE './forma.csv'
INTO TABLE forma
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(aid, rid, lastEditBy, proposalTitle, shortTitle)
;
