export async function auth() {
    // Check if the code is running on the client side
    if (typeof window === 'undefined') {
      return null;
    }
  
    // Simulate session check logic
    const session = document.cookie.includes('session=true');
    return session ? { user: { id: 'user123', name: 'User' } } : null;
  }
  