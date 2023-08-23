import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddRecipe, Auth, DetailsRecipe, Home, Login, Profile, Register } from './pages/index'
import { Layout, ProtectedRoute } from './components/index'
import { route } from './models/route.model'
import { Edit } from './pages/Edit_recipes/Edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={route.create.path} element={<AddRecipe />} />
              <Route path={route.profile.path} element={<Profile />} />
              <Route path={`${route.update.path}/:id?`} element={<Edit />} />
            </Route>
            <Route path={route.root.path} element={<Home />} />
            <Route path={`${route.details.path}/:id?`} element={<DetailsRecipe />} />
            <Route path={route.auth.path} element={<Auth />} />
            <Route path={route.login.path} element={<Login />} />
            <Route path={route.register.path} element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
