import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Filters / Logo Area (matching reference structure visually) */}
        <div>
          <h3 className="font-bold text-lg mb-4">Logo</h3>
          <p className="text-white/70 text-sm mb-4">
            Your one-stop shop for premium products.
          </p>
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Whatbytes Assignment.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
