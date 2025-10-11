import '../../css/Article.css';



const PageComponent = ({ serverData, searchCondition, movePage }) => {  // Props

    const { keyfield, keyword } = searchCondition;

    // movePage = '/list?page=1&size=10&keyfield=writer&keyword=kso'

    // serverData.prev, pageNumList, next ...

    return(
        <>
            {
                serverData.prev ? <span onClick={ () => { movePage( { page: serverData.prevPage, keyfield: keyfield, keyword: keyword } ) } }>이전</span> : <></>
            }

            {
                serverData.pageNumList.map( (pageNum) => {
                    
                    return <span key={pageNum} onClick={() => { movePage( { page: pageNum, keyfield: keyfield, keyword: keyword } ) }} 
                                style={{
                                color: pageNum == serverData.currentPage ? 'blue' : 'white',
                                cursor: 'pointer',
                                margin: '0.5px'
                                }}>  {pageNum}  </span>
                })
            }


            {
                serverData.next ? <span onClick={ () => { movePage( { page: serverData.nextPage, keyfield: keyfield, keyword: keyword } ) } }>다음</span> : <></>
            }       

        </>
    );

}


export default PageComponent;
