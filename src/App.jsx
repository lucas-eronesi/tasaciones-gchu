import { useState, useEffect } from 'react';
import TasadorApp from './TasadorApp';

const CLAVE = "inmogcu2025";
const KEY = "gcu_auth";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; background: #F5EFE4; }
  .wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: linear-gradient(150deg, #0F2D3D 0%, #1A5C78 55%, #2A7A9A 100%); }
  .box { background: #FDFAF5; border-radius: 20px; padding: 44px 40px; width: 100%; max-width: 380px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); text-align: center; }
  .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #B8892A, #D4A43A); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 18px; box-shadow: 0 6px 20px rgba(184,137,42,.35); }
  h1 { font-family: 'Georgia', serif; font-size: 24px; font-weight: 700; color: #0F2D3D; margin-bottom: 6px; }
  p { font-size: 13px; color: #5A5A5A; margin-bottom: 28px; }
  label { display: block; text-align: left; font-size: 11px; font-weight: 600; color: #5A5A5A; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  input { width: 100%; padding: 13px 16px; border: 2px solid rgba(15,45,61,0.15); border-radius: 10px; font-size: 16px; color: #1A1A1A; background: #fff; outline: none; letter-spacing: 2px; margin-bottom: 18px; }
  input:focus { border-color: #1A5C78; }
  input.err { border-color: #B71C1C; }
  button { width: 100%; padding: 14px; background: linear-gradient(135deg, #1A5C78, #0F2D3D); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; }
  .error { background: #FEF2F2; border: 1.5px solid #FECACA; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #B71C1C; margin-bottom: 16px; }
  .footer { margin-top: 22px; font-size: 11.5px; color: #9A9A9A; }
`;

function Login({ onLogin }) {
  const [clave, setClave] = useState("");
  const [error, setError] = useState(false);

  const ingresar = () => {
    if (clave === CLAVE) {
      sessionStorage.setItem(KEY, "1");
      onLogin();
    } else {
      setError(true);
      setClave("");
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="box">
          <div className="logo">🏡</div>
          <h1>Tasaciones GCU</h1>
          <p>Gualeguaychú, Entre Ríos<br/>Acceso exclusivo para el equipo</p>
          {error && <div className="error">Contraseña incorrecta</div>}
          <label>Contraseña</label>
          <input
            type="password"
            className={error ? "err" : ""}
            value={clave}
            onChange={e => { setClave(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && ingresar()}
            placeholder="••••••••••"
            autoFocus
          />
          <button onClick={ingresar}>Ingresar →</button>
          <div className="footer">Uso exclusivo del equipo de la inmobiliaria</div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setAuth(true);
  }, []);
  return auth ? <TasadorApp /> : <Login onLogin={() => setAuth(true)} />;
}
