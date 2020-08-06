import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  avatar: string,
  bio: string,
  cost: number,
  id: number,
  name: string,
  subject: string,
  whatsapp: string,
}
interface TeacherItemProps {
  classes: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classes }) => {

  async function createNewConnection() {
    api.post('connections', {
      user_id: classes.id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={classes.avatar}
          alt={classes.name}
        />
        <div>
          <strong>{classes.name}</strong>
          <span>{classes.subject}</span>
        </div>
      </header>

      <p>{classes.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {classes.cost}</strong>
        </p>
        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${classes.whatsapp}`}>
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
