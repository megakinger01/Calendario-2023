import { useDispatch, useSelector } from "react-redux"
import { onOpenModal, onCloseModal } from "../store/ui/uiSlice"


export const useUiStore = () => {

   const { isDateModalOpen } =  useSelector( state => state.ui )
   const dispatch = useDispatch()

   const openDateModal = () => {
        dispatch( onOpenModal() )
   }

   const closeDateModal = () => {
        dispatch( onCloseModal() )
   }

  

   
   return {
       // propiedades
       isDateModalOpen,   
       //  metodos 
       openDateModal,
       closeDateModal
   }


}
