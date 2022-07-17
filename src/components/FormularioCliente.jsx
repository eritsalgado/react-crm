import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const FormularioCliente = ({cliente, cargando}) => {
    
    const navigate = useNavigate()
    const nuevoClienteSchema = Yup.object().shape({
        nombre:  Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required("El nombre de la empresa es obligatorio"),
        email:   Yup.string()
                    .email('E-mail no valido')
                    .required('El e-mail es obligatorio'),
        telefono:Yup.number()
                    .integer('Número no valido')
                    .positive('Numero no valido')
                    .typeError('El número no es valido')
                    .required('El teléfono es obligatorio')
    })

    const handleSubmit = async (data_cliente) => {
        console.log(data_cliente)
        let adicional = ''
        let method = 'POST'
        if(cliente.id){
            adicional += `/${cliente.id}`
            method = 'PUT'
            console.log('editando')
        }
        try {
            const url = `http://localhost:4000/clientes${adicional}`
            console.log(url)
            const respuesta = await fetch(url, {
                method: method,
                body:   JSON.stringify(data_cliente),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            await respuesta.json()

            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner/> : 
        (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                    {cliente?.nombre ? 'Editar':'Agregar'} Cliente
                </h1>
                <Formik
                    initialValues={{
                        nombre:cliente?.nombre ?? '',
                        empresa:cliente?.empresa ?? '',
                        email:cliente?.email ?? '',
                        telefono:cliente?.telefono ?? '',
                        notas:cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values,{resetForm})=> {
                        await handleSubmit(values)
                        resetForm()
                    } }
                    validationSchema={nuevoClienteSchema}
                >
                    { ({errors, touched})=> {
                        
                        console.log(touched)
                        
                        return (
    
                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >Nombre: </label>
                                    <Field 
                                        id="nombre"
                                        name="nombre"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="text"
                                        placeholder="Nombre del cliente"
                                    />
                                    {errors.nombre && touched.nombre ? 
                                    (
                                        <Alerta>{errors.nombre}</Alerta>
                                    )
                                    :null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >Empresa: </label>
                                    <Field 
                                        id="empresa"
                                        name="empresa"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="text"
                                        placeholder="Empresa del cliente"
                                    />
                                    {errors.empresa && touched.empresa ? 
                                    (
                                        <Alerta>{errors.empresa}</Alerta>
                                    )
                                    :null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >E-mail: </label>
                                    <Field 
                                        id="email"
                                        name="email"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="email"
                                        placeholder="E-mail del cliente"
                                    />
                                    {errors.email && touched.email ? 
                                    (
                                        <Alerta>{errors.email}</Alerta>
                                    )
                                    :null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >Teléfono: </label>
                                    <Field 
                                        id="telefono"
                                        name="telefono"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="tel"
                                        placeholder="Teléfono del cliente"
                                    />
                                    {errors.telefono && touched.telefono ? 
                                    (
                                        <Alerta>{errors.telefono}</Alerta>
                                    )
                                    :null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >Notas: </label>
                                    <Field 
                                        as="textarea"
                                        id="notas"
                                        name="notas"
                                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                        type="text"
                                        placeholder="Notas del cliente"
                                    />
                                </div>
                                <input 
                                    type="submit" 
                                    value={cliente?.nombre ? 'Editar Cliente':'Agregar Cliente'} 
                                    className='mt-5 w-full bg-blue-800 text-white uppercase font-bold text-lg'
                                />
                            </Form>
    
                        )} 
                    }
    
                </Formik>
            </div>
        )
    )
}

FormularioCliente.defaultProps = {
    cliente:{},
    cargando:false
}
 
export default FormularioCliente;