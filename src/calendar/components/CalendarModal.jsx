import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import "react-datepicker/dist/react-datepicker.css";
import '../styles/modalStyle.css'
import { addHours, differenceInSeconds } from 'date-fns';

import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';


registerLocale('es', es)


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');


export const CalendarModal = () => {

    const [formSubmited, setFormSubmited] = useState(false)
    const { activeEvent, startLoadingEvent } = useCalendarStore()
  
    
    const [formValues, setFormValues] = useState({
        title:'',
        notes:'',
        start: new Date(),
        end: addHours( new Date() , 2 )
    })


    const { isDateModalOpen, closeDateModal } = useUiStore()

 

   const titleClass = useMemo(() => {
   
    if (!formSubmited)  return '';

    return (formValues.title.length > 0 )
        ? ''
        : 'is-invalid'
   
   },[ formSubmited, formValues.title ])


   useEffect(() => {
    if (activeEvent !== null) {
        setFormValues({ ...activeEvent })
    }
   
   }, [ activeEvent ])
   
    
  

    const onchangeValue = ({target}) => {
        setFormValues({...formValues, [target.name]:target.value }
            )
    }

    const onChangePicker = (e, changing ) => {
        setFormValues({
            ...formValues,
            [ changing ]: e
        })
    }

    const onSubmitForm = async(event) => {
        event.preventDefault()
        setFormSubmited(true)

        const difference = differenceInSeconds(formValues.end, formValues.start )
       

        if (isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Error en fechas ','revisa la info!','error')
            return;
        }

        if (formValues.title.length <= 0 ) {
            return;
        }

        await startLoadingEvent(formValues)
        closeDateModal()
        setFormSubmited( false )
    }
 
    const closeModal = () => {
        closeDateModal()
    }

    return (
        <Modal
            isOpen={ isDateModalOpen  }
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}

        >
            <h1> Nuevo evento </h1>
            <hr />

            <form 
                className="container"
                onSubmit={ onSubmitForm }
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        className='form-control'
                        selected={ formValues.start }
                        onChange={ (e) => onChangePicker( e, 'start' ) }
                        minDate={ new Date() }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        className='form-control'
                        selected={ formValues.end }
                        minDate={ formValues.start }
                        onChange={ (e) => onChangePicker( e, 'end' ) }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />


                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title }
                        onChange={ onchangeValue }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes }
                        onChange={ onchangeValue }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
