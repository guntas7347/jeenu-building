const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-24 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-3xl font-black text-primary mb-8">
            LUXE ESTATE
          </div>
          <p className="text-on-surface-variant opacity-70 font-body text-sm tracking-wide leading-loose">
            Curating extraordinary living spaces for the world's most discerning
            individuals. Our mission is to bridge the gap between luxury and
            lifestyle through unparalleled service and exclusive access.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-on-surface font-bold uppercase tracking-widest text-xs">
              Explore
            </h4>
            <ul className="space-y-3 font-body text-sm tracking-wide">
              <li>
                <a
                  className="text-on-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  href="#"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  className="text-on-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  href="#"
                >
                  Insights
                </a>
              </li>
              <li>
                <a
                  className="text-on-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  href="#"
                >
                  Affiliates
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-on-surface font-bold uppercase tracking-widest text-xs">
              Legal
            </h4>
            <ul className="space-y-3 font-body text-sm tracking-wide">
              <li>
                <a
                  className="text-on-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-on-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-on-surface font-bold uppercase tracking-widest text-xs">
            The Journal
          </h4>
          <p className="text-on-surface-variant opacity-70 text-sm italic">
            Stay updated with our curated weekly newsletter of the world's
            finest architectural marvels.
          </p>
          <div className="flex">
            <input
              className="bg-surface-container border border-outline-variant/30 border-r-0 rounded-l-md px-4 py-3 w-full focus:ring-1 focus:ring-primary text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none"
              placeholder="Email Address"
              type="email"
            />
            <button className="bg-primary text-on-primary px-6 rounded-r-md font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-outline/10 text-center">
        <p className="text-on-surface-variant opacity-50 font-body text-[10px] uppercase tracking-[0.4em]">
          © 2024 LUXE ESTATE. CURATING EXTRAORDINARY LIVING.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
