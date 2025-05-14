import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import OnBoardingPage from './pages/OnBoardingPage.jsx'

import { Toaster } from 'react-hot-toast'

import PageLoader from './components/PageLoader.jsx'
import Layout from './components/Layout.jsx'

import useAuthUser from './hooks/useAuthUser.js'
import { useThemeStore } from './store/useThemeStore.js'


const App = () => {
  //react-query 
  //for 'GET' requests we can use useQuery
  //for 'POST', 'Put', 'Delete' requests we can use useMutation

  const { theme } = useThemeStore();

  const { isLoading, authUser, error } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  const isOnboarded = authUser?.isOnboarded;



  if (isLoading) {
    return <PageLoader />;
  }

  console.log("%cLoading: %c" + isLoading + "%c Error: %c" + (error || "none"),
    "color:green; font-size: 16px; font-weight: bold;",
    "color:green; font-size: 14px;",
    "color:red; font-size: 16px; font-weight: bold;",
    "color:red; font-size: 14px;")
  console.log("%cAuth User:", "color:yellow; font-size: 20px;", authUser)

  return (
    <div className='h-screen text-5xl' data-theme={theme}>
      <Routes>

        <Route path='/' element={isAuthenticated && isOnboarded ?
          (<Layout showSideBar={true}>
            <HomePage />
          </Layout>) :
          (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)}
        />

        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"} />} />

        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"} />} />

        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSideBar={true}>
            <NotificationsPage />
          </Layout>) : (<Navigate to={
            !isAuthenticated ? "/login" : "/onboarding"} />)
        } />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path='/onboarding' element={isAuthenticated ? (
          !isOnboarded ? (<OnBoardingPage />) : (<Navigate to="/" />)
        ) : (<Navigate to="/login" />)} />
      </Routes>

      <Toaster toastOptions={{
        success: {
          style: {
            fontSize: '18px',
          },
        },
        error: {
          style: {
            fontSize: '18px',
          },
        },
        style: {
          fontSize: '12px', // default style
        },
      }}
      />
      {/* the Toaster will be here to be shared across all pages */}
    </div>
  )
}

export default App
