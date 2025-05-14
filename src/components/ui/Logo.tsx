
import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-promptpal-purple-light to-promptpal-purple-dark flex items-center justify-center text-white font-bold">
      P
    </div>
    <span className="text-xl font-bold text-gray-900">PromptPal</span>
  </Link>
);

export default Logo;
