CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO reviews(restaurant_id,name,review,rating) values (2,'Piet', 'no go',1);

SELECT * FROM reviews where restaurant_id =1;

SELECT COUNT(*) FROM reviews where restaurant_id =1;

SELECT AVG(rating) FROM reviews;

SELECT SUM(rating) FROM reviews WHERE restaurant_id =1;

SELECT AVG(rating) FROM reviews WHERE restaurant_id =1;

SELECT TRUNC(AVG(rating),2) AS average_rating FROM reviews WHERE restaurant_id =1;

SELECT COUNT(rating) FROM reviews WHERE restaurant_id =1;

SELECT location, count(location) from restaurants group by location;

SELECT restaurant_id, COUNT(restaurant_id) from reviews group by restaurant_id;



SELECT SUM(rating) FROM reviews WHERE restaurant_id =1;

SELECT restaurant_id, AVG(rating), COUNT(rating) from reviews group by restaurant_id;

SELECT * FROM restaurants INNER JOIN reviews ON restaurant_id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN reviews ON restaurant_id = reviews.restaurant_id;

SELECT * FROM restaurants RIGHT JOIN reviews ON restaurant_id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant_id = reviews.restaurant_id;


-- login to remote server

ssh -i "G:\My Drive\Drive S\02 Web app\AWS\yelp.pem" ubuntu@54.90.190.72

windows cmd

sudo apt update && sudo apt upgrade -y

sudo apt install postgresql postgresql-contrib -y

sudo pg_ctlcluster 12 main start

sudo cat /etc/passwd

sudo -i -u postgres

psql

\l

\q 

 createuser --interactive

 ubuntu

 y

 psql

 \du

 \q

 exit

 psql

 psql -d postgres

 --help to learn of all the cmd flags

 \conninfo

 cd /etc/postgresql/12/

 cd mainls

sudo cat pg_hba.conf

ALTER user ubuntu PASSWORD 'Dfgkjhtyrun123!@#';

\q

cd ~

-- re-create database schema

-- pack database on local server to upload

pg_dump -U postgres -f yelp.pgsql -C yelp

-- ensure file was created

dir

-- copy file to remote server

scp -i "G:\My Drive\Drive S\02 Web app\AWS\yelp.pem" yelp.pgsql ubuntu@54.90.190.72:home\ubuntu\

-- Remote server

dir

ls

psql - postgres

CREATE DATABASE yelp

\learn

\q

-- import database to remote server database

psql yelp < yelp.pgsql

psql -d yelp

\q

pwd 

mkdir apps

cd apps

pwd

mkdir yelp-app

cd yelp-app

copy gitclone code......

ls

see Client and Server readme files

install node js

npm install

sudo npm install pm2 -g

cd ~

pm2 start apps/yelp-app/server/server.js

pm2 stop 0

pm2 status

pm2 delete 0

pm2 start apps/yelp-app/server/server.js --name yelp-app

pm2 startup

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

pm2 save

sudo reboot

ssh -i "G:\My Drive\Drive S\02 Web app\AWS\yelp.pem" ubuntu@54.90.190.72

pm2 status

--front end setup

cd apps/yelp-app/client

ls

client server readme files

npm install

npm run build

cd build

pwd

-- install nginx in build directory

sudo apt install nginx -y

-- start nginx when server reboots
sudo systemctl enable nginx

systemctl status nginx

q to exit stauts check

cat default

 sudo cp default "tothet.co.za" --DomainName-- 













