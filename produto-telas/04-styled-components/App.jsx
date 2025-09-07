import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { products } from '../shared/data.js'
import { Button } from './components/Button.jsx'
import { CartBadge, NavbarContainer, ThemeButton } from './components/Navbar.jsx'
import { darkTheme, lightTheme } from './theme.js'

function App() {
  const [theme, setTheme] = useState(lightTheme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setTheme(savedTheme === 'dark' ? darkTheme : lightTheme)
    
    // Simular loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light')
  }

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          padding: '2rem',
          background: theme.colors.background,
          minHeight: '100vh'
        }}>
          Carregando...
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer>
        <div>🛒 Loja</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeButton onClick={toggleTheme}>
            {theme === lightTheme ? '🌙' : '☀️'}
          </ThemeButton>
          <CartBadge>3</CartBadge>
        </div>
      </NavbarContainer>

      <div style={{ 
        padding: '2rem',
        background: theme.colors.background,
        minHeight: '100vh'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {products.map(product => (
            <div key={product.id} style={{ 
              border: `1px solid ${theme.colors.border}`,
              padding: '1rem',
              borderRadius: '0.5rem',
              background: theme.colors.background,
              position: 'relative'
            }}>
              {product.tag && (
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: product.tag === 'Promo' ? theme.colors.warning : theme.colors.primary,
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {product.tag}
                </span>
              )}
              
              <img 
                src={product.image} 
                alt={product.title}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '0.375rem',
                  marginBottom: '1rem',
                  background: theme.colors.border
                }}
              />
              
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                color: theme.colors.text,
                fontSize: '1rem',
                fontWeight: '600',
                lineHeight: '1.4',
                minHeight: '2.8rem',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {product.title}
              </h3>
              
              <p style={{ 
                margin: '0 0 0.5rem 0',
                color: theme.colors.primary,
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                R$ {product.price.toFixed(2)}
              </p>

              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginBottom: '1rem',
                color: theme.colors.warning
              }}>
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>

              <Button variant="solid">
                Adicionar ao Carrinho
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)