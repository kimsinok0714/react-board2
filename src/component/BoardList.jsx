import { useEffect, useState, useRef } from "react";
import { useCustomMove } from '../hooks/useCustomMove';
import { getSearchPostList } from '../api/postApi';
import PageComponent from './common/PageComponent';
import '../css/Article.css';
import { useSearchParams } from "react-router-dom";


const initialState = {
    dtoList: [],
    pageRequestDto: null,
    totalCount: 0,
    pageNumList: [],
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}


// 리액트 컴포넌트
const BoardList = () => {

    const [ searchParams ] = useSearchParams();

    const [ serverData, setServerData ] = useState({ ...initialState });
    
    const [ keyfield, setKeyfield ]  = useState('');

    const [ keyword, setKeyword ]  = useState('');

    const { moveToList, moveToModify, moveToView, page, size } = useCustomMove();  //  page = 1, size = 10
    

    useEffect( () => {    

        const keyfieldParam = searchParams.get("keyfield") || '';
        
        const keywordParam = searchParams.get("keyword") || '';
        
        if (keyfieldParam !== '' && keywordParam !== '') { 
                     
            getSearchPostList({ page, size, keyfield: keyfieldParam, keyword: keywordParam })
                .then(data => {
                    setServerData(data);          
                })
                .catch(error => {
                    console.error("Error : ", error);
                })           
            
            
            setKeyfield(keyfieldParam);

            setKeyword(keywordParam);

        
        }  else {            
         
            getSearchPostList({ page, size, keyfield, keyword })
                .then(data => {
                    setServerData(data);          
                })
                .catch(error => {
                    console.error("Error : ", error);
                })

        }         
      

    }, [ page, size])



    const handleChanageKeyfield = (e) => {       
        
        setKeyfield(e.target.value);

        setKeyword("");

    }


    const handleChanageKeyword = (e) => {
        
        setKeyword(e.target.value);
        
    }


    // 검색 버튼 선택
    const handleClickSearch = () => {
       

        getSearchPostList({ page, size, keyfield, keyword })
            .then(data => {
                setServerData(data); // 리액트는 상태가 변경되면 화면을 리렌더링한다.
            })
            .catch(error => {
                console.error("Error : ", error);
            })
          
           
        moveToList({page: 1, size: size, keyfield: keyfield, keyword: keyword});        
            
    }

    return (
        <>       
            <div className="board-container">    

                <h1 className="board-title">게시글 목록</h1>

                {/* 검색 폼 */}
                <div style={{ marginBottom: "20px" }}>
                    <select value={keyfield} onChange={handleChanageKeyfield}>     
                        <option value="">선택</option>                   
                        <option value="writer">작성자</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                    </select>&nbsp;&nbsp;
                    <input type="text" placeholder="검색어 입력" value={keyword} onChange={handleChanageKeyword}/>&nbsp;&nbsp;
                    <button onClick={handleClickSearch}>검색</button>
                </div>

                <table className="board-table"> 
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serverData.dtoList.map((post, index) => {                          

                                return <tr key={post.id}>
                                    <td>{((page - 1) * size) + index + 1}</td>
                                    <td onClick={() => moveToView(post.id)} style={{cursor: 'pointer'}}>{post.title}</td>
                                    <td>{post.writer}</td>
                                    <td>{post.regDate}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            <PageComponent serverData={ serverData }  searchCondition= { { keyfield, keyword } } movePage={ moveToList }></PageComponent>
        
        </>
    )
}


export default BoardList;