import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/v1`;  // Template Literal


export const getArticle = async (id) => {

    console.log('게시글 번호 : ', id);

    const result = await axios.get(`${prefix}/posts/${id}`);  

    return result.data;   // 리턴 타입은 Promise 객체
      
}



// export const getArticleList = async(pageParam) => {

//     const { page, size } = pageParam;

//     const result = await axios.get(`${prefix}/posts`, { params: { page, size } });

//     return result.data;

// }


export const postArticle = async (article) => {

    //  자바스크립트 객체 -> JSON 문자열 변환이 필요한데 axio 기본 지원
    // Content-Type: application/json
    
    const result = await axios.post(`${prefix}/posts`, article)
    
    return result.data;


}


export const putArticle = async (article) => {

    const result = await axios.put(`${prefix}/posts/${article.no}`, article);
    return result.data;

}


// 게시글 목록 조회 (페이징 + 검색)
export const getSearchPostList = async ({ page, size, keyfield, keyword }) => {
    console.log('page : ', page);
    console.log('size : ', size);
    console.log('keyfield : ', keyfield);
    console.log('keyword : ', keyword);

    // axios가 자동으로 쿼리 스트링을 처리
    // axios가 URL 인코딩을 자동 처리
    // URL 인코딩 : URL에 특수문자나 한글 등이 포함되면 웹에서 안전하게 전송하기 위해 인코딩이 필요합니다.
    const result = await axios.get(`${prefix}/posts`, { params: { page, size, keyfield, keyword }});
    return result.data;

}
