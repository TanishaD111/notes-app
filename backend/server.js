import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
const app = express();
import cors from 'cors'
app.use(cors());
app.use(express.json());
import path from 'path'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
app.use(cookieParser());
const salt = 10;

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

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if(err) return res.json({Error: "Error for hashing password"});
    const values = [
      req.body.name,
      req.body.email,
      hash,
    ];

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error(err);
        //res.status(500).send("Error inserting user into database");
        return res.json({Error: "Inserting data error in server"})
        
      } else {
        console.log("user added to database:", result);
        //res.status(200).send("user added to database");
        return res.json({Status: "Success"})
      }
    });
  })
});

app.post("/login", (req, res) => {
  const sql =
    'SELECT * FROM users WHERE `email` = ?';

  const values = [
    req.body.email,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      //res.status(500).send("No such user in database");
      //return res.json("Failed");
      res.json({Error: "Login error in server"})
    } else {
      //console.log("User is in database:", result);
      //res.status(200).send("User is in database");
      //return res.json("Success");
      if (result.length > 0) {
        //console.log("User is in the database:", result);
        //return res.json("Success");
        bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
          if(err) return res.json({Error: "Password compare error"});
          if(response) {
            return res.json({Status: "Success"})
          } else {
            console.error("Error!!");
            return res.json({Error: "Password doesn't match"})
          }
        })
      } else {
        //console.log("No user in the database");
        //res.status(404).json({ status: "Failed" });
        //return res.json("Failure");
        res.json({Error: "No email exists"})
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
    "INSERT INTO notes (`content`, `user_id`) VALUES (?)";

  const values = [
    req.body.content,
    req.body.user_id,
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

app.post("/todolist/remove", (req, res) => {
  const sql =
    "DELETE FROM todolist WHERE description = ?";

  const values = [
    req.body.description,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting list item from database");
    } else {
      console.log("list item deleted from database:", result);
      res.status(200).send("list item deleted from database");
    }
  });
});



  