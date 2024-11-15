import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/loginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import NewPost from "./pages/admin/screens/posts/NewPost";
import ManagePost from "./pages/admin/screens/posts/ManagePost";
import EditPost from "./pages/admin/screens/posts/EditPost";
import Insights from "./pages/admin/screens/insights/insights";
import ArticleScroll from "./pages/articleDetail/components/ArticleScroll";



function App() {
    return (
        <div className="App font-opensans">
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminLayout />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/feed" element={<ArticleScroll/>} ß>
               
                    
                    <Route index element={<Admin />} />
                    <Route path="insights" element={<Insights />} />
                    <Route path="comments" element={<Comments />} />
                   
                    <Route path="posts/manage" element={<ManagePost />} />
                    <Route
                        path="posts/manage/edit/:slug"
                        element={<EditPost />}
                    />
                </Route>
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
