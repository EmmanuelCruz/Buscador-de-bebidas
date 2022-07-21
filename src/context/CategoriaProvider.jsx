import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CategoriaContext = createContext()

const CategoriaProvider = ({children}) => {

  const [categorias, setCategorias ] = useState([])

  useEffect(() => {
    const consultaApi = async () => {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
        const {data} = await axios(url)

        const bebidas = data.drinks
        setCategorias(bebidas)
      } catch (error) {
        console.error(error);
      }
    }
    consultaApi()
  }, [])

  return (
    <CategoriaContext.Provider
      value={{
        categorias
      }}
    >
      {children}
    </CategoriaContext.Provider>
  )
}

export {
  CategoriaProvider
}

export default CategoriaContext