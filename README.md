# Expenses Tracker

  * Log expenses, tag them (or have categories)
  * List expenses
  * Have a few graphs (last month / last year)
  * Store them somewhere

- [ ] Move products to DB collection.
- [ ] Add products categorization.
- [ ] Add config files.

### Running

1. Open *client* and *server* folders in **Terminal**
2. Run in each folder:
```bash
npm install
```
3. In *server/database/database.js* set your Mongo DB name and password
```javascript
const mongoDB = 'mongodb+srv://NAME:PASSWORD@cluster-etamj.mongodb.net/ProjectDB'
```
4. Run in *server* folder
```bash
node server.js
```
5. In *client/src/App.js* set your server IP address and port
```javascript
const serverIP = 'IP:PORT';
```
6. Run in *client* folder
```bash
npm start
```

