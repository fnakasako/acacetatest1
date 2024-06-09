'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isAuthenticated = await signIn(email, password);
    if (isAuthenticated) {
      router.push('/chat');
    } else {
      alert('Login failed');
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
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px' }}
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

export default Home;

async function signIn(email, password) {
  if (email === 'user@example.com' && password === 'password') {
    document.cookie = 'session=true';
    return true;
  }
  return false;
}

