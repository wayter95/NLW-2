import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/50506895?s=460&u=8e5b95b81c1b6063d7d2c4269770537848a44e25&v=4"
          alt="PP"
        />
        <div>
          <strong>Wayter Paulo</strong>
          <span>Desenvolvimento Web</span>
        </div>
      </header>

      <p>
        Entusiasta das melhorias tecnologias do desenvolvimento Web.
        <br />
        <br />
        Apaixonado por codigos novas tecnologias e mudar a vida das pessoas
        atraves de experiencia.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 50,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
