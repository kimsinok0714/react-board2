
// ES 모듈
import express from 'express';
import cors from 'cors';
// mysql 데이터베이스 사용
import mysql from 'mysql2';
import { jsonParser } from '../util/jsonParser.js';


// express를 사용하기 위한 App 생성
const app = express();


// express 포트 생성
// const PORT = process.env.PORT || 5000;
const PORT = 5000;


// JSON 형식의 본문을 파싱한다.
app.use(jsonParser)
app.use(cors());


// db 접속 정보 
const db = mysql.createConnection({
    host: "localhost",
    user: "react",
    password: "1234",
    port: "3306",
    database: "db_board"
});



// express 서버 접속
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}`);
});



//db 서버 접속
db.connect((err) => {
    console.log(err);

    if (!err) {
        console.log('db접속 성공!');
    } else {
        console.log('db접속 실패!');
    }
});


// 처음 express에 접속 했을 경우
app.get('/', (req, res) => {
    console.log('root!');
});



// 게시글 등록
app.post('/insert', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const writer = req.body.writer;

    console.log(title, contents, writer);

    const sql = 'insert into board(title, contents, writer) values(?,?,?)';

    db.query(sql, [title, contents, writer], (err, data) => {
        if (!err) {
            console.log(data);
            res.sendStatus(200);
        } else {
            console.log(err);
        }
    });
});


// 게시글 목록 조회
app.get('/list', (req, res) => {
    console.log(`app.get('/list')`);

    const sql = "select * from board order by id desc";
    db.query(sql, (err, data) => {
        if (!err) {
            // console.log(data);
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// 게시글 상세 조회
app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    console.log(`app.get('/view/${id}')`);

    const sql = 'select id, title, contents, writer, reg_date from board where id = ?';
    db.query(sql, [id], (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// 게시글 삭제
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(`app.get('/delete/${id}')`);

    const sql = 'delete from board where id = ?';
    db.query(sql, [id], (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
        }
    });
})

// 게시글 수정
app.post('/update/:id', (req, res) => {

    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;
    const writer = req.body.writer;

    const sql = 'update board set title = ?, contents = ?, writer = ? where id = ?';
    db.query(sql, [title, contents, writer, id], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
        }
    });

})



