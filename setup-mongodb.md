# Setting Up MongoDB server

## Steps:
1. installing mongoDB onto linux server
2. 


# 1. Installing MongoDB
### Step 1. install package manager and import the key
```bash 
sudo apt-get install gnupg &&
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor
```
### Step 2. Create list file for MongoDB
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```
### Step 3. Install MongoDB
```bash
sudo apt-get update && sudo apt-get install -y mongodb-org
```
### Step 4. Start MongoDB 
```bash
sudo systemctl start mongod
```
#### Step 4b. Enable mongo to run on every boot
```bash
sudo systemctl enable mongod
```
### Step 5. Add an admin user 
first, run 
```bash
mongosh
```
to open a shell into the MongoDB server that is running

#### step 5b switch to admin database (default built in MongoDB database)
```mongo
use admin
```
#### step 5c. add user
```mongo
db.createUser({user:"admin", pwd:"yourNewPassword",roles["userAdminAnyDatabase","dbAdminAnyDatabase","readWriteAnyDatabase"]})
```
then exit
```
exit
```
#### Step 5d. Edit the MongoDB config file to allow authentication and open to outside connection
```bash
sudo nano /etc/mongod.conf
```
change the ip address in ```bindIp``` to ```0.0.0.0```
change the line that says ```#security:``` to 
```yaml
security:
  authentication: enabled
```
note the empty space after each colon is required. two spaces for indention is also required
### Step 6. Restart MongoDB
```
sudo systemctl restart mongod
```

### Step 6. Open Firewall
```
sudo ufw allow 27017/tcp
```

now you can login with the newly created username and password
if you are using mongoose library in javascript, the connect URL is 'mongodb://username:password@127.0.0.1:27017'

swap out the ip address (127.0.0.1) for the ip address of your server



### Managing the Database
#### Install Mongo Compas
[https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
#### Launch and connecto to server
![compasScreenshot](./compasScreenshot.png)
