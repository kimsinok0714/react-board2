import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle, putArticle } from "../api/postApi";
import { useCustomMove } from "../hooks/useCustomMove";
import ResultModal from './common/ResultModal';

const initialState = {
    no: 0,
    title: '',
    contents: '',
    writer: '',
    regDate: ''
}


const BoardModify = () => {
    /*
        const params = useParams(); // {no: 1}
        const no = params.no;        
    */
    // 구조 분해 할당(destructuring assignment)을 사용해 no라는 키의 값을 변수로 추출한 것입니다.

    const { no } = useParams(); 

    // 객체 복사 : 
    // 원본 객체가 불변성(immutability)을 유지하도록 보장하기 위해서입니다.

    const [article, setArticle] = useState({...initialState}); 

    const [result, setResult] = useState(null);

    // 수정 -> 조회
    // 삭제 -> 목록
    const { moveToView, moveToList, moveToModify }  = useCustomMove();
        
    useEffect(() => {
        
        getArticle(no)
            .then(data => {
                console.log('data : ', data);
                setArticle(data);
            })
            .catch(error => {
                console.log('error : ', error);
            })

    }, [no]);



    const handleChangeForm = (e) => {        

        article[e.target.name] = e.target.value;
        
        setArticle({...article});

    }


    const handleClickModify = async () => {

        if (article.title == '') {
            alert('제목을 입력하세요');
        } else if (article.contents === '') {
            alert('내용을 입력하세요');
        } else if (article.writer === '') {
            alert('작성자를 입력하세요')
        } else {
            if (confirm('Would you like to edit the post?')) {              
                
                putArticle(article)
                    .then(data => {                        
                        setResult('Modified');                            
                    })
                    .catch(error => {
                        console.log('error : ', error);                        
                    })
            }
        }
    }


    const handleClickDelete = () => {   
       // 게시그 삭제

       setResult('Deleted')
    }

    const closeModal = () => {

        if (result === 'Modified') {
            moveToView(no);  
        } else {  // 'Deleted'            
            moveToList();          
        }        

        setResult(null);
    }

    return (
        <>
            <div className="form-container">

                <h1 className="form-title">게시글 수정</h1>

                <div className="form-group-horizontal">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title"  value={article.title} onChange={handleChangeForm} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="writer">작성자</label>
                    <input type="text" name="writer"  value={article.writer} onChange={handleChangeForm} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="content">내용</label>
                    <textarea name="content"   value={article.content} onChange={handleChangeForm}></textarea>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={handleClickModify}>Modify</button>
                    <button type="button" onClick={handleClickDelete}>Delete</button>
                </div>     
            </div>

            { result ? <ResultModal title={"처리 결과"} content={result} callbackFn={closeModal}></ResultModal> : <></> }

        </>
    )
}


export default BoardModify;
