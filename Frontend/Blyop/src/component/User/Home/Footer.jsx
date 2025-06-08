import React from "react"
import { Link } from "react-router-dom" 
import { Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-green to-futuristic-blue flex items-center justify-center">
                <span className="text-black font-bold">B</span>
              </div>
              <span className="font-bold text-2xl">Blyop</span>
            </div>
            <p className="text-white/70">Your Identity. One Tap. Infinite Reach.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-white/70">
              <li><Link href="#" className="hover:text-neon-green transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-white/70">
              <li><Link href="#" className="hover:text-neon-green transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Support</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50">
          © {new Date().getFullYear()} Blyop. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
