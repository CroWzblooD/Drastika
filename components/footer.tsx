import { FaGithub, FaTwitter, FaLinkedin, FaGraduationCap, FaChalkboardTeacher, FaBrain } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#FDF8F3] dark:bg-gray-900 border-t border-[#E6D5C3]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-3xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434] flex items-center gap-2">
              <FaGraduationCap className="w-8 h-8" />
              Drastika
            </h3>
            <p className="mt-4 text-[#614434] dark:text-cream-100">
              Revolutionizing teacher development through AI-powered insights. 
              Empowering educators with personalized growth pathways and real-time 
              implementation support.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#8B4513] dark:text-[#DEB887]">Platform Features</h4>
            <ul className="space-y-3 text-[#614434] dark:text-cream-100">
              <li className="flex items-center gap-2">
                <FaBrain className="w-4 h-4" />
                AI Course Creation
              </li>
              <li className="flex items-center gap-2">
                <FaChalkboardTeacher className="w-4 h-4" />
                Interactive Learning
              </li>
              <li className="flex items-center gap-2">
                <FaGraduationCap className="w-4 h-4" />
                Professional Growth
              </li>
              <li className="flex items-center gap-2">
                <FaBrain className="w-4 h-4" />
                Development Analytics
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#8B4513] dark:text-[#DEB887]">Connect With Us</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <FaGithub className="w-6 h-6 text-[#8B4513] hover:text-[#614434] dark:text-[#DEB887] dark:hover:text-cream-100 cursor-pointer transition-colors" />
                <FaTwitter className="w-6 h-6 text-[#8B4513] hover:text-[#614434] dark:text-[#DEB887] dark:hover:text-cream-100 cursor-pointer transition-colors" />
                <FaLinkedin className="w-6 h-6 text-[#8B4513] hover:text-[#614434] dark:text-[#DEB887] dark:hover:text-cream-100 cursor-pointer transition-colors" />
              </div>
              <p className="text-[#614434] dark:text-cream-100 text-sm">
                Join our community of educators transforming professional development
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#E6D5C3] dark:border-gray-700">
          <p className="text-center text-[#8B4513] dark:text-cream-100">
            © 2024 Drastika. Empowering Teacher Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
} 