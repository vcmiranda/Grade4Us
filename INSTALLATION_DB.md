#  Installation Database

## Linux
---

Install required packages
```sh
sudo apt-get install git npm mysql-server
```
Login into mysql
```sh
sudo mysql -u root -p
```
Create user, database, and grant privileges
```mysql
CREATE USER 'grade4us' IDENTIFIED BY 'grade4us';
CREATE DATABASE grade4us;
GRANT ALL PRIVILEGES ON grade4us.* TO 'grade4us'@'%';
SET PASSWORD FOR 'grade4us'@'%' = 'grade4us';
exit
```
Create tables and populate database
```sh
npn run knex
```
