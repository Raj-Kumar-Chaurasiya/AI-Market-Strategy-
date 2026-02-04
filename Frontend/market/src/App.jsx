import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Home from './general/Home';
import About from './general/About';
import ContentGenerator from './general/ContentGenertor';
import KeywordTool from './general/KeywordTool';
import StrategyRecommender from './general/StrategyRecommender';
import EmailGenerator from './general/EmailGenerator';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ChatAvatar from './ChatAvatar';
import Slider from './Slider';
import Team from './Team';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/content-generator" element={<ContentGenerator />} />
          <Route path="/keyword-tool" element={<KeywordTool />} />
          <Route path="/strategy-recommender" element={<StrategyRecommender />} />
          <Route path="/email-generator" element={<EmailGenerator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/team" element={<Team/>} />
        </Routes>
        <ChatAvatar />
        <Slider />
        {/* <Team /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;