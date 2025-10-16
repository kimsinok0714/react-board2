import { useEffect, useState, useRef } from "react";
import { useCustomMove } from '../hooks/useCustomMove';
import { getSearchPostList } from '../api/postApi';
import PageComponent from './common/PageComponent';
import { useSearchParams } from "react-router-dom";
import '../css/Article.css';


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

    const { moveToList, page, size } = useCustomMove();  // page = 1, size = 10

    // 로딩 상태태
    const [loading, setLoading] = useState(false);

    // const [ searchParams, setSearchParams ] = useSearchParams();

    // const page = parseInt(searchParams.get('page')) || 1;  // parseInt(searchParams.get('page')) falsy 값일 경우 1 설정정

    // const size = parseInt(searchParams.get('size')) || 10;
    

   useEffect( () => {    

        const keyfieldParam = searchParams.get("keyfield") || '';            
        const keywordParam = searchParams.get("keyword") || '';

        // URL 파라미터가 있으면 상태 업데이트
        if (keyfieldParam !== keyfield) setKeyfield(keyfieldParam);
        if (keywordParam !== keyword) setKeyword(keywordParam);
        
       getSearchPostList({ 
            page, 
            size, 
            keyfield: keyfieldParam || keyfield,   //truthy 값
            keyword: keywordParam || keyword 
        })
        .then(data => {
            setServerData(data);          
        })
        .catch(error => {
            console.error("Error : ", error);
        });
        
        // if (keyfieldParam !== '' && keywordParam !== '') {                      
        //     getSearchPostList({ page, size, keyfield: keyfieldParam, keyword: keywordParam })
        //             .then(data => {
        //                 setServerData(data);          
        //             })
        //             .catch(error => {
        //                 console.error("Error : ", error);
        //             })                      
        
        // }  else {          
        //     getSearchPostList({ page, size, keyfield, keyword })
        //             .then(data => {
        //                 setServerData(data);          
        //             })
        //             .catch(error => {
        //                 console.error("Error : ", error);
        //             })
        // }         
      

    }, [ page, size])


    const handleChanageKeyfield = (e) => {      
        
        setKeyfield(e.target.value); 
        setKeyword(""); // 검색 필드 변경 시 키워드 초기화

    }


    const handleChanageKeyword = (e) => {
        
        setKeyword(e.target.value);
        
    }

    // 사용자 경험: 검색 버튼 클릭 시 즉시 결과를 보여줌
    // 에러 처리: API 실패 시 URL을 업데이트하지 않음
    // 검색 버튼 선택
    const handleClickSearch = () => {

        if (!keyfield || !keyword) {
            alert("검색 조건을 선택하고 검색어를 입력해주세요.");
            return;
        }
        
        setLoading(true);
        
        // 새로운 검색이므로 1페이지부터 시작
        getSearchPostList({ page: 1, size, keyfield, keyword })
            .then(data => {
                setServerData(data); 
                // 성공 시에만 URL 업데이트
                moveToList({page: 1, size: size, keyfield: keyfield, keyword: keyword});        
            })
            .catch(error => {
                console.error("Error : ", error);
            })
            .finally(() => {
                setLoading(false);    
            });
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
                                    {/* <td>{((page - 1) * size) + index + 1}</td> */}
                                    <td>{totalCount - ((page - 1) * size) - index}</td>
                                    <td onClick={() => moveToView(post.id)} style={{cursor: 'pointer'}}>{post.title}</td>
                                    <td>{post.writer}</td>
                                    <td>{post.regDate}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        
             // moveToList :   '/list?page=1&size=10&keyfield=writer&keyword=kso'
            <PageComponent serverData={ serverData }  searchCondition= { { keyfield, keyword } } movePage={ moveToList }></PageComponent>
        
        </>
    )
}


export default BoardList;
