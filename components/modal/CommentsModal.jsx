import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { modal } from '../../globalStates/atom';

const CommentsModal = () => {
  const [openModal, setOpenModal]= useRecoilState(modal);

  

  const closeModal =()=>{
    setOpenModal(false)
  }
  return (
    <div>
        <Modal
        isOpen={openModal}
        //onRequestClose={closeModal}
       
        contentLabel="Comments Modal"
      >
        <h2 >Hello</h2>
        
      </Modal>
    </div>
  )
}

export default CommentsModal;