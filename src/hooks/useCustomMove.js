
import { useNavigate, useSearchParams, createSearchParams } from  'react-router-dom'
import { useState } from 'react';


const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return parseInt(param);

}



// 페이지 이동 : 재사용
export const useCustomMove = () => {

    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();

    const page = getNum(searchParams.get('page'), 1);

    const size = getNum(searchParams.get('size'), 10);

    const keyfield = searchParams.get('keyfield');

    const keyword = searchParams.get('keyword');

    const [ refresh , setRefresh ] = useState(false);


    let queryDefault  = '';

    if (keyfield != null && keyword != null) {
        queryDefault = createSearchParams({ page, size, keyfield, keyword }).toString();
    } else {
        queryDefault = createSearchParams({ page, size }).toString();
    }
    
    
    
    // 게시글 목록 조회 페이지 이동
    const moveToList = (pageParam) => {

        console.log('pageParam : ', pageParam); // { page: 1 }
        
        let queryStr = '';

        if (pageParam) {

            console.log('pageParam : ', pageParam);

            const pageNum = getNum(pageParam.page, 1);            
            const sizeNum = getNum(pageParam.size, 10);            
            const keyfield = pageParam.keyfield;    
            const keyword = pageParam.keyword;


            if (keyfield && keyword) {
                queryStr = createSearchParams({page: pageNum, size: sizeNum, keyfield: keyfield, keyword: keyword}).toString();
            } else {
                queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();
            }
        

        } else {
            queryStr = queryDefault;
        }  

        setRefresh(!refresh);

        console.log('queryStr : ', queryStr);

        navigate({ pathname: '../list', search: queryStr })  // URL query String 이 변경된다.
    }


    // 게시글 수정 페이지 이동
    const moveToModify = (id) => {      // post.id 전달
        
        navigate({ pathname: `../modify/${id}`, search: queryDefault });
    }



    // 게시글 상세조회 페이지 이동
    const moveToView = (id) => {
        
        navigate({ pathname: `../view/${id}`, search: queryDefault});
    }



    return { moveToList, moveToModify, moveToView, page, size, keyfield, keyword }



}