LOAD DATA INFILE './users.csv'
INTO TABLE Users
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(uid, first_name, last_name, email, telephone, pager_number, fax)
;













;