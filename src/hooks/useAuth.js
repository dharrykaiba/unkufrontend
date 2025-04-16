// src/hooks/useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Importamos el contexto

const useAuth = () => {
  const {
    isAuthenticated,
    login,
    register,
    isCodeSent,
    requestLoginCode,
    verifyLoginCode,
    isWsCodeSent,
    //requestLoginCodeWS,
    //verifyLoginCodeWS,
    logout,
  } = useContext(AuthContext);
  return {
    isAuthenticated,
    login,
    register,
    isCodeSent,
    requestLoginCode,
    verifyLoginCode,
    isWsCodeSent,
    //requestLoginCodeWS,
    //verifyLoginCodeWS,
    logout,
  };
};

export { useAuth }; // Exportación nombrada
/*// Creamos un hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
*/
