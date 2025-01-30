import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { postArticle } from '../api/postApi';
import ResultModal from './common/ResultModal';
import { useCustomMove } from '../hooks/useCustomMove';
import '../css/ArticleForm.css';

const initialState = {
    title: '',
    contents: '',
    writer: ''
}


const BoardWrite = () => {

    const [article, setArticle] = useState({...initialState});

    const [result, setResult] = useState(null);

    const { moveToList } = useCustomMove();


    const handleChangeForm = (e) => {

        article[e.target.name] = e.target.value;

        setArticle({...article});
    
    }


    const handleClickSave = () => {
        
        if (article.title === '') {
            alert('Pleast enter the title.');
        } else if (article.content === '') {
            alert('Pleast enter the content.');
        } else if(article.writer === '') {
            alert('Pleast enter the writer.');
        } else {

            if (confirm('Would you like to submit the post?')) {

                postArticle(article)
                    .then(data => {
                        console.log('data : ', data);  // {no: 게시글 번호}
                        setResult(data.no);
                        setArticle({...initialState});
                    })
                    .catch(error => {
                        console.log('error : ', error);
                    })
            }
        }
    }


    const handleClickReset = () => {
        setArticle(initialState);
    }

    const closeModal = () => {
        setResult(null);
        moveToList();   // 1 페이지로 이동
    }


    return (
        <>
            <div className="form-container">

                <h1 className="form-title">게시글 작성</h1>

                <div className="form-group-horizontal">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" placeholder="제목을 입력하세요." value={article.title} onChange={handleChangeForm} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="writer">작성자</label>
                    <input type="text" name="writer" placeholder="작성자를 입력하세요." value={article.writer} onChange={handleChangeForm} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" placeholder="내용을 입력하세요."  value={article.content} onChange={handleChangeForm}></textarea>
                </div>
                <div className="form-actions">
                <button type="button" onClick={handleClickSave}>저장</button>
                <button type="button" onClick={handleClickReset}>초기화</button>
                </div>     
            </div>

            { result ? <ResultModal title={"게시글 작성"} content={`Post number ${result} has been successfully submitted`} callbackFn={closeModal}></ResultModal> : <></> }

        </>
    )
}


export default BoardWrite;