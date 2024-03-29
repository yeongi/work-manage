﻿CREATE TABLE `employee` (
	`EMP_NO`	char(255)	NOT NULL  primary key,
	`EMP_NAME`	char(255)	NULL,
	`EMP_PW`	char(255)	NULL,
	`ADMIN`	bool	NULL
);

CREATE TABLE `WORK` (
	`WORK_CODE`	bigint NOT NULL auto_increment primary key,
	`WORK_TYPE`	char(20)	NOT NULL,
	`WORK_DES`	char(20)	NOT NULL
);

CREATE TABLE `HULL` (
	`HULL_NO`	char(255)	NOT NULL primary key,
	`HULL_TYPE`	char(255)	NOT NULL,
	`SHIPYARD`	char(255)	NOT NULL
);

CREATE TABLE `BLOCK` (
	`BLK_NO`	char(255)	NOT NULL primary key,
    `HULL_NO` char(255) NOT NULL, 
    FOREIGN KEY (HULL_NO)
    REFERENCES HULL(HULL_NO) ON UPDATE CASCADE,
	`NORM_MH`	VARCHAR(255)	NULL,
	`RES_MH`	VARCHAR(255)	NULL,
	`COMPLETE`	VARCHAR(255)	NULL
);

CREATE TABLE `WORK_RECORD` (
	`RECORD_NO`	bigint	NOT NULL auto_increment primary key,
    `EMP_NO` char(255) NULL, 
    FOREIGN KEY (EMP_NO)
    REFERENCES EMPLOYEE(EMP_NO) 
    on delete set null,
    WORK_CODE bigint, 
	FOREIGN KEY (WORK_CODE)
    REFERENCES WORK(WORK_CODE) 
    on delete set null,
	`WORK_TITLE` char(255) NULL,
    BLK_NO char(255) NOT NULL, 
    FOREIGN KEY (BLK_NO)
    REFERENCES BLOCK(BLK_NO) ON UPDATE RESTRICT,
    HULL_NO char(255) NOT NULL, 
    FOREIGN KEY (HULL_NO)
    REFERENCES HULL(HULL_NO) ON UPDATE RESTRICT,
	`INP_MH`	bigint NOT	NULL,
	`WORK_DATE`	DATETIME	NULL,
	`OVERTIME_MH`	bigint	NULL
);

