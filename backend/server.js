import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
const app = express();
import cors from 'cors'
app.use(cors());
app.use(express.json());
import path from 'path'

// Create MySQL Connection
dotenv.config();
const db = mysql.createConnection({
  host: process.env.APP_HOST,
  user: process.env.APP_USER,
  password: process.env.APP_PASSWORD,
  database: process.env.APP_DB,
});

// Connect Database
db.connect((err) => {
  if (err) {
    console.log("MySQL not connected");
    throw err;
  }
  console.log("MySQL connected");
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

/*
export async function getNotes(id){
  const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [id])
  return rows[0]
}

export async function createNote(title, content){
  const [result] = await db.query('INSERT INTO notes (`title`, `content`) VALUES (?, ?)', [title, content])
  const id = result.insertID
  return getNote(id)
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'NotesPage.html'))
});

//const result = await createNote('test', 'test')
//console.log(result)
*/

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const sql =
    "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting user into database");
    } else {
      console.log("user added to database:", result);
      res.status(200).send("user added to database");
    }
  });
});

app.post("/login", (req, res) => {
  const sql =
    'SELECT * FROM users WHERE `email` = ? AND `password` = ?';

  const values = [
    req.body.email,
    req.body.password,
  ];

  db.query(sql, [req.body.email, req.body.password,], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("No such user in database");
      //return res.json("Failed");
    } else {
      //console.log("User is in database:", result);
      //res.status(200).send("User is in database");
      //return res.json("Success");
      if (result.length > 0) {
        console.log("User is in the database:", result);
        return res.json("Success");
      } else {
        //console.log("No user in the database");
        //res.status(404).json({ status: "Failed" });
        return res.json("Failure");
      }
    }/*
    if(result.length > 0){
      return res.json("Success");
    } else {
      return res.json("Failed");
    }*/
  });
});

app.get("/notes", async (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/notes", (req, res) => {
  const sql =
    "INSERT INTO notes (`title`, `content`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.content,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting note into database");
    } else {
      console.log("note added to database:", result);
      res.status(200).send("note added to database");
    }
  });
});

app.get("/todolist", async (req, res) => {
  const sql = "SELECT * FROM todolist";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/todolist", (req, res) => {
  const sql =
    "INSERT INTO todolist (`description`, `done`) VALUES (?)";

  const values = [
    req.body.description,
    req.body.done,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting list item into database");
    } else {
      console.log("list item added to database:", result);
      res.status(200).send("list item added to database");
    }
  });
});



  