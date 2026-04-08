import { Github, Twitter, Mail, Shield, Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <h3 className="text-xl font-bold tracking-tight">MediaFlow</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            A fast and secure way to extract media from your favorite social platforms. Designed for mobile-first experience.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-600 hover:border-red-200 transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Scale className="w-4 h-4" />
                <span>Terms of Service</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">FAQ</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Report Abuse</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} MediaFlow. Built for educational purposes.
        </p>
      </div>
    </footer>
  );
}
