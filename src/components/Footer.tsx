import { Camera, Instagram} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8" />
              <span className="text-xl">Alec Gossage</span>
            </div>
            <p className="text-gray-400">
              Specializing in wildlife, portraits, and more.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4">Follow Me</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/alecgossage/" 
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {currentYear} Alec Gossage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
