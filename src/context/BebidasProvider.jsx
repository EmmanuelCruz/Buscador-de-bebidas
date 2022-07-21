import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {

  const [bebidas, setBebidas] = useState([])
  const [modal, setModal] = useState(false)
  const [idBebida, setIdBebida] = useState(null)
  const [receta, setReceta] = useState({})
  const [cargando, setCargando] = useState(false)

  const consultadBebida = async datos => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
      const { data } = await axios(url)

      setBebidas(data.drinks)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    setCargando(true)
    const obtenerReceta = async () => {
      if(!idBebida) return

      try {
        const urlBebida = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idBebida}`
        const { data } = await axios(urlBebida)

        setReceta(data.drinks[0])
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false)
      }
    }
    obtenerReceta()
  }, [idBebida])

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <BebidasContext.Provider
      value={{
        consultadBebida,
        bebidas,
        handleModal,
        modal,
        setIdBebida,
        idBebida,
        receta,
        cargando
      }}
    >
      {children}
    </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext