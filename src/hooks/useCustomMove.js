
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';


// 페이지 이동 로직을 재사용하기 위해서 훅으로 구현

export function useCustomMove() {

    // state
    const [ refresh, setRefresh ] = useState(false);

    // 페이지 이동
    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1;  // parseInt(searchParams.get('page'))가 falsy 값이면 1로 기본 설정

    const size = parseInt(searchParams.get('size')) || 10;
    
    const keyfield = searchParams.get('keyfield');

    const keyword = searchParams.get('keyword');


    // 이 로직은 게시글 목록 페이지에서 페이징과 검색 기능을 지원하기 위한 URL 쿼리 문자열을 동적으로 생성합니다. 
    // 1. 검색 파라미터가 있는 경우:
    //    - page, size, keyfield, keyword 모든 파라미터를 포함한 쿼리 문자열 생성한다.
    // 2. 검색 파라미터가 없는 경우:
    //    - 기본적인 page와 size 파라미터만 포함한 쿼리 문자열 생성한다.    

    let queryDefault = '';
    if (keyfield != null && keyword != null) {
        queryDefault = createSearchParams({ page, size, keyfield, keyword }).toString();
    } else { 
        queryDefault = createSearchParams({ page, size }).toString();
    }

    
    // 게시글 목록 조회 페이지 이동
    const moveToList = (pageParams) => {
        
        console.log('pageParams : ', pageParams);  // page, size, keyfield, keyword

        let queryStr = '';
        if (pageParams) {
            const page = parseInt(pageParams.page) || 1;
            const size = parseInt(pageParams.size) || 10;
            const keyfield = pageParams.keyfield;
            const keyword = pageParams.keyword;

            if (keyfield && keyword) {
                queryStr = createSearchParams({page, size, keyfield, keyword}).toString();
            } else {
                queryStr = createSearchParams({page, size}).toString();
            }
        } else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);

        console.log('queryStr : ', queryStr);

        // 동시에 URL에 쿼리 파라미터를 추가합니다
        // /list?page=1&size=10&keyfield=writer&keyword=kso
        navigate(`/list?${queryStr}`);
    }

    //게시글 수정 페이지 이동
    const moveToModify = (id) => {       
        navigate(`/modify/${id}?${queryDefault}`);
    }

     //게시글 상세 패이지 이동
    const moveToView = (id) => {
        navigate(`/view/${id}?${queryDefault}`); 
    }

    return { moveToList, moveToModify, moveToView, page, size, keyfield, keyword }


}
