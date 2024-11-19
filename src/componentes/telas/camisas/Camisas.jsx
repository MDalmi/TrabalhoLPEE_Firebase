import { useState, useEffect } from "react";
import PostsContext from "./CamisasContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteCamisasFirebase, addCamisasFirebase , updateCamisasFirebase, getCamisasUIDFirebase } from '../../servicos/CamisasService';
import { Navigate } from "react-router-dom";

function Camisas() {

    const [user, loading, error] = useAuthState(auth);


    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        ano: '',
        email: user?.email,
        id: '',
        time: '',
        uid: user?.uid,
        url: '',
        usuario: user?.displayName,
        valor: '',
        tipo: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            ano: '',
            email: user?.email,
            id: '',
            time: '',
            uid: user?.uid,
            url: '',
            usuario: user?.displayName,
            valor: '',
            tipo: ''
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {
                updateCamisasFirebase(objeto);
                setAlerta({ status: "success", message: "Camisa atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar a camisa:" + err });
            }
        } else { // novo 
            try {
                setObjeto(await addCamisasFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Camisa criada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar a camisa:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteCamisasFirebase(objeto);
                setAlerta({ status: "success", message: "Camisa removida com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getCamisasUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    return (
        <PostsContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PostsContext.Provider>
    )

}

export default Camisas;