import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle } from '../api/postApi';
import { useCustomMove } from '../hooks/useCustomMove';
import '../css/ArticleView.css';

const initialState = {
    id : 0,
    title: '',
    contents: '',
    writer: '',
    regDate: ''
}


const BoardView = () => {
   
    const { id } = useParams();  // URL parameter

    const [ post, setPost ] = useState({ ...initialState });  // Spread Operator : 객체 복사

    const { moveToList, moveToModify, page, size, keyfield, keyword } = useCustomMove();     // 페이지 이동 : 게시글 목록, 게시글 변경

    console.log('--------------------------- BoardView')
    console.log('page : ', page);
    console.log('size : ', size);
    console.log('keyfield : ', keyfield);
    console.log('keyword : ', keyword);


    useEffect(() => {

        getArticle(id)
            .then(data => {
                console.log('data : ', data);    
                setPost(data);
            }) 
            .catch(error => {
                console.log('error: ', error);
            });


    }, [id]); // 의존성 배열
    
    const onDelete = () => {


    }

    return (
        <>
        <div className="container">
            <div className="title">{ post.id }번 게시글 정보</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>제목 : </span> { post.title }</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>내용 : </span> { post.contents }</div>
            <div className="content">
                Created on { post.regDate } by { post.writer }
            </div>

            <div className="form-actions">
                <button onClick={() => moveToModify(id)}>Modify</button>                       
                <button className='btn-sm' variant='danger' onClick={onDelete}>Delete</button>
                <button onClick={ () => moveToList({page, size, keyword, keyfield}) }>List</button>
            </div>     
        </div>
        </>
    );
}


export default BoardView;