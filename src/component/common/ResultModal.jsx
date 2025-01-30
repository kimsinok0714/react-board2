import '../../css/Modal.css';


// 모달창

const ResultModal = ( {title, content, callbackFn }) => {

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-body">{content}</p>
                <button className="modal-close" onClick={() => {
                    if (callbackFn) {
                        callbackFn();
                    }
                } }> 닫기 </button>
            </div>
        </div>
    );

}


export default ResultModal;