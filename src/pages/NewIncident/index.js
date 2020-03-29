import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValeu] = useState(0);

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        //Fazer com que a tela não atualize
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    authorizarion: ongId
                }
            });
            history.push('/profile');
        } catch (error) {
            alert("Erro ao cadastrar um novo incidente. Tente novamente.");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="container">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-line" to="/profile">
                        <FiArrowLeft sisze={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>

                <form>
                    <input
                        placeholder="Título do caso"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />

                    <textarea
                        placeholder="Descrição"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />

                    <input
                        placeholder="Valor em reais"
                        onChange={e => setValeu(e.target.value)}
                        value={value}
                    />

                    <button className="button" type="submit" onClick={handleNewIncident}> Cadastrar</button>
                </form>
            </div>
        </div>
    )
}