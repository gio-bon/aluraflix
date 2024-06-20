import React, { useState } from 'react'
import styled from 'styled-components'

const Formulario = ({ title, action, methodHTTP }) => {
    const [dataForm, setDataForm] = useState({
        titulo: '',
        selecao: '',
        cod_video: '',
        descricao: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (methodHTTP == 'POST') {
            sendPostSubmit();
        }
        setDataForm({
            titulo: '',
            selecao: '',
            cod_video: '',
            descricao: ''
        });
        /* Limpar os campos do formulário */
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        document.querySelector('textarea').value = '';
        document.querySelector('#selecao').value = '';

        const msgSucesso = document.getElementById('msg-sucess');
        msgSucesso.textContent = 'Vídeo salvo com sucesso!';
    }

    const sendPostSubmit = () => {
        fetch(`http://localhost:3002/${dataForm.selecao}`, {
            method: methodHTTP,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        })
    }

    return (
        <form onSubmit={(event) => handleSubmit(event, methodHTTP)}>
            <StyledForm>
                <h4>{title}</h4>
                <input type="text" value={dataForm.titulo} placeholder="Título" onChange={(e) => setDataForm({ ...dataForm, titulo: e.target.value })} />
                <select id="selecao" value={dataForm.selecao} required onChange={(e) => setDataForm({ ...dataForm, selecao: e.target.value })}>
                    <option value="">Selecione uma Categoria</option>
                    <option value="videos-front">Front End</option>
                    <option value="videos-back">Back End</option>
                    <option value="videos-mobile">Mobile</option>
                </select>
                <input type="text" value={dataForm.cod_video} placeholder="URL do vídeo" onChange={(e) => setDataForm({ ...dataForm, cod_video: e.target.value })} />
                <textarea value={dataForm.descricao} placeholder="Descrição" onChange={(e) => setDataForm({ ...dataForm, descricao: e.target.value })}></textarea>
                <StyledDivButtons>
                    <button type="submit">{action}</button>
                    <button type="reset" onClick={() => setDataForm({ titulo: '', selecao: '', cod_video: '', descricao: '' })}>LIMPAR</button>
                </StyledDivButtons>
                <StyleDivSucess> <p id="msg-sucess"></p> </StyleDivSucess>
            </StyledForm>
        </form>
    )
}

const StyleDivSucess = styled.div`
    
    p {
        font-family: var(--font);
        font-size: var(--fntsz-small);
        font-weight: 500;
        color: var(--white);
    }
`

const StyledDivButtons = styled.div`
  width: 500px;
  display: flex;
  gap: 10px;
  button {
    color: var(--white);
    font-family: var(--font);
    cursor: pointer;
    &:hover {
      background-color: var(--white);
      color: var(--black);
      transition: 0.5s;
    }
  }
`

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  input, select, textarea {
    width: 500px;
    height: 40px;
    border-radius: 8px;
    border: 0.5px solid var(--gray);
    background-color: var(--back1);
    color: var(--white);
    font-family: var(--font);
    font-size: var(--fntsz-small);
    font-weight: 500;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  select {
    width: 515px;
    color: var(--gray1);
  }
  textarea {
    height: 100px;
  }
  button {
    cursor: pointer;
    &:hover {
      background-color: var(--white);
      color: var(--black);
      transition: 0.5s;
    }
    width: 500px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--black);
    color: var (--white);
    border: none;
    font-family: var(--font);
    font-size: var(--fntsz-small);
    font-weight: 500;
  }
  h4 {
    font-family: var(--font);
    font-weight: 500;
    color: var(--white);
    font-size: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`

export default Formulario
