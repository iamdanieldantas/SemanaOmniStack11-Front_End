import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import herosImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post("sessions", {id})
            console.log(response.data.name)

            localStorage.setItem('ongName', response.data.name)
            localStorage.setItem('ongId', id)

            history.push('/profile')

        } catch (err) {
            alert('ID inválido. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" typo="submit">Entrar</button>

                    <Link className="back-line" to="/register">
                        <FiLogIn sisze={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="hereos" />
        </div>
    )
}