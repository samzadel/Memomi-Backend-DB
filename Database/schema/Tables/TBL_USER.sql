CREATE TABLE [TBL_USER]
(
[USER_ID] INT IDENTITY NOT NULL,
EMAIL NVARCHAR(255),
[PASSWORD] NVARCHAR(255),
YEAR_OF_BIRTH INT,
CONSTRAINT PK_USER_USER_ID PRIMARY KEY ([USER_ID])
)