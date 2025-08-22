import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

console.log('Footer component loaded')

const Footer = () => {
  return (
    <footer className="bg-finance-navy text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://cdn-ai.onspace.ai/onspace/project/image/2hGG6P7tn8CTHN87f9mtSp/call-center.png" 
                alt="Call Center Finance Indonesia" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-finance-gold">call-center.id</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia. 
              Bergabunglah dengan komunitas profesional keuangan dan dapatkan insight terbaru.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-finance-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-finance-gold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/forum" className="text-gray-300 hover:text-white transition-colors">
                  Forum Diskusi
                </Link>
              </li>
              <li>
                <Link to="/artikel" className="text-gray-300 hover:text-white transition-colors">
                  Artikel & Berita
                </Link>
              </li>
              <li>
                <Link to="/ojk-regulasi" className="text-gray-300 hover:text-white transition-colors">
                  OJK & Regulasi
                </Link>
              </li>
              <li>
                <Link to="/edukasi-keuangan" className="text-gray-300 hover:text-white transition-colors">
                  Edukasi Keuangan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-finance-gold mb-4">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@call-center.id</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+62 21 1500 888</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Call Center Finance Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer