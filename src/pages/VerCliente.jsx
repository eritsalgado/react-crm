import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const {id} = useParams()

    useEffect( ()=>{
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            // setTimeout(() => {
                setCargando(false)
            // }, 3000);
        }

        obtenerClienteAPI()
    },[] )

    return ( 
        <div>
            {   
                cargando ? 
                <Spinner/> : 
                Object.keys(cliente).length === 0 ? 'No Hay Resultados' : 
                <>
                    <h1 className="font-black text-4xl text-blue-900">Ver Cliente {cliente.nombre}</h1>
                    <p className="mt-3">Información del cliente</p>

                    <p className='text-2xl mt-4 text-gray-700'>
                        <span className='uppercase font-bold text-gray-600'>
                        Email:
                        </span>
                        {cliente.email}
                    </p>
                    <p className='text-2xl mt-4 text-gray-700'>
                        <span className='uppercase font-bold text-gray-600'>
                        Teléfono:
                        </span>
                        {cliente.telefono}
                    </p>
                    <p className='text-2xl mt-4 text-gray-700'>
                        <span className='uppercase font-bold text-gray-600'>
                        Empresa:
                        </span>
                        {cliente.empresa}
                    </p>
                    {cliente.notas && (
                        <p className='text-2xl mt-4 text-gray-700'>
                            <span className='uppercase font-bold text-gray-600'>
                            Notas:
                            </span>
                            {cliente.notas}
                        </p>
                    )} 
                </>
            }
                      
        </div>
     );
}
 
export default VerCliente;