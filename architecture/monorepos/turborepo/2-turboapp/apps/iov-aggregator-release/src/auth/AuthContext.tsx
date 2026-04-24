import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { httpClient } from './HttpClient'
import keycloakInstance, { initOptions } from './Keycloak'
import StatusPage from '../common/StatusPage'
import Keycloak from 'keycloak-js'

interface AuthContextType {
  keycloak: Keycloak | null;
  authenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    keycloakInstance.init(initOptions).then((auth) => {
      if (!auth) {
        window.location.reload()
      } else {
        console.info("Authenticated")
        setKeycloak(keycloakInstance)
        setAuthenticated(auth)

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${keycloakInstance.token}`

        keycloakInstance.onTokenExpired = () => {
          keycloakInstance.updateToken(30).then((refreshed) => {
            if (refreshed) {
              console.log('Token refreshed')
              httpClient.defaults.headers.common['Authorization'] = `Bearer ${keycloakInstance.token}`
            } else {
              const remainingTime = Math.round(
                (keycloakInstance.tokenParsed?.exp ?? 0) + keycloakInstance.timeSkew! - new Date().getTime() / 1000
              )
              console.warn(`Token not refreshed, valid for only ${remainingTime} seconds`)
            }
          }).catch(() => {
            console.error('Failed to refresh token')
          })
        }
      }
    }).catch(() => {
      console.error("Authentication Failed")
      setError(true)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ keycloak, authenticated }}>
      {error ? (
        <StatusPage
          componentLine={'Error loading Keycloak'}
          urlLine={`Located in ${keycloakInstance.authServerUrl}`}
          status={'error_Main'}
        />
      ) : (
        authenticated ? children : <StatusPage status={'loading_Main'} />
      )}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
