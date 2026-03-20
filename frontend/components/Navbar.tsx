"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

export type PillNavItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  const pathname = usePathname();

  // Auth & Theme State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const authMenuRef = useRef<HTMLDivElement>(null);

  // GSAP PillNav State — items are role-aware
  const items: PillNavItem[] = [
    { label: "How it Works", href: "/about" },
    ...(currentUser
      ? [{ label: "Dashboard", href: isAdmin ? "/admin/dashboard" : "/rider/dashboard" }]
      : []
    )
  ];
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Constants for GSAP Animation
  const ease = 'power3.easeOut';

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
    // Check admin token from localStorage
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (adminToken) {
      setIsAdmin(true);
      setLoading(false);
    }
    const unsub = onAuthStateChanged(auth, (u) => {
        setCurrentUser(u);
        if (!adminToken) setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear admin session if present
      if (isAdmin) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setIsAdmin(false);
        setDropdownOpen(false);
        window.location.href = "/";
        return;
      }
      await signOut(auth);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP Hover Layout Effects
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : "U";

  // Dynamic CSS Variables mapping to our scheme
  const cssVars = {
    ['--base']: isDarkMode ? '#18181b' : '#3f7062', 
    ['--pill-bg']: 'transparent',
    ['--hover-text']: '#fff',
    ['--pill-text']: isDarkMode ? '#d4d4d8' : '#475569',
    ['--nav-h']: '42px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '6px'
  } as React.CSSProperties;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full md:w-max min-w-[80%] md:min-w-[700px] max-w-4xl bg-white/80 backdrop-blur-xl border border-slate-200/80 dark:bg-zinc-900/80 dark:border-white/10 rounded-full transition-colors shadow-xl shadow-brand-900/5 dark:shadow-black/50">
        <div className="px-5 md:px-6 h-16 flex items-center justify-between gap-4 md:gap-12" style={cssVars}>
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full md:rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-sm">
              P
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight hidden sm:block">Paraswift</span>
          </Link>
        
        {/* CENTER PILL NAV */}
        <div className="relative items-center rounded-full hidden md:flex" style={{ height: 'var(--nav-h)' }}>
          <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: 'var(--pill-gap)' }}>
            {items.map((item, i) => {
              const isActive = pathname === item.href;
              const pillStyle: React.CSSProperties = {
                background: isActive ? 'var(--base, #000)' : 'var(--pill-bg, transparent)',
                color: isActive ? '#fff' : 'var(--pill-text)',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{ background: 'var(--base, #000)', willChange: 'transform' }}
                    aria-hidden="true"
                    ref={el => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                      {item.label}
                    </span>
                    <span className="pill-label-hover absolute left-0 top-0 z-[3] inline-block" style={{ color: 'var(--hover-text, #fff)', willChange: 'transform, opacity' }} aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-bold text-sm leading-[0] tracking-wide whitespace-nowrap cursor-pointer px-0 transition-colors"
                    style={pillStyle}
                    onMouseEnter={() => !isActive && handleEnter(i)}
                    onMouseLeave={() => !isActive && handleLeave(i)}
                  >
                    {PillContent}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* AUTH RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!loading && (currentUser || isAdmin) ? (
            <div className="relative" ref={authMenuRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-10 h-10 rounded-full border-2 font-bold text-lg flex items-center justify-center hover:scale-105 transition-transform shadow-sm ${
                  isAdmin 
                    ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                    : "bg-brand-100 dark:bg-zinc-800 border-brand-200 dark:border-zinc-700 text-brand-700 dark:text-white"
                }`}
              >
                {isAdmin ? "A" : userInitial}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800 mb-1">
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold truncate">
                      {isAdmin ? "admin@paraswift.com" : currentUser?.email}
                    </p>
                    {isAdmin && (
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Admin Portal</span>
                    )}
                  </div>
                  {!isAdmin && (
                    <>
                      <Link
                        href="/rider/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        My Profile
                      </Link>
                      <button 
                        onClick={toggleDarkMode}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3"
                      >
                        {isDarkMode ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        )}
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                    </>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : !loading && (
            <div className="flex items-center gap-4">
              <button 
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  onClick={toggleDarkMode}
                  title="Toggle Dark Mode"
              >
                  {isDarkMode ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                  )}
              </button>
              <Link href="/rider/login" className="px-6 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-90 transition-all shadow-md active:scale-95 text-center leading-none">
                  Sign In
              </Link>
            </div>
          )}

          {/* MOBILE HAMBURGER MENU BUTTON */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
            style={{ width: 'var(--nav-h)', height: 'var(--nav-h)', background: 'transparent' }}
          >
            <span className="hamburger-line w-5 h-0.5 rounded origin-center transition-all bg-slate-900 dark:bg-white" />
            <span className="hamburger-line w-5 h-0.5 rounded origin-center transition-all bg-slate-900 dark:bg-white" />
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-[4em] left-4 right-4 rounded-3xl shadow-2xl z-[998] origin-top border border-slate-200 dark:border-zinc-800 overflow-hidden"
          style={{ background: isDarkMode ? '#18181b' : '#ffffff' }}
        >
          <ul className="list-none m-0 p-4 flex flex-col gap-1">
            {/* Always show How it Works */}
            <li>
              <Link
                href="/about"
                className="block py-3 px-4 text-sm font-bold rounded-xl transition-all text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
            </li>
            {/* Show Dashboard link only when logged in */}
            {(currentUser || isAdmin) && (
              <li>
                <Link
                  href={isAdmin ? "/admin/dashboard" : "/rider/dashboard"}
                  className="block py-3 px-4 text-sm font-bold rounded-xl transition-all text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {/* Divider */}
            <li className="border-t border-slate-100 dark:border-zinc-800 my-1" />
            {/* Sign In or Profile actions */}
            {(currentUser || isAdmin) ? (
              <>
                {!isAdmin && (
                  <li>
                    <Link
                      href="/rider/profile"
                      className="block py-3 px-4 text-sm font-bold rounded-xl transition-all text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                    className="w-full text-left block py-3 px-4 text-sm font-bold rounded-xl transition-all text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/rider/login"
                  className="block py-3 px-4 text-sm font-bold rounded-xl transition-all text-white bg-slate-900 dark:bg-white dark:text-black text-center hover:opacity-90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
