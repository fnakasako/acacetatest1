'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/chat'); // Redirect to the chat page
    } else {
      alert('Login failed: ' + (await res.json()).message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#a3d5a6',
      position: 'relative',
    }}>
      <style jsx>{`
        .gradient-background {
          background: linear-gradient(to right, #ffe4e6, #ccfbf1);
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .button-no-outline {
          outline: none;
          box-shadow: none;
          border-radius: 12px;
        }
        .input-field {
          border: 2px solid #0070f3 !important;
          border-radius: 5px !important;
          padding: 10px !important;
          margin-bottom: 10px !important;
          background-color: #0070f3 !important;
          color: white !important;
        }
        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .input-field:focus {
          border-color: #005bb5 !important;
          background-color: #005bb5 !important;
        }
      `}</style>
      <div className="gradient-background"></div>
      <h1 style={{
        fontSize: '2em',
        marginBottom: '20px',
        color: 'white'
      }}>
        Acaceta AI
      </h1>
      <p style={{ paddingBottom: '20px' }}>MedTech Search Tool</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input-field"
          style={{ marginBottom: '20px' }}
        />
        <button type="submit" className="button-no-outline" style={{
          padding: '10px 20px',
          fontSize: '1em',
          cursor: 'pointer',
          backgroundColor: 'white',
          color: 'black',
          border: 'none'
        }}>
          Login
        </button>
      </form>
      <p style={{ paddingTop: '20px' }}>
        Don't have an account? <Link href="/signup" legacyBehavior><a style={{ color: 'blue', textDecoration: 'underline' }}>Sign up</a></Link>
      </p>
    </div>
  );
};

export default LoginPage;

