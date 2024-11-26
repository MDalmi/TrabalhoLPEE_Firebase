import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PostsContext from "./CamisasContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(PostsContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtTime" label="Time"
                    tipo="text" name="time" value={objeto.time}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Titulo OK"
                    msginvalido="Informe o time" />
                <CampoEntrada id="txtValor" label="Valor"
                    tipo="number" name="valor" value={objeto.valor}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Valor OK"
                    msginvalido="Informe o valor" />
                <CampoEntrada id="txtAno" label="Ano"
                    tipo="text" name="ano"
                    value={objeto.ano}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Ano ok"
                    msginvalido="Informe o Ano" />
                <CampoEntrada id="txtUrl" label="URL"
                    tipo="text" name="url"
                    value={objeto.url}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="URL OK"
                    msginvalido="Informe a URL" />
                <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o Tipo">
                    <MenuItem value='nova'>Nova</MenuItem>
                    <MenuItem value='usada'>Usada</MenuItem>
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;