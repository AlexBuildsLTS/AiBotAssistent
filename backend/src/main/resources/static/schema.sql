CREATE TABLE country (
                         Code CHAR(3) NOT NULL DEFAULT '',
                         Name CHAR(52) NOT NULL DEFAULT '',
                         Continent ENUM('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL DEFAULT 'Asia',
                         Region CHAR(26) NOT NULL DEFAULT '',
                         SurfaceArea DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                         IndepYear SMALLINT NULL,
                         Population INT NOT NULL DEFAULT 0,
                         LifeExpectancy DECIMAL(3, 1) NULL,
                         GNP DECIMAL(10, 2) NULL,
                         GNPOld DECIMAL(10, 2) NULL,
                         LocalName CHAR(45) NOT NULL DEFAULT '',
                         GovernmentForm CHAR(45) NOT NULL DEFAULT '',
                         HeadOfState CHAR(60) NULL,
                         Capital INT NULL,
                         Code2 CHAR(2) NOT NULL DEFAULT '',
                         PRIMARY KEY (Code)
);

CREATE TABLE city (
                      ID INT AUTO_INCREMENT PRIMARY KEY,
                      Name CHAR(35) NOT NULL DEFAULT '',
                      CountryCode CHAR(3) NOT NULL DEFAULT '',
                      District CHAR(20) NOT NULL DEFAULT '',
                      Population INT NOT NULL DEFAULT 0,
                      CONSTRAINT city_ibfk_1 FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

CREATE INDEX idx_CountryCode ON city (CountryCode);

CREATE TABLE countrylanguage (
                                 CountryCode CHAR(3) NOT NULL DEFAULT '',
                                 Language CHAR(30) NOT NULL DEFAULT '',
                                 IsOfficial ENUM('T', 'F') NOT NULL DEFAULT 'F',
                                 Percentage DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
                                 PRIMARY KEY (CountryCode, Language),
                                 CONSTRAINT countryLanguage_ibfk_1 FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

CREATE INDEX idx_CountryCode ON countrylanguage (CountryCode);
