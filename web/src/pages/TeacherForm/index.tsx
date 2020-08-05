import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from "../../components/Input";

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

function TeacherForm() {
    return (
        <div id="page-teachers-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas."
                description="O primeiro passo e preencher esse formulário de inscrição" />

            <main>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" label="Nome Completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <Textarea name="bio" label="Biografia"/>
                </fieldset>
                <fieldset>
                    <legend>Sobrea a Aula</legend>
                    <Select name="subject" label="Matéria" 
                    options={[
                        { value:'Artes',label: 'Artes'},
                        { value:'Biologia',label: 'Biologia'},
                        { value:'Ciências',label: 'Ciências'},
                        { value:'Educação Física',label: 'Educação Física'},
                        { value:'Física',label: 'Física'},
                        { value:'História',label: 'História'},
                        { value:'Matematica',label: 'Matematica'},
                        { value:'Português',label: 'Português'},
                        { value:'Química',label: 'Química'},
                    ]}/>
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>
               
               <footer>
                   <p>
                       <img src={warningIcon} alt="Aviso Importante"/>
                       Importante! <br/>
                       Preencha todos os dados
                   </p>
                   <button type="button">
                       Salvar Cadastro
                   </button>
               </footer>
            </main>
        </div>
    )
}

export default TeacherForm;